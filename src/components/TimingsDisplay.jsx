import { useTranslation } from 'react-i18next';
import { AlertTriangle, Sparkles, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
import { formatTimeRange } from '../utils/hinduCalendar';

export default function TimingsDisplay({ auspicious, inauspicious }) {
  const { t } = useTranslation();

  const auspiciousTimings = [
    {
      icon: Sparkles,
      name: t('timings.abhijit'),
      description: t('timings.description.abhijit'),
      timing: auspicious.abhijitMuhurat,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: Sparkles,
      name: t('timings.amritKaal'),
      description: t('timings.description.amritKaal'),
      timing: auspicious.amritKaal,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    }
  ];

  const inauspiciousTimings = [
    {
      icon: AlertTriangle,
      name: t('timings.rahuKalam'),
      description: t('timings.description.rahuKalam'),
      timing: inauspicious.rahuKalam,
      color: 'from-red-500 to-rose-600',
      bgColor: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200'
    },
    {
      icon: AlertTriangle,
      name: t('timings.yamagandam'),
      description: t('timings.description.yamagandam'),
      timing: inauspicious.yamaGandam,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: AlertTriangle,
      name: t('timings.gulika'),
      description: t('timings.description.gulika'),
      timing: inauspicious.gulikaKalam,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200'
    },
    {
      icon: AlertTriangle,
      name: t('timings.durmuhurtam'),
      description: t('timings.description.durmuhurtam'),
      timing: inauspicious.durmuhurtam,
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in animation-delay-200">
      {/* Auspicious Timings */}
      <div className="card-sacred bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t('timings.auspicious')}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t('timings.goodFor')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auspiciousTimings.map((timing, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${timing.bgColor} rounded-xl p-5 border-2 ${timing.borderColor} auspicious-glow hover:scale-105 transition-transform`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${timing.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <timing.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {timing.name}
                  </h3>
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-3 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-bold text-green-800 text-lg">
                  {timing.timing ? formatTimeRange(timing.timing.start, timing.timing.end) : '--:-- - --:--'}
                </span>
              </div>

              <div className="flex items-start gap-2 bg-white/50 rounded-lg p-3">
                <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {timing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inauspicious Timings */}
      <div className="card-sacred bg-gradient-to-br from-red-50/50 to-orange-50/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <XCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t('timings.inauspicious')}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t('timings.avoid')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inauspiciousTimings.map((timing, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${timing.bgColor} rounded-xl p-5 border-2 ${timing.borderColor} inauspicious-glow hover:scale-105 transition-transform`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${timing.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <timing.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {timing.name}
                  </h3>
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-3 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="font-bold text-red-800 text-lg">
                  {timing.timing ? formatTimeRange(timing.timing.start, timing.timing.end) : '--:-- - --:--'}
                </span>
              </div>

              <div className="flex items-start gap-2 bg-white/50 rounded-lg p-3">
                <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {timing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
