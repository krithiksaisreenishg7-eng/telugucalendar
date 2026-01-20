import { useTranslation } from 'react-i18next';
import { Sun, Moon, Sunrise, Sunset, MoonStar, Star, Circle } from 'lucide-react';
import { formatTime } from '../utils/hinduCalendar';
import { format } from 'date-fns';

export default function PanchangDisplay({ panchang, date }) {
  const { t } = useTranslation();

  const panchangItems = [
    {
      icon: Circle,
      label: t('panchang.tithi'),
      value: panchang.tithi.name,
      subValue: `${panchang.tithi.paksha} ${t('panchang.paksha')}`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Star,
      label: t('panchang.nakshatra'),
      value: panchang.nakshatra.name,
      subValue: `${Math.floor(panchang.nakshatra.percentage * 100)}% complete`,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: MoonStar,
      label: t('panchang.yoga'),
      value: panchang.yoga.name,
      subValue: null,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      icon: Circle,
      label: t('panchang.karana'),
      value: panchang.karana.name,
      subValue: null,
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'from-teal-50 to-emerald-50'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="card-sacred">
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-3">
          <span className="text-3xl">📅</span>
          {t('panchang.title')}
        </h2>
        <p className="text-gray-600 mt-2">
          {format(date, 'EEEE, MMMM dd, yyyy')}
        </p>
      </div>

      {/* Panchang Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {panchangItems.map((item, index) => (
          <div
            key={index}
            className={`card-sacred bg-gradient-to-br ${item.bgColor} border-2 border-white/60 hover:scale-105 transition-transform`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-gray-800 break-words">
                  {item.value}
                </p>
                {item.subValue && (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.subValue}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sun and Moon Times */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sunrise/Sunset */}
        <div className="card-sacred bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-white/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Sun Timings</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Sunrise className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-700">{t('panchang.sunrise')}</span>
              </div>
              <span className="font-bold text-orange-700">
                {formatTime(panchang.sunTimes.sunrise)}
              </span>
            </div>

            <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-700">{t('panchang.sunset')}</span>
              </div>
              <span className="font-bold text-orange-700">
                {formatTime(panchang.sunTimes.sunset)}
              </span>
            </div>
          </div>
        </div>

        {/* Moonrise/Moonset */}
        <div className="card-sacred bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-white/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Moon Timings</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">{t('panchang.moonrise')}</span>
              </div>
              <span className="font-bold text-blue-700">
                {formatTime(panchang.moonTimes.moonrise)}
              </span>
            </div>

            <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <MoonStar className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">{t('panchang.moonset')}</span>
              </div>
              <span className="font-bold text-blue-700">
                {formatTime(panchang.moonTimes.moonset)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
