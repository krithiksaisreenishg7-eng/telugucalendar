import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';

export default function DateSelector({ selectedDate, onDateChange }) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday)
  const startDayOfWeek = monthStart.getDay();

  // Create empty slots for days before month starts
  const emptyDays = Array(startDayOfWeek).fill(null);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateChange(today);
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (date) => {
    onDateChange(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="card-sacred animate-slide-up animation-delay-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-sacred-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {t('date.selectDate')}
        </h2>
      </div>

      {/* Selected Date Display */}
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="w-full px-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 rounded-xl border-2 border-accent-200 transition-all duration-200"
      >
        <p className="text-2xl font-bold text-gray-800">
          {format(selectedDate, 'dd')}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {format(selectedDate, 'EEEE, MMMM yyyy')}
        </p>
      </button>

      {/* Quick Today Button */}
      <button
        onClick={handleToday}
        className="w-full mt-3 px-4 py-2 bg-white/80 hover:bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-primary-700 transition-all duration-200"
      >
        {t('date.today')}
      </button>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div className="mt-4 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up">
          {/* Month Navigation */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <p className="font-semibold text-gray-800">
              {format(currentMonth, 'MMMM yyyy')}
            </p>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty slots */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Actual days */}
              {daysInMonth.map((day) => {
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateSelect(day)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-br from-primary-500 to-sacred-600 text-white shadow-lg scale-110'
                        : isTodayDate
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
