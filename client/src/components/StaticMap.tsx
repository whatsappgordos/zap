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
  const zoom = 14;
  const width = 600;
  const height = 400;
  
  // Google Maps Static API - Formato oficial
  // Documentação: https://developers.google.com/maps/documentation/maps-static/overview
  // 
  // NOTA: Para produção, você precisa criar uma chave de API gratuita em:
  // https://console.cloud.google.com/google/maps-apis/
  // 
  // Passos:
  // 1. Acesse Google Cloud Console
  // 2. Crie um novo projeto ou selecione um existente
  // 3. Ative a "Maps Static API"
  // 4. Vá em "Credenciais" e crie uma chave de API
  // 5. Substitua YOUR_API_KEY abaixo pela sua chave
  //
  // O Google oferece $200 de crédito gratuito por mês, o que equivale a cerca de 28.000 carregamentos de mapa estático
  
  const GOOGLE_MAPS_API_KEY = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // Chave pública de demonstração - substitua pela sua
  
  // Construir URL do Google Maps Static API
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:M%7C${centerLat},${centerLon}&key=${GOOGLE_MAPS_API_KEY}`;
  
  // Fallback para caso a API do Google não funcione (chave inválida, quota excedida, etc)
  const osmFallbackUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&markers=${centerLat},${centerLon},red`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
      <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
        {/* Mapa estático do Google Maps */}
        <img
          src={googleMapsUrl}
          alt="Mapa com localização do motel"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Se o Google Maps falhar, tentar com OpenStreetMap como fallback
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fallbackAttempted) {
              target.dataset.fallbackAttempted = 'true';
              console.log("Google Maps API falhou, usando OpenStreetMap como fallback");
              target.src = osmFallbackUrl;
            } else {
              // Se todos falharem, esconder a imagem e mostrar o placeholder
              target.style.display = 'none';
            }
          }}
        />
        
        {/* Fallback: Mostrar um placeholder com informações caso todos os mapas falhem */}
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
