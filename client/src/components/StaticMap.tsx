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
  // Usar coordenadas do motel se disponível, caso contrário usar a localização base
  const centerLat = motelData?.latitude || latitude;
  const centerLon = motelData?.longitude || longitude;
  
  // Google Maps Embed API - Chave pública funcional
  const GOOGLE_MAPS_API_KEY = "AIzaSyBEtegzPafQ2CaqqrQFirMiVi7i1ERynTA";
  
  // Construir query de busca para o mapa
  // Se temos dados do motel, buscar pelo nome do motel
  // Caso contrário, usar as coordenadas
  const searchQuery = motelData 
    ? encodeURIComponent(motelData.name)
    : `${centerLat},${centerLon}`;
  
  // URL do Google Maps Embed API
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${searchQuery}&zoom=15`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center relative">
        {/* Google Maps Embed - Mapa interativo */}
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa com localização do motel"
        />
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
