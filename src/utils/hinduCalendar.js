import SunCalc from 'suncalc';

// Tithi names (Lunar days)
export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
];

// Nakshatra names (Lunar mansions)
export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

// Yoga names
export const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarma', 'Dhriti', 'Shoola', 'Ganda', 'Vriddhi', 'Dhruva',
  'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti'
];

// Karana names
export const KARANA_NAMES = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

// Calculate Julian Day Number
function getJulianDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y +
            Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  let jd = jdn + (hour - 12) / 24 + minute / 1440 + second / 86400;

  return jd;
}

// Calculate moon phase (0 = new moon, 0.5 = full moon)
function getMoonPhase(date) {
  const jd = getJulianDay(date);
  // Reference: New moon on Jan 6, 2000
  const referenceJD = 2451550.1;
  const synodicMonth = 29.53058867; // Average length of lunar month

  const phase = ((jd - referenceJD) % synodicMonth) / synodicMonth;
  return phase < 0 ? phase + 1 : phase;
}

// Calculate Tithi (Lunar day, 1-30)
export function calculateTithi(date) {
  const phase = getMoonPhase(date);
  const tithiNumber = Math.floor(phase * 30) + 1;
  const tithiIndex = (tithiNumber - 1) % 15;
  const paksha = tithiNumber <= 15 ? 'Shukla' : 'Krishna';

  return {
    number: tithiNumber,
    name: TITHI_NAMES[tithiIndex],
    paksha: paksha,
    percentage: (phase * 30) % 1
  };
}

// Calculate Nakshatra (Lunar mansion, 1-27)
export function calculateNakshatra(date) {
  const jd = getJulianDay(date);
  // Simplified calculation based on moon's position
  const moonLongitude = ((jd - 2451545.0) * 13.176396) % 360;
  const nakshatraNumber = Math.floor(moonLongitude / 13.333333) + 1;
  const nakshatraIndex = (nakshatraNumber - 1) % 27;

  return {
    number: nakshatraNumber,
    name: NAKSHATRA_NAMES[nakshatraIndex],
    percentage: (moonLongitude / 13.333333) % 1
  };
}

// Calculate Yoga (1-27)
export function calculateYoga(date) {
  const jd = getJulianDay(date);
  // Simplified yoga calculation
  const yogaNumber = Math.floor(((jd - 2451545.0) * 0.98563) % 27) + 1;
  const yogaIndex = (yogaNumber - 1) % 27;

  return {
    number: yogaNumber,
    name: YOGA_NAMES[yogaIndex]
  };
}

// Calculate Karana (1-11)
export function calculateKarana(date) {
  const tithi = calculateTithi(date);
  const karanaNumber = ((tithi.number - 1) * 2 + Math.floor(tithi.percentage * 2)) % 11 + 1;
  const karanaIndex = (karanaNumber - 1) % 11;

  return {
    number: karanaNumber,
    name: KARANA_NAMES[karanaIndex]
  };
}

// Get sunrise and sunset times
export function getSunTimes(date, latitude, longitude) {
  const times = SunCalc.getTimes(date, latitude, longitude);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    nadir: times.nadir
  };
}

// Get moon rise and set times
export function getMoonTimes(date, latitude, longitude) {
  const times = SunCalc.getMoonTimes(date, latitude, longitude);
  return {
    moonrise: times.rise || null,
    moonset: times.set || null
  };
}

// Calculate Rahu Kalam (Inauspicious period)
export function calculateRahuKalam(date, latitude, longitude) {
  const sunTimes = getSunTimes(date, latitude, longitude);
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (!sunrise || !sunset) return null;

  const dayDuration = (sunset - sunrise) / (1000 * 60); // minutes
  const segment = dayDuration / 8;
  const dayOfWeek = date.getDay();

  // Rahu Kalam position varies by day of week
  const rahuKalamSegment = {
    0: 4, // Sunday - 4th segment (1:30 PM - 3:00 PM approx)
    1: 1, // Monday - 1st segment (7:30 AM - 9:00 AM approx)
    2: 6, // Tuesday - 6th segment (3:00 PM - 4:30 PM approx)
    3: 5, // Wednesday - 5th segment (12:00 PM - 1:30 PM approx)
    4: 3, // Thursday - 3rd segment (10:30 AM - 12:00 PM approx)
    5: 2, // Friday - 2nd segment (9:00 AM - 10:30 AM approx)
    6: 7  // Saturday - 7th segment (4:30 PM - 6:00 PM approx)
  }[dayOfWeek];

  const startTime = new Date(sunrise.getTime() + (rahuKalamSegment - 1) * segment * 60 * 1000);
  const endTime = new Date(sunrise.getTime() + rahuKalamSegment * segment * 60 * 1000);

  return {
    start: startTime,
    end: endTime,
    duration: segment
  };
}

