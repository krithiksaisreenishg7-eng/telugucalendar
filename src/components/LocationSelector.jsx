import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Navigation, ChevronDown, MapPinned } from 'lucide-react';
import { searchLocations, getCurrentLocation, formatLocationName } from '../utils/locations';

export default function LocationSelector({ selectedLocation, onLocationChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [locationError, setLocationError] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const results = searchLocations(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGetCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError('');
    try {
      const location = await getCurrentLocation();
      onLocationChange(location);
      setIsOpen(false);
    } catch (error) {
      console.error('Error getting location:', error);
      let errorMessage = 'Could not get your location. ';
      if (error.code === 1) {
        errorMessage += 'Please allow location access in your browser settings.';
      } else if (error.code === 2) {
        errorMessage += 'Location information is unavailable.';
      } else if (error.code === 3) {
        errorMessage += 'Location request timed out.';
      } else {
        errorMessage += error.message || 'Please try manual entry below.';
      }
      setLocationError(errorMessage);
      setShowManualEntry(true);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleManualEntry = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng)) {
      setLocationError('Please enter valid latitude and longitude numbers');
      return;
    }

    if (lat < -90 || lat > 90) {
      setLocationError('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      setLocationError('Longitude must be between -180 and 180');
      return;
    }

    const location = {
      id: 'manual-' + Date.now(),
      name: `Custom Location`,
      country: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      lat: lat,
      lng: lng,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    onLocationChange(location);
    setIsOpen(false);
    setShowManualEntry(false);
    setManualLat('');
    setManualLng('');
    setLocationError('');
  };

  return (
    <div ref={dropdownRef} className="card-sacred animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-divine-500 to-primary-500 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {t('location.select')}
        </h2>
      </div>

      {/* Selected Location Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl border-2 border-primary-200 transition-all duration-200 flex items-center justify-between group"
      >
        <div className="text-left">
          <p className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors">
            {selectedLocation.name}
          </p>
          {selectedLocation.state && (
            <p className="text-sm text-gray-600">
              {selectedLocation.state}, {selectedLocation.country}
            </p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Location Details */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-gray-600 text-xs mb-1">{t('location.latitude')}</p>
          <p className="font-semibold text-gray-800">{selectedLocation.lat.toFixed(4)}°</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-gray-600 text-xs mb-1">{t('location.longitude')}</p>
          <p className="font-semibold text-gray-800">{selectedLocation.lng.toFixed(4)}°</p>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="mt-4 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up">
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('location.placeholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Current Location Button */}
          <button
            onClick={handleGetCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-200 disabled:opacity-50"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium">
              {isLoadingLocation ? t('common.loading') : t('location.currentLocation')}
            </span>
          </button>

          {/* Manual Entry Button */}
          <button
            onClick={() => setShowManualEntry(!showManualEntry)}
            className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-200"
          >
            <MapPinned className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">
              Enter Coordinates Manually
            </span>
          </button>

          {/* Error Message */}
          {locationError && (
            <div className="px-4 py-3 bg-red-50 border-b border-gray-200">
              <p className="text-sm text-red-700">{locationError}</p>
            </div>
          )}

          {/* Manual Entry Form */}
          {showManualEntry && (
            <div className="px-4 py-3 bg-purple-50 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Enter GPS Coordinates:</p>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Latitude (-90 to 90)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    placeholder="e.g., 17.3850"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Longitude (-180 to 180)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                    placeholder="e.g., 78.4867"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
                <button
                  onClick={handleManualEntry}
                  className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-medium text-sm"
                >
                  Use These Coordinates
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: You can find your coordinates on Google Maps by right-clicking your location
                </p>
              </div>
            </div>
          )}

          {/* Location Results */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {searchResults.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  onLocationChange(location);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  selectedLocation.id === location.id ? 'bg-orange-50' : ''
                }`}
              >
                <p className="font-semibold text-gray-800">{location.name}</p>
                <p className="text-sm text-gray-600">
                  {location.state ? `${location.state}, ` : ''}{location.country}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
