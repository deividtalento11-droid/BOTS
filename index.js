const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Dados dos produtos
const products = {
    valorant: {
        name: "Valorant",
        description: "Produtos para Valorant",
        items: {
            "1_dia": { name: "1 Dia", price: 5.00, description: "Acesso por 1 dia" },
            "7_dias": { name: "7 Dias", price: 25.00, description: "Acesso por 7 dias" },
            "30_dias": { name: "30 Dias", price: 80.00, description: "Acesso por 30 dias" },
            "lifetime": { name: "Lifetime", price: 200.00, description: "Acesso vitalício" }
        }
    },
    csgo: {
        name: "CS:GO",
        description: "Produtos para CS:GO",
        items: {
            "1_dia": { name: "1 Dia", price: 4.50, description: "Acesso por 1 dia" },
            "7_dias": { name: "7 Dias", price: 22.00, description: "Acesso por 7 dias" },
            "30_dias": { name: "30 Dias", price: 70.00, description: "Acesso por 30 dias" },
            "lifetime": { name: "Lifetime", price: 180.00, description: "Acesso vitalício" }
        }
    },
    fortnite: {
        name: "Fortnite",
        description: "Produtos para Fortnite",
        items: {
            "1_dia": { name: "1 Dia", price: 6.00, description: "Acesso por 1 dia" },
            "7_dias": { name: "7 Dias", price: 30.00, description: "Acesso por 7 dias" },
            "30_dias": { name: "30 Dias", price: 90.00, description: "Acesso por 30 dias" },
            "lifetime": { name: "Lifetime", price: 220.00, description: "Acesso vitalício" }
        }
    }
};

// Comando /shop
const shopCommand = new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Abre a loja interativa');

client.once('ready', () => {
    console.log(`Bot logado como ${client.user.tag}!`);
    
    // Registrar comandos
    client.application.commands.create(shopCommand.toJSON());
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'shop') {
            await showShop(interaction);
        }
    } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'product_select') {
            await showProductDetails(interaction);
        } else if (interaction.customId === 'duration_select') {
            await showPurchaseConfirmation(interaction);
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === 'back_to_shop') {
            await showShop(interaction);
        } else if (interaction.customId === 'back_to_product') {
            await showProductDetails(interaction, interaction.message.embeds[0].data.fields[0].value);
        } else if (interaction.customId.startsWith('purchase_')) {
            await processPurchase(interaction);
        }
    }
});

