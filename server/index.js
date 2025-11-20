import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Para usar __dirname e __filename em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000; // Alterado de 3000 para 10000 para compatibilidade com o ambiente Render

// Middleware para JSON
app.use(express.json());

// Armazenar estatísticas de keep-alive
let keepAliveStats = {
  startTime: new Date(),
  lastPing: null,
  totalPings: 0,
  pings: []
};

// Health check endpoint (para serviços externos de monitoramento)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Keep-alive endpoint (registra pings)
app.get('/keep-alive', (req, res) => {
  const now = new Date();
  keepAliveStats.lastPing = now;
  keepAliveStats.totalPings++;
  
  // Manter apenas os últimos 100 pings
  keepAliveStats.pings.push({
    timestamp: now,
    ip: req.ip || req.connection.remoteAddress
  });
  
  if (keepAliveStats.pings.length > 100) {
    keepAliveStats.pings.shift();
  }
  
  res.status(200).json({
    status: 'alive',
    message: 'Server is awake',
    uptime: process.uptime(),
    stats: {
      startTime: keepAliveStats.startTime,
      lastPing: keepAliveStats.lastPing,
      totalPings: keepAliveStats.totalPings,
      recentPings: keepAliveStats.pings.length
    }
  });
});

// Stats endpoint (retorna estatísticas)
app.get('/api/stats', (req, res) => {
  res.status(200).json({
    ...keepAliveStats,
    uptime: process.uptime(),
    uptimeFormatted: formatUptime(process.uptime())
  });
});

// Função auxiliar para formatar uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// Servir os arquivos estáticos gerados pelo Vite (o build vai para client/dist)
// Ajuste o caminho para ser compatível com ESM
const staticPath = path.join(__dirname, '..', 'dist', 'public');
app.use(express.static(staticPath));

// Para roteamento client-side (como o Wouter), todas as requisições
// que não são arquivos estáticos devem retornar o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
