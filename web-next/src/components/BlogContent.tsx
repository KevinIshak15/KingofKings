import Link from "next/link";

/**
 * Renders blog body content. Parses [text](url) into Link components.
 */
export function BlogContent({
  body,
}: {
  body: Array<{ type: "p" | "h2" | "h3"; content: string }>;
}) {
  const parseContent = (text: string) => {
    const parts: (string | { text: string; href: string })[] = [];
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push({ text: match[1], href: match[2] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    if (parts.length === 0) parts.push(text);
    return parts;
  };

  return (
    <div className="blog-content space-y-6">
      {body.map((block, i) => {
        const parts = parseContent(block.content);
        const el = parts.map((part, j) =>
          typeof part === "string" ? (
            <span key={j}>{part}</span>
          ) : part.href.startsWith("http") ? (
            <a key={j} href={part.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              {part.text}
            </a>
          ) : (
            <Link key={j} href={part.href} className="text-primary hover:underline font-medium">
              {part.text}
            </Link>
          )
        );

        if (block.type === "h2") {
          return (
            <h2 key={i} className="font-serif text-2xl md:text-3xl text-secondary mt-10 mb-4">
              {block.content}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="font-serif text-xl text-secondary mt-8 mb-3">
              {block.content}
            </h3>
          );
        }
        return (
          <p key={i} className="text-gray-600 leading-relaxed">
            {el}
          </p>
        );
      })}
    </div>
  );
}
