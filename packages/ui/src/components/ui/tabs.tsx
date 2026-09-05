import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@workspace/ui/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLDivElement>(null)
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      ;(innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      if (typeof ref === "function") ref(node)
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const bar = innerRef.current
    if (!bar) return
    const pill = bar.querySelector<HTMLSpanElement>(".t-tabs-pill")
    if (!pill) return
    const getActive = () =>
      (bar.querySelector('[data-state="active"]') as HTMLElement | null) ??
      (bar.querySelector('[aria-selected="true"]') as HTMLElement | null) ??
      (bar.querySelector<HTMLElement>(".t-tab"))

    const moveTo = (tab: HTMLElement | null, animate: boolean) => {
      if (!tab) return
      if (!animate) {
        const prev = pill.style.transition
        pill.style.transition = "none"
        pill.style.transform = `translateX(${tab.offsetLeft}px)`
        pill.style.width = `${tab.offsetWidth}px`
        void pill.offsetWidth
        pill.style.transition = prev
      } else {
        pill.style.transform = `translateX(${tab.offsetLeft}px)`
        pill.style.width = `${tab.offsetWidth}px`
      }
    }

    const active = getActive()
    if (active) requestAnimationFrame(() => moveTo(active, false))

    const onResize = () => {
      const a = getActive()
      if (a) moveTo(a, false)
    }
    window.addEventListener("resize", onResize)

    // observe active tab changes (Radix toggles data-state)
    const obs = new MutationObserver(() => {
      const a = getActive()
      if (a) moveTo(a, true)
    })
    obs.observe(bar, { attributes: true, subtree: true, attributeFilter: ["data-state", "aria-selected", "class"] })

    // click fallback
    const onClick = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest?.(".t-tab") as HTMLElement | null
      if (target && bar.contains(target)) moveTo(target, true)
    }
    bar.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("resize", onResize)
      bar.removeEventListener("click", onClick)
      obs.disconnect()
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={setRefs}
      className={cn(
        "t-tabs inline-flex items-center justify-center rounded-md bg-muted p-0.5 text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="t-tabs-pill" aria-hidden="true" />
      {props.children}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "t-tab inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-neutral-600",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }