const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.LINE_TOKEN,
    channelSecret: process.env.CLIENT_SECRET,
};
const client = new line.Client(config);

module.exports = {
    sendMessageToLine: async (img, headerText, secondText, link) => {

        if (!(img || headerText || secondText || link)) {
            console.error('Incomplete value entered')
            return
        }

        const flexMessage = {
            "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": img,
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": headerText,
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "text",
                            "text": secondText,
                            "weight": "bold",
                            "size": "xl"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "label": "Open Link Download...",
                                "uri": link
                            }
                        }
                    ]
                }
            }
        };

         const userId = process.env.CLIENT_ID;  // ระบุ User ID ของคนที่จะส่งข้อความ

        await client.pushMessage(userId, flexMessage)
            .then(() => {
                console.log('Message sent successfully');
            })
            .catch((err) => {
                console.error('Error sending message:', err);
            });
    }
}