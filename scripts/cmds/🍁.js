 module.exports = {
    config: {
        name: "🍁",
        version: "1.0",
        author: "𝐑𝐨𝐧𝐚𝐥𝐝 ",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
onStart: async function(){},
onChat: async function({ event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "🍁") return message.reply("🍁🍁 𝗗𝗜𝗟𝗗𝗔𝗔𝗥𝗔 🍁🍁");
}
};
