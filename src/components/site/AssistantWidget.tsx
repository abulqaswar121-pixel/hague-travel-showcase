import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  MessageCircle,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import conciergeAvatar from "@/assets/concierge-avatar.jpg";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { BRAND, waLink, waMessages } from "@/data/site";
import { cn } from "@/lib/utils";

/** One running conversation, remembered in this browser only. */
const STORAGE_KEY = "hague-travel-concierge-v1";

const QUICK_PROMPTS = [
  "Plan a December holiday for two",
  "Study in the UK — where do I start?",
  "How do I reserve a package?",
  "Passport appointment help",
];

function readStored(): UIMessage[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

function writeStored(messages: UIMessage[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    /* private mode or a full quota — the chat still works for this session */
  }
}

function humanError(error: Error | undefined): string {
  const raw = error?.message ?? "";
  if (/credit|balance|payment/i.test(raw)) {
    return "The assistant is out of credits right now. Please WhatsApp or call the desk.";
  }
  if (/rate|limit/i.test(raw)) {
    return "The assistant is getting a lot of questions. Give it a few seconds and try once more.";
  }
  if (/fetch|network|failed to execute/i.test(raw)) {
    return "The assistant lost its connection. Your message is still here — try again.";
  }
  return "The assistant couldn't answer that. A consultant can — WhatsApp or call the desk.";
}

/** Floating button + chat panel. Replaces the old WhatsApp-only bubble. */
export function AssistantWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Concierge />;
}

function Concierge() {
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  // Read once, on the client only, so hydration never sees a different list.
  const [initialMessages] = useState<UIMessage[]>(() => readStored());

  const { messages, sendMessage, status, stop, error, setMessages, clearError } =
    useChat({
      id: "hague-concierge",
      messages: initialMessages,
      transport,
      onError: (err) => toast.error(humanError(err)),
    });

  const busy = status === "submitted" || status === "streaming";

  // Save when a reply settles, not on every streamed token.
  useEffect(() => {
    if (status === "ready" || status === "error") writeStored(messages);
  }, [status, messages]);

  // Keep the textarea ready: on open, and as soon as the assistant stops typing.
  useEffect(() => {
    if (open && !busy) textareaRef.current?.focus();
  }, [open, busy]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      void sendMessage({ text: trimmed });
    },
    [busy, sendMessage],
  );

  const startNewConversation = useCallback(() => {
    if (busy) stop();
    setMessages([]);
    writeStored([]);
    clearError();
    textareaRef.current?.focus();
    toast.success("Started a new conversation.");
  }, [busy, clearError, setMessages, stop]);

  return (
    <>
      <div
        className={cn(
          "fixed bottom-5 right-4 z-40 flex items-center gap-2 lg:bottom-6 lg:right-6",
          open && "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-2xl border border-border bg-card px-3 py-1.5 text-left shadow-soft"
        >
          <span className="block text-xs font-bold leading-tight text-card-foreground">Chat with Nia</span>
          <span className="block text-[10px] leading-tight text-muted-foreground">AI travel assistant · 24/7</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with Nia, the Hague Travel AI assistant"
          className="relative size-14 rounded-full border-2 border-logo-gold bg-ink shadow-soft transition-transform hover:scale-105 lg:size-16"
        >
          <img src={conciergeAvatar} alt="" width={816} height={816} loading="lazy" className="size-full rounded-full object-cover" />
          <span className="absolute right-0.5 bottom-0.5 size-3 rounded-full border-2 border-card bg-whatsapp" />
        </button>
      </div>

      {open ? (
        <section
          role="dialog"
          aria-label="Chat with Nia"
          className={cn(
            "fixed inset-0 z-50 flex flex-col overflow-hidden bg-card text-card-foreground",
            "sm:inset-auto sm:bottom-24 sm:right-4 sm:top-auto sm:left-auto sm:h-[min(660px,calc(100vh-7rem))] sm:w-[min(430px,calc(100vw-2rem))] sm:rounded-3xl sm:border sm:border-border sm:shadow-elegant lg:bottom-6",
          )}
        >
          <header className="flex items-center gap-3 border-b border-ink-foreground/10 bg-ink px-4 py-3 text-ink-foreground">
            <span className="relative shrink-0">
              <img src={conciergeAvatar} alt="" width={816} height={816} className="size-10 rounded-full border-2 border-logo-gold object-cover" />
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-ink bg-whatsapp" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base leading-tight font-semibold">
                Nia
              </p>
              <p className="truncate text-[11px] text-ink-foreground/65">
                Hague Travel AI assistant · Online
              </p>
            </div>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              aria-label="Talk to a consultant on WhatsApp"
              className="flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={startNewConversation}
              aria-label="Start a new conversation"
              className="rounded-full p-2 text-ink-foreground/70 transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <RotateCcwIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the concierge"
              className="rounded-full p-2 text-ink-foreground/70 transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </header>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-5 px-4 py-5">
              {messages.length === 0 ? (
                <ConversationEmptyState className="px-2 py-6">
                  <div className="flex w-full flex-col items-center gap-4">
                    <img src={conciergeAvatar} alt="" width={816} height={816} className="size-20 rounded-full border-2 border-logo-gold object-cover" />
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-semibold">
                        Hi, I'm Nia 👋
                      </h3>
                      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        Your Hague Travel assistant. Ask me about trips, visas, study abroad, passports or fees — or tap WhatsApp above to reach a consultant.
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => ask(prompt)}
                          className="rounded-full border border-input bg-background px-4 py-2.5 text-left text-sm font-medium transition-colors hover:border-gold hover:bg-accent/40"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </ConversationEmptyState>
              ) : null}

              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  {message.role === "assistant" ? (
                    <img src={conciergeAvatar} alt="" width={816} height={816} className="size-7 shrink-0 self-start rounded-full object-cover" />
                  ) : null}
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "bg-ink px-4 py-3 text-ink-foreground"
                        : "min-w-0 gap-3 bg-transparent px-0 py-0"
                    }
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={`${message.id}-${index}`}>
                            {part.text}
                          </MessageResponse>
                        );
                      }
                      if (part.type === "reasoning" && part.text) {
                        return (
                          <p
                            key={`${message.id}-${index}`}
                            className="border-l-2 border-gold/40 pl-3 text-xs leading-relaxed text-muted-foreground italic"
                          >
                            {part.text}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" ? (
                <Message from="assistant">
                  <MessageContent className="bg-transparent px-0 py-0">
                    <Shimmer className="text-sm">
                      Checking the desk and the catalogue…
                    </Shimmer>
                  </MessageContent>
                </Message>
              ) : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            onSubmit={({ text }) => ask(text)}
            className="[&>[data-slot=input-group]]:border-input [&>[data-slot=input-group]]:bg-background [&>[data-slot=input-group]]:shadow-none [&>[data-slot=input-group]]:rounded-2xl"
          >
            <PromptInputTextarea
              ref={textareaRef}
              placeholder="Ask about trips, study, visas, passports or fees…"
              className="min-h-11 max-h-40 px-3.5 py-2.5 text-sm"
            />
            <PromptInputFooter className="gap-2">
              <p className="min-w-0 flex-1 text-[11px] leading-tight text-muted-foreground">
                AI concierge — every price stays indicative until a consultant
                confirms it. {BRAND.hours}.
              </p>
              <PromptInputSubmit status={status} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
        </section>
      ) : null}
    </>
  );
}
