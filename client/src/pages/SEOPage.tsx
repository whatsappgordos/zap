import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function SEOPage() {
  const [, setLocation] = useLocation();

  // Esta função agora redireciona para a rota principal (LandingPage)
  const handleRedirectToMain = () => {
    setLocation("/");
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
        <div className="w-full max-w-3xl">
          {/* Título Otimizado para SEO */}
          <h1 className="text-4xl font-bold text-center text-black mb-4">
            Descubra a Verdade: O Melhor **Espião WhatsApp** e Ferramenta para **Rastrear WhatsApp**
          </h1>

          {/* Subtítulo Otimizado */}
          <p className="text-center text-gray-600 text-lg mb-8">
            Se você precisa **descobrir traição** ou **monitorar parceiro(a)**, nossa solução de **Whatsapp Espião 2026** é a mais segura e eficaz do mercado.
          </p>

          {/* Botão de Ação - Redireciona para a Landing Page principal */}
          <div className="flex justify-center mb-12">
            <button
              onClick={handleRedirectToMain}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl border-2 border-black text-xl transition transform hover:scale-105 focus:outline-none"
            >
              CLIQUE AQUI PARA INICIAR O MONITORAMENTO AGORA!
            </button>
          </div>

          {/* Bloco de Conteúdo Otimizado para SEO */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-black">
              Por Que Você Precisa de um **Espião WhatsApp**?
            </h2>
            <p>
              A desconfiança em um relacionamento pode ser devastadora. Milhares de pessoas buscam diariamente por soluções para **rastrear WhatsApp** e ter certeza sobre a fidelidade de seus parceiros. Nossa ferramenta de **Whatsapp Espião 2026** oferece a tecnologia mais avançada para que você possa **descobrir traição** de forma discreta e segura.
            </p>
            <h2 className="text-2xl font-bold text-black">
              Como **Monitorar Parceiro(a)** de Forma Segura
            </h2>
            <p>
              Diferente de outros métodos, nossa solução é 100% anônima e não requer acesso físico ao dispositivo. Ao clicar no botão acima, você será direcionado para o nosso sistema principal, onde poderá iniciar o processo de **monitorar parceiro(a)** em poucos passos. Não perca mais tempo com dúvidas, use a ferramenta mais confiável para **rastrear WhatsApp** no Brasil.
            </p>
            <h2 className="text-2xl font-bold text-black">
              **Whatsapp Espião 2026**: A Tecnologia Mais Recente
            </h2>
            <p>
              Nossa plataforma é constantemente atualizada para garantir a compatibilidade com as últimas versões do aplicativo. Se você busca por um **espião WhatsApp** que realmente funciona, você encontrou. Clique no botão vermelho e comece a **descobrir traição** hoje mesmo.
            </p>
          </div>

          {/* Botão de Ação - Redireciona para a Landing Page principal */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleRedirectToMain}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl border-2 border-black text-xl transition transform hover:scale-105 focus:outline-none"
            >
              QUERO **RASTREAR WHATSAPP** AGORA!
            </button>
          </div>

        </div>
      </main>

      {/* Footer (Mantido para consistência) */}
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

      {/* Cookie Notice (Mantido para consistência) */}
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
