const { SlashCommandBuilder } = require('discord.js');
const { serverchat } = require('../utils/rcon-utils');
const { ServerConfig } = require('../config/target.json');
let choices = [];
choices.push({ name: 'all', value: 'all' });
Object.keys(ServerConfig).forEach(function (key) {
    choices.push({ name: key, value: key });
});

module.exports = {
	data: new SlashCommandBuilder()
        // コマンドの名前
		.setName('serverchat')
        // コマンドの説明文
		.setDescription('ターゲット鯖に対して、チャットメッセージを投稿')
        // オプション
        .addStringOption(option => 
            option
                .setName('target')
                .setDescription('ターゲット鯖')
                .setRequired(true)
                .addChoices(choices)
        )
        .addStringOption(option => 
            option
                .setName('message')
                .setDescription('チャットメッセージ')
                .setRequired(true)
        ),
	async execute(interaction) {
        const target = interaction.options.getString('target');
        const message = interaction.options.getString('message');
        // 選択したtargetをメッセージに追加して投稿
		await interaction.reply( target + 'にチャットメッセージ「' + message + '」を投稿' );
        await serverchat(target, message);
	},
};