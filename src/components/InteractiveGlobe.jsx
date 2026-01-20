import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { LOCATIONS } from '../utils/locations';

export default function InteractiveGlobe({ onLocationSelect, selectedLocation }) {
  const globeEl = useRef();
  const [globeReady, setGlobeReady] = useState(false);

  // Prepare location data for globe
  const locationMarkers = LOCATIONS.map(loc => ({
    lat: loc.lat,
    lng: loc.lng,
    size: 0.5,
    color: loc.id === selectedLocation?.id ? '#ff4d4d' : '#f5b02e',
    label: loc.name,
    location: loc
  }));

  useEffect(() => {
    if (globeEl.current && globeReady) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;

      // Point camera to selected location
      if (selectedLocation) {
        globeEl.current.pointOfView({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          altitude: 2
        }, 1000);
      }
    }
  }, [globeReady, selectedLocation]);

  const handleMarkerClick = (marker) => {
    if (marker.location) {
      onLocationSelect(marker.location);

      // Zoom into clicked location
      if (globeEl.current) {
        globeEl.current.pointOfView({
          lat: marker.lat,
          lng: marker.lng,
          altitude: 1.5
        }, 1000);
      }
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        // Points (location markers)
        pointsData={locationMarkers}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={d => d.color}
        pointAltitude={0.01}
        pointRadius={d => d.size}
        pointLabel={d => `
          <div style="
            background: linear-gradient(135deg, #f5b02e 0%, #ff8124 100%);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.3);
          ">
            ${d.label}
          </div>
        `}
        onPointClick={handleMarkerClick}
        pointsTransitionDuration={1000}

        // Arcs (optional - connecting selected location to important cities)
        arcsData={selectedLocation ? [{
          startLat: selectedLocation.lat,
          startLng: selectedLocation.lng,
          endLat: 0,
          endLng: 0,
          color: ['#ff8124', '#f5b02e']
        }] : []}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}

        // Atmosphere
        atmosphereColor="#ff8124"
        atmosphereAltitude={0.15}

        // Globe material
        globeMaterial={{
          bumpScale: 10,
          shininess: 0.5
        }}

        // Controls
        enablePointerInteraction={true}
        onGlobeReady={() => setGlobeReady(true)}

        // Camera
        animateIn={true}
      />

      {/* Overlay UI Elements */}
      <div className="absolute top-4 left-4 z-10">
        <div className="glass-morphism rounded-xl px-4 py-3 shadow-xl">
          <p className="text-sm font-semibold gradient-text">
            🌍 Select Your Location
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Click on any marker or rotate the globe
          </p>
        </div>
      </div>

      {selectedLocation && (
        <div className="absolute bottom-4 right-4 z-10 animate-slide-up">
          <div className="glass-morphism rounded-xl px-4 py-3 shadow-xl border-2 border-primary-300">
            <p className="text-xs text-gray-600 mb-1">Selected Location</p>
            <p className="text-lg font-bold gradient-text">
              {selectedLocation.name}
            </p>
            {selectedLocation.state && (
              <p className="text-sm text-gray-700">
                {selectedLocation.state}, {selectedLocation.country}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Control hints */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs space-y-1">
          <p>🖱️ <span className="text-gray-300">Drag to rotate</span></p>
          <p>🔍 <span className="text-gray-300">Scroll to zoom</span></p>
          <p>📍 <span className="text-gray-300">Click marker to select</span></p>
        </div>
      </div>
    </div>
  );
}
