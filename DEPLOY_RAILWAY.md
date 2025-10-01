# 🚀 Deploy do Bot Discord no Railway

Este guia te ajudará a fazer o deploy do seu bot Discord na plataforma Railway.

## 📋 Pré-requisitos

1. **Conta no Railway**: Acesse [railway.com](https://railway.com) e crie uma conta
2. **Token do Discord**: Obtenha o token do seu bot em [Discord Developer Portal](https://discord.com/developers/applications)
3. **Repositório Git**: Seu código deve estar em um repositório Git (GitHub, GitLab, etc.)

## 🛠️ Configuração do Bot Discord

### 1. Criar Aplicação no Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome para seu bot
4. Vá para a aba "Bot" no menu lateral
5. Clique em "Add Bot"
6. Copie o **Token** (você precisará dele)

### 2. Configurar Permissões

1. Na aba "OAuth2" > "URL Generator"
2. Selecione as seguintes permissões:
   - `applications.commands` (Slash Commands)
   - `bot` (Bot permissions)
   - `Send Messages`
   - `Use Slash Commands`
   - `Embed Links`
   - `Read Message History`

3. Copie a URL gerada e use para adicionar o bot ao seu servidor

## 🚀 Deploy no Railway

### Método 1: Deploy via GitHub (Recomendado)

1. **Faça upload do código para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin main
   ```

2. **Conecte ao Railway**
   - Acesse [railway.com](https://railway.com)
   - Clique em "Deploy from GitHub Repo"
   - Selecione seu repositório
   - Railway irá detectar automaticamente que é um projeto Node.js

3. **Configure as Variáveis de Ambiente**
   - No dashboard do Railway, vá para "Variables"
   - Adicione a variável:
     - `DISCORD_TOKEN`: Cole o token do seu bot Discord

4. **Deploy**
   - O Railway irá fazer o deploy automaticamente
   - Aguarde alguns minutos para o build completar

### Método 2: Deploy via Railway CLI

1. **Instale o Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login no Railway**
   ```bash
   railway login
   ```

3. **Inicialize o projeto**
   ```bash
   railway init
   ```

4. **Configure as variáveis**
   ```bash
   railway variables set DISCORD_TOKEN=seu_token_aqui
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## 🔧 Configurações Importantes

### Variáveis de Ambiente Necessárias

- `DISCORD_TOKEN`: Token do seu bot Discord (obrigatório)

### Arquivos de Configuração

O projeto já inclui os arquivos necessários:
- `railway.json`: Configuração do Railway
- `.env.example`: Exemplo de variáveis de ambiente
- `.gitignore`: Protege arquivos sensíveis

## 📊 Monitoramento

Após o deploy, você pode:

1. **Ver logs em tempo real** no dashboard do Railway
2. **Monitorar uso de recursos** (CPU, memória, rede)
3. **Configurar domínio customizado** se necessário
4. **Configurar auto-deploy** para commits no GitHub

## 🐛 Solução de Problemas

### Bot não responde
- Verifique se o token está correto
- Confirme se o bot tem as permissões necessárias
- Verifique os logs no Railway

### Erro de build
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js está configurado corretamente

### Comandos slash não aparecem
- Pode levar até 1 hora para os comandos aparecerem
- Reinicie o bot se necessário

## 💰 Custos

O Railway oferece:
- **Plano gratuito**: $5 de crédito por mês
- **Plano Pro**: $20/mês para uso ilimitado

Para um bot Discord simples, o plano gratuito é suficiente.

## 🔗 Links Úteis

- [Railway Documentation](https://docs.railway.app/)
- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)

---

**Pronto!** Seu bot Discord estará rodando 24/7 no Railway! 🎉
