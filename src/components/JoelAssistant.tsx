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
    text: "Hi, I’m Joel Assistant. Ask me about Joel’s projects, skills, availability, or the kind of systems he builds.",
  },
];

function localPortfolioAnswer(message: string) {
  const query = message.toLowerCase();

  if (query.includes("contact") || query.includes("hire") || query.includes("available")) {
    return "Joel is open to full-stack, AI automation, computer vision, NLP, and data workflow opportunities. You can reach him at jlaggui47@gmail.com or use the Contact file in this portfolio.";
  }

  if (query.includes("skill") || query.includes("stack") || query.includes("technology")) {
    return "Joel works across React and TypeScript, Python data and automation systems, n8n and OpenClaw workflows, AWS, CVAT, YOLO segmentation, ABSA, Flutter, Supabase, and deployment tooling. The Skills section groups these by the problems they solve.";
  }

  if (query.includes("automation") || query.includes("n8n") || query.includes("openclaw")) {
    return "Joel’s automation work includes a preview-first n8n outreach prototype, a private OpenClaw agent system, and a Python/FFmpeg short-video production pipeline. Each case study states what is live, private, or still gated.";
  }

  if (query.includes("rice") || query.includes("computer vision") || query.includes("yolo")) {
    return "RiceGuardAI is Joel’s 4K rice-disease segmentation research pipeline. It covers tiled inference, CVAT review, dataset readiness, and AWS job infrastructure. Video4 stays sealed, and the portfolio does not claim final accuracy before expert review and training gates are complete.";
  }

  if (query.includes("project") || query.includes("work") || query.includes("build")) {
    const names = projects.filter((project) => project.featured).slice(0, 6).map((project) => project.shortTitle);
    return `Start with ${names.join(", ")}. Open any project to see Joel’s role, the challenge, the build approach, and project screenshots.`;
  }

  return "Joel builds web products, AI automations, computer-vision pipelines, and NLP/data systems. Try asking about featured projects, skills, RiceGuardAI, automation work, or how to contact him.";
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
        body: JSON.stringify({ message }),
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
