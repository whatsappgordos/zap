import { useState } from "react";
import { useLocation } from "wouter";

export default function Numero() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `+${value}`;
      } else if (value.length <= 4) {
        value = `+${value.slice(0, 2)} (${value.slice(2)}`;
      } else if (value.length <= 9) {
        value = `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(4)}`;
      } else {
        value = `+${value.slice(0, 2)} (${value.slice(2, 4)}) ${value.slice(4, 9)}-${value.slice(9, 13)}`;
      }
    }
    
    setPhoneNumber(value);
  };

  const handleStartMonitoring = () => {
    if (phoneNumber.replace(/\D/g, "").length >= 10) {
      localStorage.setItem("phoneNumber", phoneNumber);
      setLocation("/carregando");
    }
  };

  const handleBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded transition"
          >
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div className="flex-1"></div>

          <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition border border-black">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-black mb-4">
            Insira o Número
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-lg mb-12">
            Digite o número de telefone que deseja monitorar.
          </p>

          {/* Phone Input */}
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+55 (11) 98765-4321"
                maxLength={25}
                className="w-full px-6 py-4 border-2 border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-semibold text-gray-700 text-lg bg-white"
              />
            </div>

            <button
              onClick={handleStartMonitoring}
              disabled={phoneNumber.replace(/\D/g, "").length < 10}
              className="w-full bg-green-500 hover:bg-green-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl border-2 border-black transition transform hover:shadow-lg active:scale-95 focus:outline-none disabled:cursor-not-allowed text-lg"
            >
              Iniciar Monitoramento
            </button>
          </div>

          {/* Info Text */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Seu número será processado com segurança e criptografia de ponta a ponta.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Suporte por Email
            </a>
          </div>
          <p className="text-center text-gray-500 text-xs">
            © 2024 Proteja Seu Relacionamento. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Cookie Notice */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 flex items-center justify-center gap-4 shadow-lg z-50">
        <p className="text-gray-700 text-sm flex-1 text-center">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política.
        </p>
        <button
          onClick={(e) => {
            const banner = (e.target as HTMLElement).closest('[data-cookie-banner]');
            if (banner) banner.remove();
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition whitespace-nowrap border border-black"
          data-cookie-banner
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
