// Popular locations in India and around the world with coordinates
export const LOCATIONS = [
  // Major Indian Cities - South
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.3850, lng: 78.4867, timezone: 'Asia/Kolkata' },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707, timezone: 'Asia/Kolkata' },
  { id: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', country: 'India', lat: 16.5062, lng: 80.6480, timezone: 'Asia/Kolkata' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', lat: 17.6869, lng: 83.2185, timezone: 'Asia/Kolkata' },
  { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', country: 'India', lat: 13.6288, lng: 79.4192, timezone: 'Asia/Kolkata' },
  { id: 'mysore', name: 'Mysore', state: 'Karnataka', country: 'India', lat: 12.2958, lng: 76.6394, timezone: 'Asia/Kolkata' },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', lat: 11.0168, lng: 76.9558, timezone: 'Asia/Kolkata' },
  { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu', country: 'India', lat: 9.9252, lng: 78.1198, timezone: 'Asia/Kolkata' },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lng: 76.2673, timezone: 'Asia/Kolkata' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', lat: 8.5241, lng: 76.9366, timezone: 'Asia/Kolkata' },

  // Major Indian Cities - North
  { id: 'delhi', name: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639, timezone: 'Asia/Kolkata' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567, timezone: 'Asia/Kolkata' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lng: 72.5714, timezone: 'Asia/Kolkata' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 'Asia/Kolkata' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, timezone: 'Asia/Kolkata' },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', lat: 26.4499, lng: 80.3319, timezone: 'Asia/Kolkata' },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', country: 'India', lat: 21.1458, lng: 79.0882, timezone: 'Asia/Kolkata' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', country: 'India', lat: 22.7196, lng: 75.8577, timezone: 'Asia/Kolkata' },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', lat: 23.2599, lng: 77.4126, timezone: 'Asia/Kolkata' },
  { id: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', country: 'India', lat: 30.7333, lng: 76.7794, timezone: 'Asia/Kolkata' },
  { id: 'patna', name: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lng: 85.1376, timezone: 'Asia/Kolkata' },

  // Holy Cities
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', lat: 25.3176, lng: 82.9739, timezone: 'Asia/Kolkata' },
  { id: 'haridwar', name: 'Haridwar', state: 'Uttarakhand', country: 'India', lat: 29.9457, lng: 78.1642, timezone: 'Asia/Kolkata' },
  { id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', country: 'India', lat: 30.0869, lng: 78.2676, timezone: 'Asia/Kolkata' },
  { id: 'puri', name: 'Puri', state: 'Odisha', country: 'India', lat: 19.8135, lng: 85.8312, timezone: 'Asia/Kolkata' },
  { id: 'dwarka', name: 'Dwarka', state: 'Gujarat', country: 'India', lat: 22.2442, lng: 68.9685, timezone: 'Asia/Kolkata' },
  { id: 'rameswaram', name: 'Rameswaram', state: 'Tamil Nadu', country: 'India', lat: 9.2876, lng: 79.3129, timezone: 'Asia/Kolkata' },
  { id: 'amritsar', name: 'Amritsar', state: 'Punjab', country: 'India', lat: 31.6340, lng: 74.8723, timezone: 'Asia/Kolkata' },

  // International (for diaspora)
  { id: 'new-york', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
];

// Get location by ID
export function getLocationById(id) {
  return LOCATIONS.find(loc => loc.id === id);
}

// Search locations by name
export function searchLocations(query) {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return LOCATIONS.slice(0, 10); // Return first 10 by default

  return LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm) ||
    (loc.state && loc.state.toLowerCase().includes(searchTerm)) ||
    loc.country.toLowerCase().includes(searchTerm)
  ).slice(0, 10);
}

// Get user's current location using browser geolocation
export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: 'Current Location',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// Format location display name
export function formatLocationName(location) {
  if (!location) return '';
  if (location.state) {
    return `${location.name}, ${location.state}, ${location.country}`;
  }
  return `${location.name}, ${location.country}`;
}
