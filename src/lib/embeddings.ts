import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text.replace(/[\n\r]+/g, " "),
        });
        const result = await response.json();
        console.log("Embeddings API response:", result);
        if (result.data && result.data.length > 0) {
            return result.data[0].embedding as number[];
        } else {
            throw new Error("No embeddings returned from the API.");
        }
    } catch (error) {
        console.error("Error calling Embeddings API:", error);
        throw error;
    }
}
