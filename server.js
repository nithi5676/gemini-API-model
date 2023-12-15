// const express = require('express');
// const bodyParser = require('body-parser');
// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require('@google/generative-ai');

// const app = express();
// const port = 3000;

// const MODEL_NAME = 'gemini-pro';
// const API_KEY = 'AIzaSyBLkkdZZnsMHKsQfhScJuo-xh6B5avJeLs';

// app.use(bodyParser.json());

// app.post('/generate', async (req, res) => {
//   try {
//     const userInput = req.body.userInput;

//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];

//     const parts = [
//       { text: `Paraphrase "${userInput}"` },
//     ];

//     const result = await model.generateContent({
//       contents: [{ role: 'user', parts }],
//       generationConfig,
//       safetySettings,
//     });

//     const response = result.response;
//     res.json({ generatedResponse: response.text() });
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const app = express();
const port = 3000;

const MODEL_NAME = 'gemini-pro';
const API_KEY = 'AIzaSyBLkkdZZnsMHKsQfhScJuo-xh6B5avJeLs';

app.use(bodyParser.text()); // Change to handle text instead of JSON

app.post('/generate', async (req, res) => {
  try {
    const userInput = req.body;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      { text: `Paraphrase "${userInput}"` },
    ];

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    res.send(response.text()); // Send response as plain text
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error'); // Send error as plain text
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
