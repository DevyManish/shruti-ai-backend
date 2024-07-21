const express = require("express");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
//import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY, 
    dangerouslyAllowBrowser: true 
});


const router = express.Router();

router.post("/chat", async(req, res) => {

    const {prompt} = req.body;

    try {
        const chatCompletion = await getGroqChatCompletion();
        // Print the completion returned by the LLM.
        console.log(chatCompletion.choices[0]?.message?.content || "");
          
        async function getGroqChatCompletion() {
            return groq.chat.completions.create({
              messages: [
                {
                  role: "user",
                  content: prompt ,
                },
              ],
              model: "llama3-8b-8192",
            });
        }

        res.send(chatCompletion.choices[0]?.message?.content)

    } catch (err) {
        res.status(500).send(err)
    }

});

module.exports = router;




