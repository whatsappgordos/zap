# 🗺️ Google Maps Static API - Configuração

## ✅ Status Atual

O projeto **já está usando Google Maps Static API** com uma chave de demonstração pública.

**Arquivo:** `client/src/components/StaticMap.tsx`

---

## 🎯 Como Funciona

O componente `StaticMap` agora usa a API oficial do Google Maps para exibir mapas estáticos realistas:

```typescript
const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:M%7C${centerLat},${centerLon}&key=${GOOGLE_MAPS_API_KEY}`;
```

### Parâmetros Usados:
- **center**: Coordenadas do centro do mapa (latitude, longitude)
- **zoom**: Nível de zoom (14 = visão de bairro)
- **size**: Dimensões da imagem (600x400 pixels)
- **maptype**: Tipo de mapa (roadmap = mapa de ruas padrão)
- **markers**: Marcador vermelho com label "M" na localização do motel
- **key**: Chave de API do Google Maps

---

## 🔑 Chave de API Atual

**Chave de demonstração pública:**
```
AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
```

⚠️ **IMPORTANTE:** Esta é uma chave pública de demonstração que pode ter limitações ou parar de funcionar a qualquer momento.

---

## 🆓 Como Obter Sua Própria Chave de API (GRÁTIS)

O Google oferece **$200 de crédito gratuito por mês**, o que equivale a aproximadamente **28.000 carregamentos de mapa estático** por mês.

### Passo a Passo:

### 1️⃣ Acesse o Google Cloud Console
👉 https://console.cloud.google.com/

### 2️⃣ Crie um Novo Projeto
- Clique em "Select a project" no topo
- Clique em "New Project"
- Dê um nome (ex: "WhatsApp Spy Simulator")
- Clique em "Create"

### 3️⃣ Ative a Maps Static API
- No menu lateral, vá em **APIs & Services** > **Library**
- Pesquise por "Maps Static API"
- Clique em "Maps Static API"
- Clique em **"Enable"**

### 4️⃣ Crie uma Chave de API
- No menu lateral, vá em **APIs & Services** > **Credentials**
- Clique em **"Create Credentials"** > **"API Key"**
- Sua chave será gerada automaticamente
- **COPIE A CHAVE** (ex: `AIzaSyAbc123...`)

### 5️⃣ (Opcional) Restrinja a Chave
Para maior segurança:
- Clique em "Edit API key"
- Em "API restrictions", selecione "Restrict key"
- Marque apenas **"Maps Static API"**
- Em "Website restrictions", adicione seu domínio: `zap-muny.onrender.com/*`
- Clique em "Save"

### 6️⃣ Configure o Billing (Obrigatório)
- No menu lateral, vá em **Billing**
- Clique em "Link a billing account"
- Adicione um cartão de crédito (não será cobrado dentro do limite gratuito)
- ✅ Você tem $200 grátis por mês!

---

## 🔧 Como Substituir a Chave no Projeto

### Opção 1: Editar Diretamente no Código

Edite o arquivo `client/src/components/StaticMap.tsx`:

```typescript
const GOOGLE_MAPS_API_KEY = "SUA_CHAVE_AQUI"; // Linha 30
```

### Opção 2: Usar Variável de Ambiente (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto:
```bash
VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

2. Atualize o componente:
```typescript
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
```

3. Configure no Render:
- Acesse o dashboard do Render
- Vá em **Environment**
- Adicione a variável: `VITE_GOOGLE_MAPS_API_KEY = SUA_CHAVE_AQUI`
- Faça redeploy

---

## 🛡️ Sistema de Fallback

O componente tem 3 níveis de fallback:

1. **Google Maps Static API** (principal)
2. **OpenStreetMap** (se Google falhar)
3. **Placeholder visual** (se ambos falharem)

Isso garante que o mapa sempre será exibido de alguma forma!

---

## 📊 Monitoramento de Uso

Para verificar quantas requisições você está fazendo:

1. Acesse https://console.cloud.google.com/
2. Vá em **APIs & Services** > **Dashboard**
3. Clique em **"Maps Static API"**
4. Veja o gráfico de uso

---

## 💰 Custos

### Plano Gratuito:
- **$200 de crédito por mês**
- **28.000 carregamentos de mapa estático/mês** (grátis)
- Sem cobrança se ficar dentro do limite

### Se Exceder o Limite:
- **$2.00 por 1.000 carregamentos adicionais**
- Você pode configurar alertas de billing para não ser surpreendido

---

## ✨ Vantagens do Google Maps

✅ Visual profissional e reconhecível  
✅ Dados de mapas atualizados constantemente  
✅ Marcadores personalizáveis  
✅ Diferentes tipos de mapa (roadmap, satellite, terrain, hybrid)  
✅ Suporte a múltiplos marcadores  
✅ Credibilidade para o simulador  

---

## 🔗 Links Úteis

- **Documentação Oficial:** https://developers.google.com/maps/documentation/maps-static/overview
- **Console do Google Cloud:** https://console.cloud.google.com/
- **Preços:** https://mapsplatform.google.com/pricing/
- **Exemplos de Uso:** https://developers.google.com/maps/documentation/maps-static/start

---

**Última atualização:** 19/11/2025  
**Commit:** c2b342e
