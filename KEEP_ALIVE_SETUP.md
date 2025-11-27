# 🔄 Sistema de Keep-Alive - Render Free Tier

## 📋 Problema

O Render (plano gratuito) coloca o servidor em **modo sleep** após **15 minutos** de inatividade. Isso causa:
- ❌ Primeira requisição demora 30-40 segundos (cold start)
- ❌ Experiência ruim para o usuário
- ❌ Perda de visitantes impacientes

---

## ✅ Solução Implementada

### **1. Self-Ping Automático com Node-Cron**

O servidor faz **self-ping** (ping em si mesmo) a cada **1 minuto** usando `node-cron`.

**Como funciona:**
```javascript
// A cada 1 minuto, o servidor faz uma requisição para si mesmo
cron.schedule('*/1 * * * *', async () => {
  https.get('https://zap-muny.onrender.com/keep-alive', (res) => {
    console.log('Self-ping bem-sucedido!');
  });
});
```

**Vantagens:**
- ✅ **100% automático** - não precisa configurar nada externo
- ✅ **Não depende de serviços terceiros**
- ✅ **Gratuito** - usa apenas os recursos do próprio servidor
- ✅ **Confiável** - funciona 24/7 sem intervenção

**Desvantagens:**
- ⚠️ Se o servidor dormir, o cron para até alguém acessar
- ⚠️ Usa horas do plano gratuito (mas 750h/mês é suficiente)

---

### **2. Endpoints Implementados**

#### `/health`
Health check básico para monitoramento externo.

**Resposta:**
```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": "2025-11-19T..."
}
```

#### `/keep-alive`
Endpoint principal para pings. Registra estatísticas.

**Resposta:**
```json
{
  "status": "alive",
  "message": "Server is awake",
  "uptime": 12345,
  "stats": {
    "startTime": "2025-11-19T...",
    "lastPing": "2025-11-19T...",
    "totalPings": 42,
    "recentPings": 100
  }
}
```

#### `/api/stats`
Retorna estatísticas completas do keep-alive.

#### `/monitor`
Página web com dashboard em tempo real.

---

## 📊 Monitoramento

### **Página de Monitoramento**
Acesse: https://zap-muny.onrender.com/monitor

**Recursos:**
- 🟢 Status do servidor (Online/Offline)
- ⏱️ Uptime formatado
- 📈 Total de pings recebidos
- 🕐 Tempo desde o último ping
- 📋 Histórico dos últimos 100 pings
- 📡 Botão para ping manual
- ▶️ Auto-ping interno (10 minutos)

---

## 🔧 Configuração Adicional (Opcional)

### **Opção 1: UptimeRobot (Recomendado)**

**Por que usar:**
- ✅ Funciona mesmo se o servidor dormir
- ✅ Monitora uptime e envia alertas
- ✅ Até 50 monitores grátis

**Como configurar:**
1. Acesse: https://uptimerobot.com
2. Crie uma conta gratuita
3. Adicione um novo monitor:
   - **Type:** HTTP(s)
   - **URL:** `https://zap-muny.onrender.com/keep-alive`
   - **Monitoring Interval:** 5 minutes
4. Salve e pronto!

---

### **Opção 2: Cron-job.org**

**Como configurar:**
1. Acesse: https://cron-job.org
2. Crie uma conta gratuita
3. Crie um novo cron job:
   - **Title:** Render Keep-Alive
   - **Address:** `https://zap-muny.onrender.com/keep-alive`
   - **Schedule:** Every 14 minutes
4. Salve e ative!

---

### **Opção 3: Better Uptime**

**Como configurar:**
1. Acesse: https://betteruptime.com
2. Crie uma conta gratuita
3. Adicione um novo monitor:
   - **URL:** `https://zap-muny.onrender.com/keep-alive`
   - **Check frequency:** 3 minutes
4. Configure alertas (opcional)

---

## 📈 Estatísticas de Uso

### **Plano Gratuito do Render:**
- **Horas disponíveis:** 750 horas/mês
- **Horas em um mês:** 720 horas (30 dias × 24h)
- **Sobra:** 30 horas/mês

**Com self-ping a cada 1 minuto:**
- ✅ Servidor fica ativo 24/7
- ✅ Usa aproximadamente 720 horas/mês
- ✅ Ainda sobram 30 horas de margem

---

## 🐛 Troubleshooting

### **Servidor ainda está dormindo**

**Possíveis causas:**
1. O cron job ainda não executou (espere até 14 minutos após deploy)
2. O servidor dormiu antes do primeiro cron
3. Erro na URL do RENDER_EXTERNAL_URL

**Solução:**
- Acesse manualmente: https://zap-muny.onrender.com/keep-alive
- Aguarde 14 minutos
- Verifique os logs no Render Dashboard

---

### **Como verificar se está funcionando**

1. **Acesse a página de monitor:**
   https://zap-muny.onrender.com/monitor

2. **Verifique os logs no Render:**
   - Acesse o Render Dashboard
   - Vá em "Logs"
   - Procure por: `[CRON] Self-ping bem-sucedido!`

3. **Teste manual:**
   ```bash
   curl https://zap-muny.onrender.com/keep-alive
   ```

---

## 📝 Logs Esperados

Quando funcionando corretamente, você verá nos logs:

```
Servidor rodando na porta 10000
[CRON] Self-ping agendado para executar a cada 14 minutos
[CRON] Self-ping iniciado em 2025-11-19T12:00:00.000Z
[CRON] Self-ping bem-sucedido! Status: 200
[CRON] Self-ping iniciado em 2025-11-19T12:14:00.000Z
[CRON] Self-ping bem-sucedido! Status: 200
...
```

---

## 🎯 Resultado Final

Com o sistema implementado:
- ✅ **Servidor ativo 24/7**
- ✅ **Sem cold starts**
- ✅ **Resposta instantânea**
- ✅ **Experiência perfeita para o usuário**
- ✅ **100% gratuito**

---

## 📚 Referências

- [Render Free Tier Documentation](https://render.com/docs/free)
- [Node-Cron Documentation](https://www.npmjs.com/package/node-cron)
- [Stack Overflow: Prevent Render from Sleeping](https://stackoverflow.com/questions/75340700/prevent-render-server-from-sleeping)
