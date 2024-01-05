import { Button, H1, H3, H4, H5, Image, Paragraph, ScrollView, XStack, YStack } from '@my/ui'
import { AlertOctagon, Send, Settings, Signal } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useBotStatusChecker } from './botStatus'
import { useGuildOnlineUsers } from './botUserOnline'
import { useBotData } from './botData'
import io from 'socket.io-client';
import { Linking } from 'react-native'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  const [status, setStatus] = useState('Offline')
  const onlineUser = useGuildOnlineUsers();
  const [minUser, setMinUser] = useState(0)
  const [maxUser, setMaxUser] = useState(0)
  const [send, setSend] = useState(0)
  const [discordUser, setDiscordUser] = useState(null);
  const { isBotOnline, checkBotStatus } = useBotStatusChecker();
  const { botData,checkBotData} = useBotData();
  const [botName , setBotName] = useState(null);
  const [hostIp , setHostIp] = useState(null);

  const socket = io('http://128.0.0.1');

  useEffect(() => {
    socket.on('updateSendCount', (data: { sendCount: React.SetStateAction<number> }) => {
      // อัปเดตค่าของ sendCount
      setSend(data.sendCount);
    });

    // ... (การ unsubscribe เมื่อ Component ถูก unmounted)
  }, [setSend]);

  const handleDiscordLogin = async () => {
    // Your Discord login logic here
    // Example: Redirect users to Discord OAuth login page
    const discordOAuthUrl = 'https://discord.com/api/oauth2/authorize?client_id=1174702683580551190&response_type=code&redirect_uri=http%3A%2F%2F192.168.1.111%3A8081&scope=identify';
    Linking.openURL(discordOAuthUrl);
  };

  useEffect(() => {
    // Check if user is logged in with Discord
    // Example: Fetch user data from your server after successful Discord OAuth login
    const fetchDiscordUser = async () => {
      try {
        const response = await fetch('http://192.168.1.111:8081/'); // Replace with your server endpoint
        const userData = await response.json();
        setDiscordUser(userData);
        setHostIp(userData.extra.expoClient.hostUri);

        console.log(userData)
      } catch (error) {
        console.error('Error fetching Discord user data:', error);
      }
    };

    fetchDiscordUser();
  }, []);

  useEffect(() => {
    const fetchBotStatus = async () => {
      await checkBotStatus(); // Call the function to check bot status
      setStatus(isBotOnline ? 'Online' : 'Offline');
    };

    fetchBotStatus();
  }, [checkBotStatus, isBotOnline]);

  // useEffect(() => {
  //   // ทำอะไรก็ตามที่ต้องการด้วย onlineUser ที่ได้จาก useGuildOnlineUsers
  //   // console.log('Number of online users in all guilds:', onlineUser);
  // }, [onlineUser]);

  // useEffect(() => {
  //   const fetchBotData =async () => {
  //     await checkBotData();
  //     setBotName(botData.username);
  //   }
  //   fetchBotData();
  // }, [checkBotData , botData]);

  return (
    <YStack animation="bouncy" f={1} p={'$2'} space={5} bg={'#e3e3e3'} mt={'$5'}>
      <YStack bg={'white'}  borderRadius={'$5'} p={'$2'} space={4}>
        <XStack jc={'space-between'}>
          <Button icon={AlertOctagon} h={'$2'}>
            : {status}
          </Button>
          <Button icon={Settings} onPress={handleDiscordLogin}></Button>
        </XStack>
        <XStack space={7} jc={'center'} ai={'center'} scale={0.9}>
          <XStack bg={'#2d7f'} h={100} w={'$14'} borderRadius={'$5'} jc={'center'} ai={'center'} space>
            <Signal color={'white'} scale={'50%'} />
            <YStack>
              <H3 color={'white'}>ONLINE</H3>
              <Paragraph color={'white'}>{onlineUser} student</Paragraph>
            </YStack>
          </XStack>
          <XStack bg={'#fcba03'} h={100} w={'$14'} borderRadius={'$5'} jc={'center'} ai={'center'} space>
            <Send color={'white'} scale={'50%'} />
            <YStack>
              <H3 color={'white'}>SEND</H3>
              <Paragraph color={'white'}>
                {send} / {maxUser}
              </Paragraph>
            </YStack>
          </XStack>
        </XStack>
        <YStack>
          <Paragraph>Host : {hostIp}</Paragraph>
          <Paragraph>Bot Name : {botName}</Paragraph>
        </YStack>
      </YStack>
    </YStack>
  )
}


// {/* <YStack bg={'white'} borderRadius={'$5'} p={'$2'} jc={'flex-start'} ai={'center'} h={'45%'}>
//   <H4>CHECK WORK</H4>
//   {/* check work map list */}
//   <ScrollView>
//     <YStack space={3} jc={'center'} ai={'center'}>
//       <YStack space={3} bg={'#f0f0f0'} h={'$11'} borderRadius={'$5'} p={'$2'}>
//         <XStack scale={0.9}>
//           <H5>group</H5>
//           <Paragraph>ส่งเมื่อ 11/11/2566 23:59</Paragraph>
//           <Paragraph bg={'green'} color={'white'} borderRadius={125} w={110} h={'$2'} textAlign="center">
//             ส่งตามกำหนด
//           </Paragraph>
//         </XStack>
//         <XStack ai={'center'}>
//           <Image borderRadius={"$5"} source={{ width: 70, height: 70, uri: 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg' }} />
//           <Paragraph>lo</Paragraph>
//         </XStack>
//         <XStack left={'70%'} top={'80%'} pos={'absolute'}>
//           <Button h={'$2'} bg={'#24d657'} color={'white'}>Check</Button>
//         </XStack>
//       </YStack>
//     </YStack>
//   </ScrollView>
// </YStack> */}

// {/* <YStack
//   bg={'white'}
//   borderRadius={'$5'}
//   p={'$2'}
//   jc={'flex-start'}
//   ai={'center'}
//   h={'30%'} className="card"
// >
//   <H4>Comment</H4>
// </YStack> */}