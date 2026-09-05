import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { CopyButton } from "./Copy-button"

type CodeBlockProps = React.ComponentProps<"figure"> & {
  code?: string
  lang?: string
  title?: string
  showLineNumbers?: boolean
  maxHeight?: string
}

/**
 * CodeBlock — pretty-code figure matching rehype-pretty-code + shiki Oscura Dusk output.
 * Use instead of ```tsx fences in MDX.
 *
 * Example:
 * ```mdx
 * import { CodeBlock } from "@/components/docspagescomponent/CodeBlock"
 * <CodeBlock lang="json" code={`"dependencies": {\n  "react": "19.0.0"\n}`} />
 * ```
 * Children fallback: <CodeBlock lang="tsx">{"const x = 1"}</CodeBlock>
 */
export function CodeBlock({
  code,
  children,
  lang = "tsx",
  title,
  showLineNumbers = true,
  maxHeight = "650px",
  className,
  ...props
}: CodeBlockProps) {
  const raw = React.useMemo(() => {
    if (code != null) return code
    if (typeof children === "string") return children
    // children may be React node from MDX — extract text
    if (Array.isArray(children)) return children.map((c) => (typeof c === "string" ? c : "")).join("")
    return ""
  }, [code, children])

  // split into lines for data-line rendering (mirrors shiki transformers)
  const lines = React.useMemo(() => raw.replace(/\n$/, "").split("\n"), [raw])

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn("relative group/code-block", className)}
      {...props}
    >
      {title && (
        <figcaption className="rounded-t-lg border border-b-0 bg-[#1a1c1e] px-4 py-2 text-xs font-medium text-white">
          {title}
        </figcaption>
      )}
      <pre
        className={cn(
          "relative overflow-x-auto border bg-[#131419] py-4 dark:bg-[#131419] [&_*]:!bg-transparent Oscura Dusk",
          title ? "rounded-b-lg rounded-t-none" : "mt-6 mb-4 rounded-lg",
          "max-h-[650px]"
        )}
        style={
          {
            maxHeight,
            "--shiki-oscura": "#E6E6E6",
            "--shiki-oscura-bg": "#131419",
          } as React.CSSProperties
        }
        tabIndex={0}
        data-language={lang}
        data-theme="Oscura Dusk"
      >
        {showLineNumbers && (
          <style>{`code[data-line-numbers]{counter-reset:line}code[data-line-numbers]>[data-line]::before{counter-increment:line;content:counter(line);display:inline-block;width:1.75rem;margin-right:1rem;text-align:right;color:#5C6974;font-size:0.8125rem;user-select:none}`}</style>
        )}
        <code
          className={cn(
            "relative rounded px-4 py-1 text-sm __className_7d60dc",
            "[&:not(:where(pre*))]:[&:not(pre)]:bg-neutral-100 [&:not(:where(pre*))]:[&:not(pre)]:dark:bg-neutral-800"
          )}
          data-line-numbers={showLineNumbers ? "" : undefined}
          data-line-numbers-max-digits={String(lines.length.toString().length)}
          data-language={lang}
          data-theme="Oscura Dusk"
          style={{ display: "grid" }}
        >
          {lines.map((line, i) => (
            <span key={i} data-line="">
              <PrettyLine content={line} lang={lang} />
            </span>
          ))}
        </code>
        <div className="absolute top-4 right-4 flex gap-2">
          <CopyButton
            value={raw}
            className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10 flex h-6 items-center justify-center gap-2 px-1 py-0.5 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
          />
        </div>
      </pre>
    </figure>
  )
}

