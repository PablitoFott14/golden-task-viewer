import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";

export default function MarkdownDoc({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setContent(null);
    setError(false);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((t) => active && setContent(t))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [url]);

  if (error) {
    return (
      <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Couldn't load this document.
      </div>
    );
  }
  if (content === null) {
    return (
      <div className="flex items-center gap-2 px-4 py-8 text-sm text-ink-400">
        <Loader2 size={16} className="animate-spin" /> Loading document…
      </div>
    );
  }
  return (
    <div className="prose-task max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
