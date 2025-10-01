# 🚀 Guia Rápido de Instalação

## Passo 1: Criar o Bot no Discord

1. Acesse: https://discord.com/developers/applications
2. Clique em **"New Application"**
3. Dê um nome (ex: "Loja Bot")
4. Vá em **"Bot"** → **"Add Bot"**
5. **Copie o Token** (botão "Copy" abaixo do nome do bot)
6. Em **"Privileged Gateway Intents"**, ative:
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT

## Passo 2: Convidar o Bot

1. Vá em **"OAuth2"** → **"URL Generator"**
2. Selecione:
   - ✅ bot
   - ✅ applications.commands
3. Permissões:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Use Slash Commands
4. **Copie a URL** gerada
5. **Abra a URL** no navegador e adicione ao seu servidor

## Passo 3: Instalar e Configurar

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo .env
copy .env.example .env

# 3. Editar .env e adicionar seu token
# DISCORD_TOKEN=cole_seu_token_aqui

# 4. Iniciar o bot
npm start
```

## Passo 4: Testar

1. Vá ao seu servidor Discord
2. Digite: `/shop`
3. Navegue pela loja! 🎉

---

## 🎮 Produtos Incluídos

- **Valorant** - R$ 5 a R$ 200
- **CS:GO** - R$ 4,50 a R$ 180
- **Fortnite** - R$ 6 a R$ 220

Cada produto tem 4 opções de duração:
- 1 dia
- 7 dias
- 30 dias
- Lifetime (vitalício)

---

## ⚠️ Importante

- **NÃO compartilhe seu token!**
- O arquivo `.env` não deve ser commitado no Git
- Para uso em produção, adicione um sistema de pagamento real

---

## 🆘 Precisa de Ajuda?

- O comando `/shop` não aparece? Aguarde 5 minutos e tente novamente
- Bot offline? Verifique se o token está correto no `.env`
- Não recebe DM? Verifique suas configurações de privacidade do Discord

---

**Desenvolvido com ❤️ para Discord**

