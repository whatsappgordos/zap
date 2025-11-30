import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutos em segundos

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 10 * 60; // Reinicia quando chega a zero
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-6 px-4 rounded-2xl shadow-2xl mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base font-semibold mb-3 uppercase tracking-wider animate-pulse">
          ⚡ PROMOÇÃO RELÂMPAGO TERMINA EM:
        </p>
        
        <div className="flex justify-center items-center gap-3 md:gap-6">
          {/* Minutos */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-lg">
            <div className="text-4xl md:text-6xl font-bold tabular-nums">
              {String(minutes).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm font-medium mt-2 opacity-90">
              MINUTOS
            </div>
          </div>

          {/* Separador */}
          <div className="text-4xl md:text-6xl font-bold animate-pulse">
            :
          </div>

          {/* Segundos */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-lg">
            <div className="text-4xl md:text-6xl font-bold tabular-nums">
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm font-medium mt-2 opacity-90">
              SEGUNDOS
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm mt-4 opacity-90">
          🔥 Não perca essa oportunidade! O preço volta ao normal após o término.
        </p>
      </div>
    </div>
  );
}
