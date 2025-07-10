import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('freeze')
    .setDescription('Freeze a player by their unique key')
    .addStringOption(option =>
        option.setName('key')
            .setDescription('The player’s unique key')
            .setRequired(true));

export async function execute(interaction) {
    const key = interaction.options.getString('key');

    // Simulate backend action
    console.log(`[SIMULATED] Would freeze key: ${key}`);

    await interaction.reply({
        content: `❄️ (Simulated) Sent freeze command to \`${key}\``,
        ephemeral: true
    });
}
