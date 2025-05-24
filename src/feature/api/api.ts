import OpenAI from "openai";
import type { APIPromise } from "openai/core";
import type { ChatCompletion } from "openai/resources/chat/completions/completions";
import data from "../../../bank_account_data.json";

const openai = new OpenAI({
    apiKey: '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',
});

export function getResponse(prompt: string, lastNDays: number): APIPromise<ChatCompletion> {
    const cutoffDate = new Date(Date.now() - lastNDays * 24 * 60 * 60 * 1000);
    const filtered = data.transactions.filter(t => new Date(t.date) >= cutoffDate);
    const trimmedTransactions = JSON.stringify(filtered);

    return openai.chat.completions.create({
        model: "gpt-4.0",
        messages: [
            {
                role: "system",
                content: "You are a helpful and experienced banking advisor. Analyze the user's transaction data to give personalized financial insights, savings advice, and categorize spending behavior clearly and concisely."
            },
            {
                role: "user",
                content: `Here is my transaction data from the last ${lastNDays} days as JSON:\n${trimmedTransactions}`
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });
}
