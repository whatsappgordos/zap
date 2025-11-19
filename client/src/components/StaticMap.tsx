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
  // Usar MapTiler (gratuito até 100k requisições/mês) como alternativa ao Google Maps
  // Formato: https://api.maptiler.com/maps/streets/static/{lon},{lat},{zoom}/{width}x{height}.png?key=get_your_own_OpIi9ZULNHzrESv6T2vL
  // Vamos usar OpenStreetMap via StaticMapMaker que não requer API key
  
  const centerLat = motelData?.latitude || latitude;
  const centerLon = motelData?.longitude || longitude;
  const zoom = 14;
  const width = 600;
  const height = 400;
  
  // Usando MapTiler com uma key pública de demonstração (você pode criar sua própria em https://www.maptiler.com/)
  // Para produção, recomenda-se criar uma conta gratuita no MapTiler
  const mapUrl = `https://api.maptiler.com/maps/streets/static/${centerLon},${centerLat},${zoom}/${width}x${height}.png?key=get_your_own_OpIi9ZULNHzrESv6T2vL&markers=${centerLon},${centerLat},red`;
  
  // Fallback usando OpenStreetMap direto (sem marcador customizado)
  const osmFallbackUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&markers=${centerLat},${centerLon},red`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
      <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
        {/* Mapa estático como imagem */}
        <img
          src={osmFallbackUrl}
          alt="Mapa com localização do motel"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Se o primeiro fallback falhar, tentar com uma URL alternativa
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fallbackAttempted) {
              target.dataset.fallbackAttempted = 'true';
              // Tentar com outro serviço de mapas estáticos
              target.src = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${width}&height=${height}&center=lonlat:${centerLon},${centerLat}&zoom=${zoom}&marker=lonlat:${centerLon},${centerLat};color:%23ff0000;size:medium&apiKey=YOUR_API_KEY`;
            } else {
              // Se todos falharem, esconder a imagem e mostrar o placeholder
              target.style.display = 'none';
            }
          }}
        />
        
        {/* Fallback: Mostrar um placeholder com informações */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-center p-4 pointer-events-none">
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
