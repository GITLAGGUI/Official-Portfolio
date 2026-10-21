import { FormEvent, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiSend, FiX } from "react-icons/fi";
import { projects } from "../data/projects";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

type JoelAssistantProps = {
  open: boolean;
  onClose: () => void;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hey, I’m Joel’s AI assistant. Want to explore his work or talk about your next project?",
  },
];

function localPortfolioAnswer(message: string) {
  const query = message.toLowerCase();
  if (query.includes('leadmaps')) return 'LeadMaps is Joel’s business research workspace. It brings business collection, saved lists and exports together, with an API and webhooks. Check Projects → LeadMaps or leadmaps.live.';
  if (query.includes('video') || query.includes('motion') || query.includes('edit')) return 'Joel makes product films and creator edits with FFmpeg and HyperFrames. Projects → Video & Motion has the finished work. Got a video in mind?';
  if (query.includes('seo')) return 'Joel works on technical SEO and search visibility, using Google Search Console and OpenSEO. Services has real LeadMaps reports you can check.';
  if (query.includes('contact') || query.includes('hire') || query.includes('available')) return 'Want to work with Joel? Email jlaggui47@gmail.com or open Contact. What are you looking to build?';
  if (query.includes('skill') || query.includes('stack') || query.includes('technology')) return 'React, Next.js, TypeScript and Python are his core tools. He also works with databases, automation, computer vision and video. Tools has the full list and free workflow skills.';
  if (query.includes('automation') || query.includes('n8n') || query.includes('openclaw')) return 'Joel connects tools through n8n, APIs and AI. His projects include an outreach prototype and private agent workflows. What repetitive task would you like to hand off?';
  if (query.includes('rice') || query.includes('computer vision') || query.includes('yolo')) return 'RiceGuardAI is a research project for rice-disease segmentation in drone imagery. Joel works on the data, inference pipeline and evaluation. The project page shows the evidence and current limitations.';
  if (query.includes('project') || query.includes('work') || query.includes('build')) {
    const names = projects.filter((project) => project.featured).slice(0, 4).map((project) => project.shortTitle);
    return `Start with ${names.join(', ')}. Pick a project for the actual work, Joel’s role and screenshots.`;
  }
  if (/tell.*joke|joke.*tell/.test(query)) return 'Why do developers prefer dark mode? Light attracts bugs. 😭 Anyway, how did you find Joel’s work?';
  if (/\b(lol|lmao|haha|funny)\b/.test(query)) return 'Okay, that got me. 😭 How did you find Joel’s portfolio?';
  if (/^(hi|hello|hey|yo)[!. ?]*$/.test(query)) return 'Hey! What brought you here—one of Joel’s projects, or something you want to build?';
  return 'Happy to chat. What brought you to Joel’s portfolio—his software, AI work, or video edits?';
}

function renderInlineMarkdown(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return <Fragment key={index}>{part}</Fragment>;
    });
}

function MarkdownMessage({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(<ul key={`list-${blocks.length}`}>{bullets.map((bullet, index) => <li key={index}>{renderInlineMarkdown(bullet)}</li>)}</ul>);
    bullets = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const bullet = trimmed.match(/^(?:[-*]|\d+[.)])\s+(.+)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flushBullets();
    if (trimmed) blocks.push(<p key={`paragraph-${blocks.length}`}>{renderInlineMarkdown(trimmed)}</p>);
  });
  flushBullets();

  return <>{blocks}</>;
}

export default function JoelAssistant({ open, onClose }: JoelAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const quickPrompts = useMemo(
    () => ["Show me Joel’s automation work", "What are his strongest skills?", "How can I contact Joel?"],
    [],
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || loading) return;

    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text: message },
    ]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 32_000);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: messages.slice(-6).map((item) => ({ role: item.role, content: item.text })) }),
        signal: controller.signal,
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) throw new Error(payload.error || "Assistant unavailable");
      const replyText = payload.reply;
      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "assistant", text: replyText },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "assistant", text: localPortfolioAnswer(message) },
      ]);
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  if (!open) return null;

  return (
    <div className="assistant-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="assistant-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="assistant-panel__header">
          <div>
            <span className="assistant-panel__icon"><img src="/assets/assistant/joel-assistant-bot.webp" alt="" /></span>
            <div>
              <h2 id="assistant-title">Joel Assistant</h2>
              <p>Portfolio guide</p>
            </div>
          </div>
          <button type="button" aria-label="Close Joel Assistant" onClick={onClose}>
            <FiX />
          </button>
        </header>

        <div ref={messagesRef} className="assistant-messages" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`assistant-message assistant-message--${message.role}`}>
              {message.role === "assistant" ? <MarkdownMessage text={message.text} /> : message.text}
            </div>
          ))}
          {loading && <div className="assistant-message assistant-message--assistant">Checking the portfolio…</div>}
        </div>

        <div className="assistant-prompts" aria-label="Suggested questions">
          {quickPrompts.map((prompt) => (
            <button key={prompt} type="button" onClick={() => void sendMessage(prompt)}>
              {prompt} <FiArrowUpRight />
            </button>
          ))}
        </div>

        <form className="assistant-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="assistant-input">Ask Joel Assistant</label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={input}
            maxLength={600}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Joel’s work…"
          />
          <button type="submit" aria-label="Send message" disabled={!input.trim() || loading}>
            <FiSend />
          </button>
        </form>
      </section>
    </div>
  );
}
