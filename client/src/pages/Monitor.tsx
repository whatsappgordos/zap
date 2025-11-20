import { useEffect, useState } from "react";

interface Stats {
  startTime: string;
  lastPing: string | null;
  totalPings: number;
  uptime: number;
  uptimeFormatted: string;
  pings: Array<{
    timestamp: string;
    ip: string;
  }>;
}

export function Monitor() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoPingEnabled, setAutoPingEnabled] = useState(false);

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Falha ao buscar estatísticas');
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Fazer ping no keep-alive
  const sendPing = async () => {
    try {
      await fetch('/keep-alive');
      fetchStats();
    } catch (err) {
      console.error('Erro ao enviar ping:', err);
    }
  };

  // Atualizar estatísticas a cada 5 segundos
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-ping a cada 10 minutos
  useEffect(() => {
    if (!autoPingEnabled) return;
    
    const interval = setInterval(() => {
      sendPing();
    }, 10 * 60 * 1000); // 10 minutos
    
    return () => clearInterval(interval);
  }, [autoPingEnabled]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-500 text-xl">Erro: {error}</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTimeSinceLastPing = () => {
    if (!stats?.lastPing) return 'Nunca';
    const diff = Date.now() - new Date(stats.lastPing).getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s atrás`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔄 Monitor de Keep-Alive
          </h1>
          <p className="text-gray-600">
            Sistema de monitoramento para evitar que o Render entre em modo sleep
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-500 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Status</div>
            <div className="text-2xl font-bold">🟢 Online</div>
          </div>

          <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Uptime</div>
            <div className="text-2xl font-bold">{stats?.uptimeFormatted}</div>
          </div>

          <div className="bg-purple-500 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Total de Pings</div>
            <div className="text-2xl font-bold">{stats?.totalPings}</div>
          </div>

          <div className="bg-orange-500 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Último Ping</div>
            <div className="text-lg font-bold">{getTimeSinceLastPing()}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Controles</h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={sendPing}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              📡 Enviar Ping Agora
            </button>

            <button
              onClick={() => setAutoPingEnabled(!autoPingEnabled)}
              className={`${
                autoPingEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-bold py-3 px-6 rounded-lg transition-colors`}
            >
              {autoPingEnabled ? '⏸️ Desativar Auto-Ping' : '▶️ Ativar Auto-Ping (10min)'}
            </button>

            <button
              onClick={fetchStats}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🔄 Atualizar Stats
            </button>
          </div>

          {autoPingEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Auto-ping ativado! O servidor receberá um ping a cada 10 minutos.
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">ℹ️ Informações</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Iniciado em:</span>
              <span>{stats && formatDate(stats.startTime)}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Último ping em:</span>
              <span>{stats?.lastPing ? formatDate(stats.lastPing) : 'Nunca'}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Pings recentes:</span>
              <span>{stats?.pings.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Recent Pings */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Pings Recentes</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-gray-600">#</th>
                  <th className="text-left py-2 px-4 text-gray-600">Data/Hora</th>
                  <th className="text-left py-2 px-4 text-gray-600">IP</th>
                </tr>
              </thead>
              <tbody>
                {stats?.pings.slice().reverse().slice(0, 20).map((ping, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-gray-700">{stats.pings.length - index}</td>
                    <td className="py-2 px-4 text-gray-700">{formatDate(ping.timestamp)}</td>
                    <td className="py-2 px-4 text-gray-700 font-mono text-sm">{ping.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!stats?.pings || stats.pings.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                Nenhum ping registrado ainda
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-xl p-6 mt-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-4">💡 Como usar</h2>
          
          <div className="space-y-3 text-yellow-800">
            <p>
              <strong>1. Auto-Ping Interno:</strong> Ative o botão "Ativar Auto-Ping" nesta página para enviar pings automáticos a cada 10 minutos.
            </p>
            
            <p>
              <strong>2. Serviço Externo (Recomendado):</strong> Configure um serviço gratuito para fazer pings externos:
            </p>
            
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <a href="https://uptimerobot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  UptimeRobot
                </a> - Monitore até 50 sites gratuitamente
              </li>
              <li>
                <a href="https://cron-job.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  Cron-job.org
                </a> - Cron jobs gratuitos
              </li>
              <li>
                <a href="https://betteruptime.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  Better Uptime
                </a> - Monitoramento profissional
              </li>
            </ul>

            <p className="mt-4">
              <strong>URL para configurar:</strong>
              <code className="block mt-2 bg-yellow-100 p-2 rounded font-mono text-sm">
                https://zap-muny.onrender.com/keep-alive
              </code>
            </p>

            <p className="mt-4">
              <strong>Intervalo recomendado:</strong> A cada 10-14 minutos (Render dorme após 15 minutos de inatividade)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
