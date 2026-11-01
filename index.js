const { Client } = require('discord.js-selfbot-v13');
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
  
  // External Direct Image Link Bypass Hack (No App ID)
  client.user.setPresence({
    status: 'online',
    activities: [{
      name: 'Unity',
      type: 'PLAYING',
      details: 'Editing LIVE-INDIA Scene',
      state: 'Project Open',
      assets: {
        largeImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', // Direct public SVG/PNG link
        largeText: 'Unity 2022.3.2f1'
      }
    }]
  });
  
  console.log('[+] External image Rich Presence activated!');
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  process.exit(1);
}

client.login(token);
