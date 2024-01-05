import { useState } from 'react';

export const useBotData = () => {
  const [botData, setBotData] = useState(null);
  const botToken = 'MTE3NDcwMjY4MzU4MDU1MTE5MA.GP3V0m.kpDybGVqeknZeKOz30NMme-MDdLGfe8Fsh8hwM';
  const checkBotData = async () => {
    try {
      const response = await fetch(`https://discord.com/api/v9/users/@me`, {
        headers: {
          Authorization: `Bot ${botToken}`, // Replace 'YOUR_BOT_TOKEN' with your actual Discord bot token
        },
      });

      if (response.ok) {
        setBotData(await response.json());
      } 
    } catch (error) {
      console.error('Error checking bot status:', error);
    }
  };

  return { botData, checkBotData };
};