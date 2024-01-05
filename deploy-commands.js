require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Grab all the commands and build the json output of each command data
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[Warning] the command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }
}
console.log()
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async() => {
    try {
        console.log(`Started refreshing ${commands.length} application commands`);

        const data = await rest.put(
            // use applicationGuildCommands when pusing to a sinlge guild
            // Routes.applicationGuildCommands(clientId, guildId),
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application commands.`);
    } catch (error) {
        console.error(error);
    }
})();