import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";

// Hook para alterar o título da página
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

// Componente para a página de VSL clonada do Cariani
export default function Cariani() {
  usePageTitle("Seca Barriga");
  const [, setLocation] = useLocation();
  // Não é mais necessário o videoRef para o YouTube
  const [showButton, setShowButton] = useState(false);
  const videoId = 'TCQj3olbuxg'; // ID do vídeo do YouTube
  const ctaLink = "http://pay.kiwify.com.br/2p7bMLf"; // Link base do checkout
  const ctaText = "SIM! ACEITO PERDER ATÉ 10KG DE GORDURA!";
  
  // O usuário pediu para liberar o botão mais rápido.
  // Vamos liberar após 8 segundos (8000ms).
  const buttonDelayMs = 8000; 

  useEffect(() => {
    // Lógica para liberar o botão
    const timer = setTimeout(() => {
      setShowButton(true);
    }, buttonDelayMs);

    return () => clearTimeout(timer);
  }, []);

  // Função para lidar com o clique no botão de CTA
  const handleCtaClick = () => {
    // Redireciona para o link de checkout
    window.location.href = ctaLink;
  };

  return (
    <div className="min-h-screen bg-[#1E392A] flex flex-col items-center p-4">
      {/* Barra de alerta vermelha no topo */}
      <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold fixed top-0 z-10">
        496 pessoas estão assistindo a esta apresentação. Devido ao alto número de acessos, ela estará disponível apenas até: 12/12/2025
      </div>

      {/* Conteúdo principal com margem para a barra fixa */}
      <div className="mt-12 max-w-3xl w-full">
        {/* Título/Texto de Exposição */}
        <p className="text-white text-center text-xl font-bold mt-4 mb-6 px-4">
          <span className="text-green-400">EXPOSED:</span> Celebridades que você conhece pelo nome estão “trapaceando” o seu metabolismo para queimar de 5 até 10 kg de gordura, sem usar Ozempic e fazendo isso dentro da sua própria casa.
        </p>

        {/* Player de Vídeo */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Secar Barriga VSL"
          ></iframe>
        </div>

        {/* Botão de CTA (Condicional) */}
        {showButton && (
          <div className="mt-8">
            <button
              onClick={handleCtaClick}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-2xl font-extrabold py-4 rounded-lg shadow-xl transition duration-300 transform hover:scale-[1.02] animate-pulse"
            >
              {ctaText}
            </button>
            <p className="text-center text-xs text-gray-300 mt-2">
              *Clique no botão acima para garantir sua vaga antes que o tempo acabe.
            </p>
          </div>
        )}
      </div>

      {/* Rodapé simples */}
      <footer className="mt-12 w-full text-center text-xs text-gray-500 py-4">
        Copyright © 2025 OVERAL COMPANY – Todos os direitos reservados.
      </footer>
    </div>
  );
}
