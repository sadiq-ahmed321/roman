const { Client, RichPresence } = require('discord.js-selfbot-v13');
const express = require('express');
const http = require('http');

const client = new Client({ checkUpdate: false });
const app = express();
const PORT = process.env.PORT || 3000;

// Render Web Service ko active rakhne ke liye server root
app.get('/', (req, res) => {
  res.send('WINDS Bot Status: 24/7 Active & Running');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

// Self-ping keep-alive mechanism taaki bot 24/7 online rahe
setInterval(() => {
  http.get(`http://localhost:${PORT}`, (res) => {
    // Ping successful
  }).on('error', (err) => {
    console.error('Keep-alive ping error:', err.message);
  });
}, 5 * 60 * 1000);

client.on('ready', async () => {
  console.log(`[+] Logged in successfully as ${client.user.tag}!`);
  
  // Official Unity Engine Rich Presence Setup
  const rpc = new RichPresence(client)
    .setType('PLAYING')
    .setName('Unity')
    .setDetails('Editing LIVE-INDIA Scene')
    .setState('Project Open')
    .setApplicationId('715421574311051284') // Unity ka official Discord Application ID
    .setAssetsLargeImage('https://cdn.discordapp.com/app-icons/715421574311051284/unity.png') // Unity logo icon
    .setAssetsLargeText('Unity 2022.3.2f1');

  client.user.setPresence({ activities: [rpc], status: 'online' });
  console.log('[+] Official Unity Engine Rich Presence activated!');
});

// Render Environment Variable se token uthayega
const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("[-] Error: DISCORD_TOKEN environment variable is missing!");
  process.exit(1);
}

client.login(token);
