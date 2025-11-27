import { useState } from "react";

interface StaticMapProps {
  latitude: number;
  longitude: number;
  motelData?: {
    name: string;
    distance: string;
    rating: string;
    latitude: number;
    longitude: number;
  };
}

export function StaticMap({ latitude, longitude, motelData }: StaticMapProps) {
  const [mapError, setMapError] = useState(false);
  
  // Usar coordenadas do motel se disponível, caso contrário usar a localização base
  const centerLat = motelData?.latitude || latitude;
  const centerLon = motelData?.longitude || longitude;
  const zoom = 15;
  const width = 800;
  const height = 500;
  
  // Chave de API do Google Maps (pública sem restrições)
  const GOOGLE_MAPS_API_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";
  
  // Google Maps Static API (PRIORIDADE)
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:M%7C${centerLat},${centerLon}&key=${GOOGLE_MAPS_API_KEY}&scale=2`;

  const handleImageError = () => {
    console.log("Google Maps falhou ao carregar");
    setMapError(true);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center relative">
        {/* Mapa do Google Maps (PRIORIDADE) */}
        {!mapError ? (
          <img
            src={googleMapsUrl}
            alt="Mapa com localização do motel"
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="eager"
          />
        ) : (
          /* Placeholder - só mostra se o Google Maps falhar */
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-center p-4">
            <div>
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" style={{ width: '60px', height: '60px', margin: 'auto' }}></div>
                <div className="text-6xl relative z-10">📍</div>
              </div>
              <p className="text-gray-700 font-bold text-lg">
                Localização Suspeita Detectada
              </p>
              {motelData && (
                <p className="text-red-600 font-semibold mt-2">
                  {motelData.name}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Lat: {centerLat.toFixed(4)}, Lon: {centerLon.toFixed(4)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Informações do motel */}
      {motelData && (
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 sm:p-4 border-t border-gray-200">
          <h3 className="font-bold text-red-600 text-sm sm:text-base">{motelData.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            <strong>Distância:</strong> {motelData.distance}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            <strong>Avaliação:</strong> ⭐ {motelData.rating}
          </p>
        </div>
      )}
    </div>
  );
}