// Calculate Yama Gandam (Inauspicious period)
export function calculateYamaGandam(date, latitude, longitude) {
  const sunTimes = getSunTimes(date, latitude, longitude);
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (!sunrise || !sunset) return null;

  const dayDuration = (sunset - sunrise) / (1000 * 60); // minutes
  const segment = dayDuration / 8;
  const dayOfWeek = date.getDay();

  // Yama Gandam position varies by day of week
  const yamaGandamSegment = {
    0: 5, // Sunday
    1: 4, // Monday
    2: 3, // Tuesday
    3: 2, // Wednesday
    4: 1, // Thursday
    5: 7, // Friday
    6: 6  // Saturday
  }[dayOfWeek];

  const startTime = new Date(sunrise.getTime() + (yamaGandamSegment - 1) * segment * 60 * 1000);
  const endTime = new Date(sunrise.getTime() + yamaGandamSegment * segment * 60 * 1000);

  return {
    start: startTime,
    end: endTime,
    duration: segment
  };
}

// Calculate Gulika Kalam (Inauspicious period)
export function calculateGulikaKalam(date, latitude, longitude) {
  const sunTimes = getSunTimes(date, latitude, longitude);
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (!sunrise || !sunset) return null;

  const dayDuration = (sunset - sunrise) / (1000 * 60); // minutes
  const segment = dayDuration / 8;
  const dayOfWeek = date.getDay();

  // Gulika Kalam position varies by day of week
  const gulikaSegment = {
    0: 7, // Sunday
    1: 2, // Monday
    2: 5, // Tuesday
    3: 4, // Wednesday
    4: 6, // Thursday
    5: 3, // Friday
    6: 1  // Saturday
  }[dayOfWeek];

  const startTime = new Date(sunrise.getTime() + (gulikaSegment - 1) * segment * 60 * 1000);
  const endTime = new Date(sunrise.getTime() + gulikaSegment * segment * 60 * 1000);

  return {
    start: startTime,
    end: endTime,
    duration: segment
  };
}

// Calculate Abhijit Muhurat (Auspicious period - around noon)
export function calculateAbhijitMuhurat(date, latitude, longitude) {
  const sunTimes = getSunTimes(date, latitude, longitude);
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (!sunrise || !sunset) return null;

  const dayDuration = (sunset - sunrise) / (1000 * 60); // minutes
  const noon = new Date(sunrise.getTime() + (dayDuration / 2) * 60 * 1000);

  // Abhijit is approximately 24 minutes (1 muhurat = 48 minutes, half = 24)
  const muhurat = 48; // minutes
  const startTime = new Date(noon.getTime() - (muhurat / 2) * 60 * 1000);
  const endTime = new Date(noon.getTime() + (muhurat / 2) * 60 * 1000);

  return {
    start: startTime,
    end: endTime,
    duration: muhurat
  };
}

// Calculate Amrit Kaal (Auspicious period)
export function calculateAmritKaal(date, latitude, longitude) {
  const tithi = calculateTithi(date);
  const nakshatra = calculateNakshatra(date);
  const sunTimes = getSunTimes(date, latitude, longitude);

  // Amrit Kaal is calculated based on specific tithi and nakshatra combinations
  // Simplified calculation: favorable period in morning
  const sunrise = sunTimes.sunrise;
  if (!sunrise) return null;

  const startTime = new Date(sunrise.getTime() + 60 * 60 * 1000); // 1 hour after sunrise
  const endTime = new Date(sunrise.getTime() + 150 * 60 * 1000); // 2.5 hours after sunrise

  return {
    start: startTime,
    end: endTime,
    duration: 90
  };
}

// Calculate Durmuhurtam (Inauspicious short period)
export function calculateDurmuhurtam(date, latitude, longitude) {
  const sunTimes = getSunTimes(date, latitude, longitude);
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (!sunrise || !sunset) return null;

  const dayDuration = (sunset - sunrise) / (1000 * 60); // minutes
  const muhurat = 48; // One muhurat = 48 minutes

  // Durmuhurtam is typically before noon
  const startTime = new Date(sunrise.getTime() + (dayDuration / 2 - muhurat) * 60 * 1000);
  const endTime = new Date(startTime.getTime() + muhurat * 60 * 1000);

  return {
    start: startTime,
    end: endTime,
    duration: muhurat
  };
}

// Get complete Panchang for a date
export function getPanchang(date, latitude, longitude) {
  const tithi = calculateTithi(date);
  const nakshatra = calculateNakshatra(date);
  const yoga = calculateYoga(date);
  const karana = calculateKarana(date);
  const sunTimes = getSunTimes(date, latitude, longitude);
  const moonTimes = getMoonTimes(date, latitude, longitude);

  const rahuKalam = calculateRahuKalam(date, latitude, longitude);
  const yamaGandam = calculateYamaGandam(date, latitude, longitude);
  const gulikaKalam = calculateGulikaKalam(date, latitude, longitude);
  const abhijitMuhurat = calculateAbhijitMuhurat(date, latitude, longitude);
  const amritKaal = calculateAmritKaal(date, latitude, longitude);
  const durmuhurtam = calculateDurmuhurtam(date, latitude, longitude);

  return {
    tithi,
    nakshatra,
    yoga,
    karana,
    sunTimes,
    moonTimes,
    auspicious: {
      abhijitMuhurat,
      amritKaal
    },
    inauspicious: {
      rahuKalam,
      yamaGandam,
      gulikaKalam,
      durmuhurtam
    }
  };
}

// Format time for display
export function formatTime(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) return '--:--';
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// Format time range
export function formatTimeRange(start, end) {
  return `${formatTime(start)} - ${formatTime(end)}`;
}
