import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Navigation, ChevronDown } from 'lucide-react';
import { searchLocations, getCurrentLocation, formatLocationName } from '../utils/locations';

export default function LocationSelector({ selectedLocation, onLocationChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
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
    try {
      const location = await getCurrentLocation();
      onLocationChange(location);
      setIsOpen(false);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Could not get your location. Please select manually.');
    } finally {
      setIsLoadingLocation(false);
    }
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
