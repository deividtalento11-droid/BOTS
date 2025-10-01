# 🛒 Discord Shop Bot

Bot de Discord com sistema de loja interativo usando slash commands e botões. O bot permite que os usuários naveguem por produtos, selecionem durações (1 dia, 7 dias, 30 dias ou lifetime) e finalizem compras.

## 📋 Características

- ✅ Comando `/shop` para abrir a loja
- ✅ Sistema de navegação com Select Menus e Botões
- ✅ Múltiplas categorias de produtos (Valorant, CS:GO, Fortnite)
- ✅ Opções de duração (1 dia, 7 dias, 30 dias, Lifetime)
- ✅ Sistema de confirmação de compra
- ✅ Envio automático de DM com código de ativação
- ✅ Interface moderna com embeds coloridos

## 🚀 Como Instalar

### 1. Pré-requisitos

- Node.js (v16.9.0 ou superior)
- npm ou yarn
- Uma aplicação Discord (bot)

### 2. Criar um Bot no Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome ao seu bot e clique em "Create"
4. Vá para a aba "Bot" no menu lateral
5. Clique em "Add Bot"
6. Copie o token do bot (você vai precisar dele)
7. Ative as seguintes "Privileged Gateway Intents":
   - `PRESENCE INTENT`
   - `SERVER MEMBERS INTENT`
   - `MESSAGE CONTENT INTENT`

### 3. Convidar o Bot para seu Servidor

1. Vá para a aba "OAuth2" > "URL Generator"
2. Selecione os seguintes scopes:
   - `bot`
   - `applications.commands`
3. Selecione as seguintes permissões:
   - `Send Messages`
   - `Use Slash Commands`
   - `Embed Links`
   - `Read Message History`
4. Copie a URL gerada e abra no navegador
5. Selecione seu servidor e autorize o bot

### 4. Instalar Dependências

```bash
# Navegue para o diretório do projeto
cd discord-shop-bot

# Instale as dependências
npm install
```

### 5. Configurar o Bot

1. Copie o arquivo `.env.example` para `.env`:
```bash
copy .env.example .env
```

2. Edite o arquivo `.env` e adicione seu token do Discord:
```
DISCORD_TOKEN=seu_token_aqui
```

### 6. Iniciar o Bot

```bash
# Modo normal
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

## 📖 Como Usar

### Para Usuários

1. Digite `/shop` em qualquer canal onde o bot tenha permissão
2. Selecione uma categoria de produto no menu dropdown
3. Escolha a duração desejada
4. Confirme a compra clicando no botão verde
5. Você receberá um DM com as instruções e código de ativação

### Para Desenvolvedores

#### Adicionar Novos Produtos

Edite o objeto `products` no arquivo `index.js`:

```javascript
const products = {
    novo_produto: {
        name: "Nome do Produto",
        description: "Descrição do produto",
        items: {
            "1_dia": { name: "1 Dia", price: 5.00, description: "Acesso por 1 dia" },
            "7_dias": { name: "7 Dias", price: 25.00, description: "Acesso por 7 dias" },
            // ... adicione mais durações
        }
    }
};
```

Depois, adicione a opção no menu de seleção em `showShop()`:

```javascript
new StringSelectMenuOptionBuilder()
    .setLabel('Nome do Produto')
    .setDescription('Descrição')
    .setValue('novo_produto')
    .setEmoji('🎯')
```

#### Integrar Sistema de Pagamento

Na função `processPurchase()`, adicione sua lógica de pagamento:

```javascript
async function processPurchase(interaction) {
    const [, productKey, durationKey] = interaction.customId.split('_');
    const product = products[productKey];
    const item = product.items[durationKey];

    // Adicione aqui sua integração com:
    // - PayPal
    // - Stripe
    // - Mercado Pago
    // - Etc.
    
    // Exemplo:
    // const paymentLink = await createPaymentLink(item.price);
    // await interaction.user.send(`Link de pagamento: ${paymentLink}`);
}
```

## 🎨 Personalização

### Cores dos Embeds

As cores estão definidas em formato hexadecimal:

- Loja principal: `0x00ff00` (Verde)
- Detalhes do produto: `0x0099ff` (Azul)
- Confirmação: `0xff9900` (Laranja)
- Sucesso: `0x00ff00` (Verde)

### Emojis

Você pode personalizar os emojis em cada Select Menu Option:

```javascript
.setEmoji('🎮') // Use qualquer emoji Unicode
```

## 📝 Estrutura do Código

```
discord-shop-bot/
├── index.js           # Código principal do bot
├── package.json       # Dependências e scripts
├── .env              # Configurações (não commitar!)
├── .env.example      # Exemplo de configurações
└── README.md         # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- [Discord.js v14](https://discord.js.org/) - Biblioteca para interagir com a API do Discord
- [dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis de ambiente
- Node.js - Runtime JavaScript

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias! Você pode:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## ⚠️ Avisos Importantes

- **Nunca compartilhe seu token do Discord!**
- Adicione o arquivo `.env` ao `.gitignore` se for usar Git
- Este bot é apenas um exemplo. Para uso em produção, implemente:
  - Sistema de banco de dados
  - Autenticação de pagamento real
  - Sistema de logs
  - Tratamento de erros mais robusto
  - Sistema de permissões

## 🐛 Problemas Comuns

### O bot não responde ao comando /shop

- Verifique se o bot tem as permissões necessárias
- Certifique-se de que o bot está online
- Aguarde alguns minutos após adicionar o bot (os comandos podem levar um tempo para sincronizar)

### Erro: "Invalid Token"

- Verifique se copiou o token corretamente no arquivo `.env`
- Certifique-se de não ter espaços extras antes ou depois do token

### Não recebo DM do bot

- Verifique suas configurações de privacidade do Discord
- O bot precisa ter permissão para enviar DMs

## 📞 Suporte

Se tiver dúvidas ou problemas:

1. Verifique a documentação do Discord.js: https://discord.js.org/
2. Leia os problemas comuns acima
3. Abra uma issue no repositório

## 🎯 Roadmap

- [ ] Adicionar banco de dados (SQLite/MongoDB)
- [ ] Integração com sistemas de pagamento reais
- [ ] Painel administrativo
- [ ] Sistema de cupons de desconto
- [ ] Histórico de compras
- [ ] Sistema de estoque
- [ ] Múltiplos idiomas

---

Desenvolvido com ❤️ para a comunidade Discord

