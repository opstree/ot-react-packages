import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/ui/tabs"

export const LanguageContext = React.createContext<{
  langType: "ts" | "js"
  setLangType: (lang: "ts" | "js") => void
}>({
  langType: "ts",
  setLangType: () => { },
})

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
  className?: string
}) {

  const [tab, setTab] = React.useState("preview")
  const [langType, setLangType] = React.useState<"ts" | "js">("ts")

  return (
    <LanguageContext.Provider value={{ langType, setLangType }}>
      <div
        className={cn("relative mt-4 mb-12 flex flex-col gap-2", className)}
        {...props}
      >
        <Tabs
          className="relative mr-auto w-full"
          value={tab}
          onValueChange={setTab}
        >
          <div className="flex items-center justify-between">
            {!hideCode && (
              <TabsList className="gap-2 bg-black/80 backdrop-blur-sm ring ring-zinc-950/30">
                <TabsTrigger
                  className="cursor-pointer text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-black text-white/70 hover:text-white"
                  value="preview"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  className="cursor-pointer text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-black text-white/70 hover:text-white"
                  value="code"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            )}
            {tab === "code" && (
              <div className="flex items-center p-1 shadow-sm shadow-black/20 bg-black/80 backdrop-blur-sm ring ring-zinc-950/30 rounded-lg text-xs text-white">
                <button
                  onClick={() => setLangType("ts")}
                  className={cn(
                    "px-2 py-0.5  rounded-md cursor-pointer transition-all duration-200",
                    langType === "ts" ? "bg-white text-black font-semibold" : "text-white/70 hover:text-white"
                  )}
                >
                  TS
                </button>
                <button
                  onClick={() => setLangType("js")}
                  className={cn(
                    "px-2 py-0.5  rounded-md cursor-pointer transition-all duration-200",
                    langType === "js" ? "bg-white text-black font-semibold" : "text-white/70 hover:text-white"
                  )}
                >
                  JS
                </button>
              </div>
            )}
          </div>
        </Tabs>
        <div
          data-tab={tab}
          className="data-[tab=code]:border-code relative rounded-xl border md:-mx-1"
        >
          {
            tab === "preview" ? (
              <div
                data-slot="preview"
                data-active={tab === "preview"}
                className="invisible data-[active=true]:visible"
              >
                <div
                  data-align={align}
                  className={cn(
                    "preview flex overflow-y-auto min-h-80 max-h-100 relative w-full justify-center p-2 lg:p-2 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start overflow-hidden "
                  )}
                >
                  {component}
                </div>
              </div>
            ) :
              <div
                data-slot="code"
                data-active={tab === "code"}
                className="overflow-auto data-[active=true]:block bg-[var(--bg)] rounded-lg p-4 min-h-100"
              >
                {source}
              </div>
          }

        </div>
      </div>
    </LanguageContext.Provider>
  )
}