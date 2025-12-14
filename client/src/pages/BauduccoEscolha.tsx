import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface Product {
  id: string;
  name: string;
  weight: string;
  servings: string;
  quantity: string;
  originalPrice: number;
  discountPrice: number;
  remaining: number;
  image: string;
}

export default function BauduccoEscolha() {
  const [, setLocation] = useLocation();
  const [timeLeft, setTimeLeft] = useState(1799); // 29:59 em segundos
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: 'pequena',
      name: 'Cesta de Natal Pequena Bauducco',
      weight: '1,910 kg',
      servings: '15 pessoas',
      quantity: 'Caixa com 6 unidades',
      originalPrice: 599.80,
      discountPrice: 0,
      remaining: 32,
      image: 'https://natalbauducco.vercel.app/escolha/images/bassi.webp',
    },
    {
      id: 'grande',
      name: 'Cesta de Natal Grande Bauducco',
      weight: '1,580 kg',
      servings: '13 pessoas',
      quantity: 'Caixa com 3 unidades',
      originalPrice: 419.00,
      discountPrice: 0,
      remaining: 28,
      image: 'https://natalbauducco.vercel.app/escolha/images/harmonia.webp',
    },
    {
      id: 'pp',
      name: 'Cesta de Natal PP Bauducco',
      weight: '1,265 kg',
      servings: '13 pessoas',
      quantity: 'Caixa com 6 unidades',
      originalPrice: 799.90,
      discountPrice: 0,
      remaining: 22,
      image: 'https://natalbauducco.vercel.app/escolha/images/gloria.webp',
    },
  ];

  // Contador regressivo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRedeem = (productId: string) => {
    setSelectedProduct(productId);
    // Redirecionar para o checkout com o produto selecionado
    setTimeout(() => {
      window.location.href = 'https://pay.natalfortuna.com/bz5KZb5EA5Y37dL';
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#fbcb07] py-4 px-4 flex justify-between items-center border-b border-gray-300">
        <button className="text-[#d32e2e] text-3xl">
          <i className="fas fa-bars"></i>
        </button>
        <div className="flex-grow text-center">
          <img alt="Bauducco logo" className="inline-block h-10" src="/bauducco_assets/logo-selo-90-2x.png" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 text-2xl">
            <i className="far fa-user-circle"></i>
          </button>
          <button className="text-gray-600 text-2xl">
            <i className="far fa-bookmark"></i>
          </button>
          <div className="relative">
            <button className="text-gray-600 text-2xl">
              <i className="fas fa-shopping-bag"></i>
            </button>
            <span className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full bg-white p-8">
        {/* Banner Promocional */}
        <div className="bg-[#fbcb07] rounded-lg p-8 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-[#8B4513] mb-4">Camadas de sabor</h2>
            <p className="text-2xl font-bold text-[#8B4513]">que conquistam.</p>
          </div>
          <div className="hidden md:block">
            <img src="/bauducco_assets/HEAD-R-P-PERDI-removebg-preview.png" alt="Produtos" className="h-40" />
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl font-bold text-center text-[#d32e2e] mb-2">
          PARABÉNS! VOCÊ GARANTIU SEU KIT DE NATAL BAUDUCCO
        </h1>
        <h2 className="text-2xl font-bold text-center text-[#d32e2e] mb-6">EXCLUSIVO</h2>

        {/* Instruções */}
        <p className="text-center text-gray-700 mb-6">
          Escolha o seu kit abaixo e clique em <strong>"Resgatar"</strong>. Depois, finalize seu pedido informando o endereço de entrega — simples, rápido e seguro.
        </p>

        {/* Aviso de Urgência */}
        <div className="bg-red-600 text-white rounded-full py-3 px-6 text-center mb-6 inline-block mx-auto block">
          <i className="fas fa-exclamation-circle mr-2"></i>
          Oferta válida pelos próximos <strong>{formatTime(timeLeft)}</strong> minutos.
        </div>

        {/* Alerta Amarelo */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <p className="text-gray-700">
            Os kits são extremamente limitados e a demanda está alta. Garanta o seu agora mesmo e tenha um Natal completo com os produtos Bauducco.
          </p>
        </div>

        {/* Título da Seleção */}
        <h3 className="text-2xl font-bold text-center mb-8">Escolha seu kit:</h3>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              {/* Imagem */}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">{product.name}</h4>

                {/* Detalhes */}
                <p className="text-sm text-gray-600 mb-2">Peso do Kit: {product.weight}</p>
                <p className="text-sm text-gray-600 mb-2">Serve até {product.servings}.</p>
                <p className="text-sm text-gray-600 mb-4">{product.quantity}</p>

                {/* Preços */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</p>
                  <p className="text-2xl font-bold text-[#d32e2e]">R$ {product.discountPrice.toFixed(2)}</p>
                </div>

                {/* Quantidade Restante */}
                <p className="text-sm text-gray-600 mb-4">Restam apenas {product.remaining} unidades</p>

                {/* Botão Resgatar */}
                <button
                  onClick={() => handleRedeem(product.id)}
                  className="w-full bg-[#d32e2e] text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  RESGATAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
