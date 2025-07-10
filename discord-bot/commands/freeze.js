import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const data = new SlashCommandBuilder()
    .setName('freeze')
    .setDescription('Freeze a player by their unique key')
    .addStringOption(option =>
        option.setName('key')
            .setDescription('The user’s unique key')
            .setRequired(true));

export async function execute(interaction) {
    const key = interaction.options.getString('key');

    try {
        await axios.post(process.env.BACKEND_URL, {
            key: key,
            action: 'freeze'
        });

        await interaction.reply(`❄️ Sent **freeze** command to key \`${key}\``);
    } catch (err) {
        console.error(err);
        await interaction.reply('⚠️ Failed to send command.');
    }
}
