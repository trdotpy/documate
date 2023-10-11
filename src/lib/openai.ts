import OpenAI from "openai";

export const openAIConfig = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
