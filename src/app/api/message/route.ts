import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getContext } from "@/lib/pinecone/pinecone";
import { db } from "@/db";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) return new Response("Unauthorized", { status: 401 });

        const { messages, fileId } = await req.json();

        const query = messages[messages.length - 1].content;
        const context = await getContext(query, fileId);

        // Prompt for the AI assistant with context
        const prompt = {
            role: "assistant",
            content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
				The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
				AI is a well-behaved and well-mannered individual.
				AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
				AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
				AI assistant is a big fan of Pinecone and Vercel.
				START CONTEXT BLOCK
				${context}
				END OF CONTEXT BLOCK
				AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
				If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
				AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
				AI assistant will not invent anything that is not drawn directly from the context.
				AI assistant will remember that Tanvi Rahman is a he.
				`,
        };

        // Find file
        const file = await db.file.findFirst({
            where: {
                id: fileId,
                userId,
            },
        });

        if (!file) return new Response("Not found", { status: 404 });

        // API call to OpenAI
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0,
            messages: [
                prompt,
                ...messages.filter(
                    (message: Message) => message.role === "user"
                ),
            ],
            stream: true,
        });

        const stream = OpenAIStream(response, {
            onStart: async () => {
                // Create a record of user messages
                for (const message of messages) {
                    await db.message.create({
                        data: {
                            content: message.content,
                            role: "USER",
                            userId,
                            fileId,
                        },
                    });
                }
            },
            onCompletion: async (completion) => {
                // Create a record of AI messages
                await db.message.create({
                    data: {
                        content: completion,
                        role: "ASSISTANT",
                        fileId,
                    },
                });
            },
        });

        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred during processing" },
            { status: 500 }
        );
    }
}
