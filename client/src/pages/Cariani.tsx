import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";

// Componente para a página de VSL clonada do Cariani
export default function Cariani() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);
  const videoUrl = "https://cdn.converteai.net/1.mp4";
  const ctaLink = "http://pay.kiwify.com.br/2p7bMLf"; // Link base do checkout
  const ctaText = "SIM! ACEITO PERDER ATÉ 10KG DE GORDURA!";
  
  // O usuário pediu para liberar o botão mais rápido.
  // Vamos liberar após 8 segundos (8000ms).
  const buttonDelayMs = 8000; 

  useEffect(() => {
    // Tenta iniciar a reprodução do vídeo
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Erro ao tentar reproduzir o vídeo automaticamente:", error);
        // O erro é esperado em alguns navegadores, mas a tentativa é válida.
      });
    }

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
          <video
            ref={videoRef} // Adiciona a referência
            src={videoUrl}
            controls
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            poster="https://cariani.com.br/wp-content/uploads/2024/05/thumb-vsl-d.jpg" // Imagem de capa do vídeo (tentativa de clonar)
          />
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
