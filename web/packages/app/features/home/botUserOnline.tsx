import { useEffect, useState } from 'react';

export const useGuildOnlineUsers = () => {
    const [onlineUser, setOnlineUser] = useState<number>(0);
  
    useEffect(() => {
      const fetchGuildMembers = async () => {
        try {
          // ดึงข้อมูล Guilds ทั้งหมดที่บอทอยู่
          const guildsResponse = await fetch('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
              Authorization: `Bot ${'MTE3NDcwMjY4MzU4MDU1MTE5MA.GP3V0m.kpDybGVqeknZeKOz30NMme-MDdLGfe8Fsh8hwM'}`, // แทน 'YOUR_BOT_TOKEN' ด้วยโทเคนของบอท
            },
          });
  
          if (guildsResponse.ok) {
            const guildsData = await guildsResponse.json();
            // นับจำนวนคนที่ออนไลน์ในแต่ละ Guild
            let totalOnlineUsers = 0;
  
            for (const guild of guildsData) {
              const guildId = guild.id;
  
              const membersResponse = await fetch(`https://discord.com/api/v9/guilds/${guildId}/members`, {
                headers: {
                  Authorization: `Bot ${'MTE3NDcwMjY4MzU4MDU1MTE5MA.GP3V0m.kpDybGVqeknZeKOz30NMme-MDdLGfe8Fsh8hwM'}`, // แทน 'YOUR_BOT_TOKEN' ด้วยโทเคนของบอท
                },
              });
  
              if (membersResponse.ok) {
                const membersData = await membersResponse.json();
                // console.log(membersData.filter((member) => member.user.status))
                totalOnlineUsers += membersData.filter((member) =>  member.status === 'online').length;
              }
            }

            // ตั้งค่า state ของ onlineUser
            setOnlineUser(totalOnlineUsers);
          } else {
            console.error('Error fetching guilds data:', guildsResponse.statusText);
          }
        } catch (error) {
          console.error('Error fetching guild members:', error);
        }
      };
  
      // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล
      fetchGuildMembers();
    }, []);
  
    return onlineUser;
  };