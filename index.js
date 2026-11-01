const { Client, RichPresence } = require('discord.js-selfbot-v13');
const express = require('express');
const http = require('http');

const client = new Client({ checkUpdate: false });
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WINDS Bot Status: 24/7 Active & Running');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

setInterval(() => {
  http.get(`http://localhost:${PORT}`, (res) => {}).on('error', (err) => {
    console.error('Keep-alive ping error:', err.message);
  });
}, 5 * 60 * 1000);

client.on('ready', async () => {
  console.log(`[+] Logged in successfully as ${client.user.tag}!`);
  
  const rpc = new RichPresence(client)
    .setType('PLAYING')
    .setName('Unity')
    .setDetails('Editing LIVE-INDIA Scene')
    .setState('Project Open')
    .setApplicationId('715421574311051284')
    // Discord ke default asset keys ya direct image keys yahan set honge
    .setAssetsLargeImage('https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/a47738ee-9b5d-11e6-905c-00163ed833e7/2711099662/unity-editor-logo.png')
    .setAssetsLargeText('Unity 2022.3.2f1');

  client.user.setPresence({ activities: [rpc], status: 'online' });
  console.log('[+] Official Unity Engine Rich Presence with Image activated!');
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  process.exit(1);
}

client.login(token);
