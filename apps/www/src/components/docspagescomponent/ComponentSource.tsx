import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { CodeCollapsibleWrapper } from "./CodeCollapse"
import { CopyButton } from "./Copy-button"
import { LanguageContext } from "./ComponentPreview"

export function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
}) {
  const [data, setData] = React.useState<{ code: string; highlightedCode: string } | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { langType } = React.useContext(LanguageContext)

  React.useEffect(() => {
    if (!src) return

    setLoading(true)
    setError(null)
    const fetchSource = async () => {
      try {
        let currentSrc = src
        let currentLang = language ?? title?.split(".").pop() ?? "tsx"

        if (langType === "js") {
          currentSrc = src.replace("/ts/", "/js/").replace(".tsx", ".jsx")
          currentLang = "jsx"
        }

        const res = await fetch(`/api/source?src=${encodeURIComponent(currentSrc)}&lang=${currentLang}`)
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Failed to fetch source")
        }
        const json = await res.json()
        setData(json)
      } catch (err: any) {
        console.error("Error fetching component source:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSource()
  }, [src, language, title, langType])

  if (!name && !src) {
    return null
  }

  if (loading) {
    return <div className="text-sm text-neutral-500 p-4 flex w-full justify-center items-center h-100">Loading source...</div>
  }

  if (error) {
    return <div className="text-sm text-red-500 p-4">Error: {error}</div>
  }

  if (!data) {
    return null
  }

  const { code, highlightedCode } = data
  const lang = language ?? title?.split(".").pop() ?? "tsx"

  if (!collapsible) {
    return (
      <div className={cn("relative w-full", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  )
}

function ComponentCode({
  code,
  highlightedCode,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="relative"
    >
      <div className="absolute top-2 right-2 z-10">
        <CopyButton value={code} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  )
}
