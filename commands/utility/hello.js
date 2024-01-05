const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    category: 'utility',
    data : new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hello'),
    async execute(interaction) {
        // interaction is the response body holding information about the server and user
        await interaction.reply(`Hello ${interaction.user.username}`)
    }
};