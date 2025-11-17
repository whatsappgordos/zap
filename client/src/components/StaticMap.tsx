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
  // Gerar URL do mapa estático do Google Maps
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=color:red%7C${motelData?.latitude || latitude},${motelData?.longitude || longitude}&key=AIzaSyDyWJOw5w-IfZM9MeGbAGYR_XJ1p7JZEYA`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative">
      <img
        src={mapUrl}
        alt="Mapa com localização do motel"
        className="w-full h-80 object-cover"
      />
      {motelData && (
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 sm:p-4">
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
