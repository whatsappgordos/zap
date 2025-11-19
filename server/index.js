import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Para usar __dirname e __filename em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000; // Alterado de 3000 para 10000 para compatibilidade com o ambiente Render

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
