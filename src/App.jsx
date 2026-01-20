import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DateSelector from './components/DateSelector';
import PanchangDisplay from './components/PanchangDisplay';
import TimingsDisplay from './components/TimingsDisplay';
import { getPanchang } from './utils/hinduCalendar';
import { LOCATIONS } from './utils/locations';

function App() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]); // Default: Hyderabad
  const [panchangData, setPanchangData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate panchang when date or location changes
  useEffect(() => {
    if (selectedLocation) {
      setLoading(true);
      try {
        const data = getPanchang(selectedDate, selectedLocation.lat, selectedLocation.lng);
        setPanchangData(data);
      } catch (error) {
        console.error('Error calculating panchang:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedDate, selectedLocation]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen mandala-pattern">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header
          currentLanguage={i18n.language}
          onLanguageChange={handleLanguageChange}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
            />

            <DateSelector
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>

          {/* Right Column - Data Display */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="card-sacred text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : panchangData ? (
              <>
                <PanchangDisplay
                  panchang={panchangData}
                  date={selectedDate}
                />

                <TimingsDisplay
                  auspicious={panchangData.auspicious}
                  inauspicious={panchangData.inauspicious}
                />
              </>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <div className="glass-morphism rounded-xl py-4 px-6 inline-block">
            <p className="gradient-text font-semibold">
              {t('app.title')} • {t('app.subtitle')}
            </p>
            <p className="mt-2 text-xs opacity-75">
              Bringing ancient wisdom to modern times
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
