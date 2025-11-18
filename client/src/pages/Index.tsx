import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [, setLocation] = useLocation();

  const handleSelectProfile = (profile: "male" | "female") => {
    localStorage.setItem("selectedProfile", profile);
    setLocation("/numero");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Menu Button */}
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          {/* Logo/Title - Empty for now */}
          <div className="flex-1"></div>

          {/* Download Button */}
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
            Proteja Seu Relacionamento
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-lg mb-12">
            Descubra como manter seu relacionamento seguro e saudável com nossa solução exclusiva.
          </p>

          {/* Buttons Container */}
          <div className="space-y-4">
            {/* Monitorar Parceiro Button */}
            <button
              onClick={() => handleSelectProfile("male")}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-2xl border-2 border-black flex items-center justify-center gap-3 transition transform hover:shadow-lg active:scale-95 focus:outline-none"
            >
              {/* Icon Circle */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="text-base font-semibold">Quero Monitorar Meu Parceiro</span>
            </button>

            {/* Monitorar Parceira Button */}
            <button
              onClick={() => handleSelectProfile("female")}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-2xl border-2 border-black flex items-center justify-center gap-3 transition transform hover:shadow-lg active:scale-95 focus:outline-none"
            >
              {/* Icon Circle */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="text-base font-semibold">Quero Monitorar Minha Parceira</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Links */}
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

          {/* Copyright */}
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
          onClick={() => {
            const banner = document.querySelector('[data-cookie-banner]');
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
