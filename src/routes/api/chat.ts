import { createFileRoute } from "@tanstack/react-router";

import { handleAssistantChat } from "@/lib/assistant/chat.server";

/**
 * Streaming endpoint for the concierge widget. The visible conversation lives
 * at the page URL; this is only the model boundary.
 */
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) => handleAssistantChat(request),
    },
  },
});