async function showShop(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('🛒 Loja Interativa')
        .setDescription('Selecione uma categoria de produto:')
        .setColor(0x00ff00)
        .setThumbnail('https://cdn.discordapp.com/attachments/123456789/123456789/shop-icon.png')
        .setFooter({ text: 'Use o menu abaixo para navegar' });

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('product_select')
        .setPlaceholder('Escolha uma categoria...')
        .addOptions([
            new StringSelectMenuOptionBuilder()
                .setLabel('Valorant')
                .setDescription('Produtos para Valorant')
                .setValue('valorant')
                .setEmoji('🎮'),
            new StringSelectMenuOptionBuilder()
                .setLabel('CS:GO')
                .setDescription('Produtos para CS:GO')
                .setValue('csgo')
                .setEmoji('🔫'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Fortnite')
                .setDescription('Produtos para Fortnite')
                .setValue('fortnite')
                .setEmoji('🏗️')
        ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    if (interaction.replied || interaction.deferred) {
        await interaction.editReply({ embeds: [embed], components: [row] });
    } else {
        await interaction.reply({ embeds: [embed], components: [row] });
    }
}

async function showProductDetails(interaction, productKey = null) {
    const selectedProduct = productKey || interaction.values[0];
    const product = products[selectedProduct];

    if (!product) {
        return await interaction.reply({ content: 'Produto não encontrado!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setTitle(`🎮 ${product.name}`)
        .setDescription(product.description)
        .setColor(0x0099ff)
        .addFields(
            { name: '📦 Produtos Disponíveis', value: 'Selecione a duração desejada:', inline: false }
        )
        .setFooter({ text: 'Escolha uma opção de duração' });

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('duration_select')
        .setPlaceholder('Escolha a duração...')
        .addOptions(
            Object.entries(product.items).map(([key, item]) => 
                new StringSelectMenuOptionBuilder()
                    .setLabel(`${item.name} - R$ ${item.price.toFixed(2)}`)
                    .setDescription(item.description)
                    .setValue(`${selectedProduct}_${key}`)
            )
        );

    const row = new ActionRowBuilder().addComponents(selectMenu);
    const backButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('back_to_shop')
            .setLabel('← Voltar à Loja')
            .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({ embeds: [embed], components: [row, backButton] });
}

async function showPurchaseConfirmation(interaction) {
    const [productKey, durationKey] = interaction.values[0].split('_');
    const product = products[productKey];
    const item = product.items[durationKey];

    const embed = new EmbedBuilder()
        .setTitle('🛒 Confirmação de Compra')
        .setDescription(`Você está prestes a comprar:`)
        .setColor(0xff9900)
        .addFields(
            { name: '🎮 Produto', value: product.name, inline: true },
            { name: '⏰ Duração', value: item.name, inline: true },
            { name: '💰 Preço', value: `R$ ${item.price.toFixed(2)}`, inline: true },
            { name: '📝 Descrição', value: item.description, inline: false }
        )
        .setFooter({ text: 'Confirme sua compra clicando no botão abaixo' });

    const purchaseButton = new ButtonBuilder()
        .setCustomId(`purchase_${productKey}_${durationKey}`)
        .setLabel(`Comprar por R$ ${item.price.toFixed(2)}`)
        .setStyle(ButtonStyle.Success)
        .setEmoji('💳');

    const backButton = new ButtonBuilder()
        .setCustomId('back_to_product')
        .setLabel('← Voltar')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(purchaseButton, backButton);

    await interaction.update({ embeds: [embed], components: [row] });
}

async function processPurchase(interaction) {
    const [, productKey, durationKey] = interaction.customId.split('_');
    const product = products[productKey];
    const item = product.items[durationKey];

    // Aqui você implementaria a lógica de pagamento real
    // Por exemplo, integração com PayPal, Stripe, etc.
    
    const embed = new EmbedBuilder()
        .setTitle('✅ Compra Realizada!')
        .setDescription('Sua compra foi processada com sucesso!')
        .setColor(0x00ff00)
        .addFields(
            { name: '🎮 Produto', value: product.name, inline: true },
            { name: '⏰ Duração', value: item.name, inline: true },
            { name: '💰 Valor Pago', value: `R$ ${item.price.toFixed(2)}`, inline: true },
            { name: '📧 Instruções', value: 'Você receberá as instruções de ativação por DM em breve!', inline: false }
        )
        .setFooter({ text: 'Obrigado pela compra!' });

    const backToShopButton = new ButtonBuilder()
        .setCustomId('back_to_shop')
        .setLabel('🛒 Continuar Comprando')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(backToShopButton);

    await interaction.update({ embeds: [embed], components: [row] });

    // Enviar DM com instruções (opcional)
    try {
        const dmEmbed = new EmbedBuilder()
            .setTitle('📧 Instruções de Ativação')
            .setDescription('Obrigado por sua compra!')
            .addFields(
                { name: '🎮 Produto', value: product.name },
                { name: '⏰ Duração', value: item.name },
                { name: '🔑 Código de Ativação', value: `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}` },
                { name: '📝 Como Usar', value: '1. Abra o jogo\n2. Vá para as configurações\n3. Cole o código de ativação\n4. Reinicie o jogo' }
            )
            .setColor(0x00ff00);

        await interaction.user.send({ embeds: [dmEmbed] });
    } catch (error) {
        console.log('Não foi possível enviar DM para o usuário');
    }
}

// Login do bot
client.login(process.env.DISCORD_TOKEN);