function PrettyLine({ content, lang }: { content: string; lang: string }) {
  if (content.trim() === "") return <span>{content || " "}</span>

  const esc = (s: string) => s
  // JSON — keep existing palette (dependencies/overrides white, values green)
  if (lang === "json") {
    const parts: React.ReactNode[] = []
    let last = 0
    const re = /("[^"]*")/g
    let m: RegExpExecArray | null
    let idx = 0
    while ((m = re.exec(content)) !== null) {
      if (m.index > last) {
        parts.push(
          <span key={`t-${idx++}`} style={{ color: "#E6E6E6" }}>
            {esc(content.slice(last, m.index))}
          </span>
        )
      }
      const isKey = content.slice(m.index + m[0].length).trimStart().startsWith(":")
      const isTopKey = m[0] === '"dependencies"' || m[0] === '"overrides"'
      const color = isTopKey ? "#FFFFFF" : isKey ? "#FFFFFF" : "#4EBE96"
      parts.push(
        <span key={`s-${idx++}`} style={{ color }}>
          {m[0]}
        </span>
      )
      last = m.index + m[0].length
    }
    if (last < content.length) {
      parts.push(
        <span key={`t-${idx++}`} style={{ color: "#E6E6E6" }}>
          {esc(content.slice(last))}
        </span>
      )
    }
    return (
      <span>
        {parts.map((p, i) => (
          <React.Fragment key={i}>{p}</React.Fragment>
        ))}
      </span>
    )
  }

  // TS / JS / TSX / JSX — Oscura Dusk-inspired palette
  if (["ts", "tsx", "js", "jsx", "javascript", "typescript"].includes(lang)) {
    // token regex: comments, strings, keywords, numbers, keeps delimiters
    const tokenRe =
      /(\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\\b(?:import|export|from|as|default|return|const|let|var|function|class|extends|implements|type|interface|enum|async|await|if|else|for|while|try|catch|finally|throw|new|extends|super|this|extends|yield|break|continue|switch|case|default|extends|in|of|instanceof|typeof|void|delete|extends)\b|\b\d+\.?\d*\b)/g
    // Use manual split to keep colors
    const keywords = new Set([
      "import",
      "export",
      "from",
      "as",
      "default",
      "return",
      "const",
      "let",
      "var",
      "function",
      "class",
      "extends",
      "implements",
      "type",
      "interface",
      "enum",
      "async",
      "await",
      "if",
      "else",
      "for",
      "while",
      "try",
      "catch",
      "finally",
      "throw",
      "new",
      "super",
      "this",
      "yield",
      "break",
      "continue",
      "switch",
      "case",
      "in",
      "of",
      "instanceof",
      "typeof",
      "void",
      "delete",
    ])

    const parts: React.ReactNode[] = []
    let lastIdx = 0
    let match: RegExpExecArray | null
    let key = 0
    // Re-create regex each line to avoid state
    const re = new RegExp(tokenRe.source, "g")
    while ((match = re.exec(content)) !== null) {
      const [tok] = match
      const start = match.index
      if (start > lastIdx) {
        parts.push(
          <span key={`p-${key++}`} style={{ color: "#E6E6E6" }}>
            {esc(content.slice(lastIdx, start))}
          </span>
        )
      }
      let color = "#E6E6E6"
      let style: React.CSSProperties = { color }
      if (tok.startsWith("//") || tok.startsWith("/*")) {
        color = "#6A737D"
        style = { color, fontStyle: "italic" }
      } else if (tok.startsWith('"') || tok.startsWith("'") || tok.startsWith("`")) {
        color = "#CE9178" // strings — warm amber (VSCode dark)
        style = { color }
      } else if (keywords.has(tok)) {
        color = "#FF7AB2" // keywords — pink
        style = { color }
      } else if (/^\d/.test(tok)) {
        color = "#B5CEA8" // numbers — mint
        style = { color }
      }
      parts.push(
        <span key={`t-${key++}`} style={style}>
          {tok}
        </span>
      )
      lastIdx = start + tok.length
    }
    if (lastIdx < content.length) {
      // remaining chunk may contain identifiers like twMerge, clsx, ClassValue — highlight PascalCase/camelCase
      const tail = content.slice(lastIdx)
      // quick secondary pass for identifiers: highlight imported names in cyan
      // For simplicity, keep muted but tint capitalized types
      if (/[A-Z]/.test(tail)) {
        // split by word boundaries, tint capitalized words
        const wordRe = /([A-Za-z_$][A-Za-z0-9_$]*)/g
        let l = 0
        let wm: RegExpExecArray | null
        const sub: React.ReactNode[] = []
        let subKey = 0
        while ((wm = wordRe.exec(tail)) !== null) {
          if (wm.index > l) {
            sub.push(
              <span key={`s-${subKey++}`} style={{ color: "#E6E6E6" }}>
                {tail.slice(l, wm.index)}
              </span>
            )
          }
          const w = wm[0]
          const isType = /^[A-Z]/.test(w)
          sub.push(
            <span key={`w-${subKey++}`} style={{ color: isType ? "#4EC9B0" : "#E6E6E6" }}>
              {w}
            </span>
          )
          l = wm.index + w.length
        }
        if (l < tail.length) {
          sub.push(
            <span key={`s-${subKey++}`} style={{ color: "#E6E6E6" }}>
              {tail.slice(l)}
            </span>
          )
        }
        parts.push(<React.Fragment key={`tail-${key++}`}>{sub}</React.Fragment>)
      } else {
        parts.push(
          <span key={`tail-${key++}`} style={{ color: "#E6E6E6" }}>
            {tail}
          </span>
        )
      }
    }
    // if nothing matched, fallback tint capitalized types
    if (parts.length === 0) {
      return <span style={{ color: "#E6E6E6" }}>{esc(content)}</span>
    }
    return <span>{parts}</span>
  }

  // fallback for css / other
  return <span style={{ color: "#E6E6E6" }}>{esc(content)}</span>
}

/** Convenience for the screenshot package.json deps */
export function PackageDepsCodeBlock({ className, ...props }: Omit<CodeBlockProps, "code" | "lang">) {
  const defaultCode = `"dependencies": {\n    "framer-motion": "^12.0.0-alpha.1",\n    "next": "15.0.3",\n    "react": "19.0.0-rc-66855b96-20241106",\n    "react-dom": "19.0.0-rc-66855b96-20241106",\n    "tailwind-merge": "^2.5.5"\n  },\n  "overrides": {\n    "framer-motion": {\n      "react": "19.0.0-rc-66855b96-20241106",\n      "react-dom": "19.0.0-rc-66855b96-20241106"\n    }\n  },`
  return <CodeBlock lang="json" code={defaultCode} className={className} {...props} />
}
