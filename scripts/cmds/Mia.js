const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = "𝗛𝗜 𝗴𝘂𝘆𝘀 👋🏼\n𝗠𝘆 𝗻𝗮𝗺𝗲 𝗶𝘀 𝗠𝗶𝗮 𝘁𝗵𝗲 𝘃𝗶𝗿𝘁𝘂𝗮𝗹 𝗮𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆 𝗥𝗼𝗻𝗮𝗹𝗱 💙.";
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break; 
    }
    currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'mia',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`Please provide a question or statement.`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`${response} 🍃`, event.threadID, messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("mia")) {
      const input = messageContent.replace(/^mia\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
      message.reply(`${response} `, messageID);
    }
  }
};
