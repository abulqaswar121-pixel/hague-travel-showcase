import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage, type UIMessage } from "ai";

import { createLovableAiGatewayRunIdFetch } from "./run-id.ts";

type ResponsesCallConfig = {
  apiKey: string;
  /** Gateway host or API base; both resolve to /v1/responses. */
  baseURL: string;
  model: string;
  system?: string;
  messages: ModelMessage[];
  /** Incoming client messages, for stream reconciliation and persistence. */
  originalMessages?: UIMessage[];
  maxOutputTokens?: number;
  /** Use only for an explicitly requested OpenAI chat model. */
  chatModel?: boolean;
  /** Only when the requested protocol is Chat Completions. */
  useChatCompletions?: boolean;
};

export function createResponsesCall(config: ResponsesCallConfig) {
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: config.baseURL,
    apiKey: config.apiKey,
    fetch: runIdFetch.fetch,
    name: "lovable",
  });
  const model =
    config.chatModel || config.useChatCompletions
      ? provider.chat(config.model)
      : provider.responses(config.model);
  const messages = config.system
    ? [
        { role: "system" as const, content: config.system },
        ...config.messages,
      ]
    : config.messages;
  const useReasoning = !config.chatModel;
  const result = streamText({
    model,
    maxOutputTokens: config.maxOutputTokens,
    messages,
    providerOptions: {
      openai: {
        ...(useReasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
        // The gateway is stateless; always resend complete inline history.
        store: false,
      },
    },
  });

  return {
    result,
    response: () =>
      result.toUIMessageStreamResponse({
        originalMessages: messages as UIMessage[],
        sendReasoning: true,
        headers: runIdFetch.getRunId()
          ? { "X-Lovable-AIG-Run-ID": runIdFetch.getRunId()! }
          : undefined,
      }),
  };
}
