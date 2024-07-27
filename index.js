const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

require("dotenv").config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
let data = [
  {
    "date": {
      "seconds": 1722114309,
      "nanoseconds": 578000000
    },
    "text": "Hai",
    "sender": "Jennie",
    "email": "ayusudi.abcd@gmail.com"
  },
  {
    "sender": "",
    "date": {
      "seconds": 1722115037,
      "nanoseconds": 472000000
    },
    "text": "Jennie pandai menyanyi yaa",
    "email": ""
  },
  {
    "text": "Iya terima kasih yaa",
    "sender": "Jennie",
    "email": "ayusudi.abcd@gmail.com",
    "date": {
      "seconds": 1722115167,
      "nanoseconds": 523000000
    }
  }
]
let dataChat = data.map(el => {
  if (el.sender == "Jennie") {
    return `My Crush : ${el.text};`
  }
  return `Me : ${el.text};`
})
let listChat = dataChat.join("\n")
async function run() {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  let prompt = `
  Gemini AI kamu membantu seseorang untuk saling berbicara yaa, tolong langsung berikan 1 pendapat saja sebagai peran utama user kita (Me). 
  
  User : Hai bantu aku (Me) untuk memberikan chat menarik untuk dia (My Crush) berdasarkan skenario chat ini :
  ${listChat}

  Oya untuk berbicara dengan My Crush gunakan "Aku-Kamu" yaaa
  `
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}

run();