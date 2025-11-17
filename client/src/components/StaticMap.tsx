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
  // Usar OpenStreetMap em vez de Google Maps (sem necessidade de API key)
  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${motelData?.longitude || longitude},${motelData?.latitude || latitude}&zoom=15&marker=lonlat:${motelData?.longitude || longitude},${motelData?.latitude || latitude};color:%23FF0000;size:medium`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
      <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
        {/* Mapa estático como imagem */}
        <img
          src={mapUrl}
          alt="Mapa com localização do motel"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback se a imagem não carregar
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        
        {/* Fallback: Mostrar um placeholder com informações */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-center p-4">
          <div>
            <div className="text-4xl mb-2">📍</div>
            <p className="text-gray-600 font-semibold">
              Localização do Motel
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Latitude: {latitude.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500">
              Longitude: {longitude.toFixed(4)}
            </p>
          </div>
        </div>
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
