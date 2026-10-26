/**
 * @name MultiViewCard
 * @description A dashboard multi-view card with an animated segmented view switcher and directional slide transitions.
 * @category ui
 */

import React, { memo, useId, useMemo, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. Hook: useViewSwitch
// ============================================================================

// eslint-disable-next-line react-refresh/only-export-components
export function useViewSwitch<T extends string | number>(initialView: T, viewOrder: T[] = []) {
  const [view, setViewInternal] = useState<T>(initialView);
  const [direction, setDirection] = useState<number>(1);

  const setView = useCallback(
    (nextView: T) => {
      if (nextView === view) return;

      if (Array.isArray(viewOrder) && viewOrder.length > 0) {
        const oldIdx = viewOrder.indexOf(view);
        const newIdx = viewOrder.indexOf(nextView);
        if (oldIdx !== -1 && newIdx !== -1) {
          setDirection(newIdx > oldIdx ? 1 : -1);
        }
      }

      setViewInternal(nextView);
    },
    [view, viewOrder]
  );

  return { view, direction, setView };
}

// ============================================================================
// 2. Component: ViewSwitcher
// ============================================================================

export type ViewSwitcherActiveColor =
  | "slate"
  | "primary"
  | "blue"
  | "emerald"
  | "indigo"
  | "amber"
  | "rose"
  | string;

const ACTIVE_COLOR_MAP: Record<string, string> = {
  slate: "text-neutral-900 dark:text-neutral-100 font-semibold",
  primary: "text-primary font-semibold",
  blue: "text-blue-600 dark:text-blue-400 font-semibold",
  emerald: "text-emerald-600 dark:text-emerald-400 font-semibold",
  indigo: "text-indigo-600 dark:text-indigo-400 font-semibold",
  amber: "text-amber-600 dark:text-amber-400 font-semibold",
  rose: "text-rose-600 dark:text-rose-400 font-semibold",
};

export interface ViewSwitcherOption<T extends string | number = string> {
  value: T;
  label?: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }> | React.ReactNode;
  badge?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export interface ViewSwitcherProps<T extends string | number = string> {
  value: T;
  onChange?: (val: T) => void;
  options: ViewSwitcherOption<T>[];
  size?: "sm" | "md" | "lg";
  activeColor?: ViewSwitcherActiveColor;
  activeClassName?: string;
  inactiveClassName?: string;
  pillClassName?: string;
  buttonClassName?: string;
  fullWidth?: boolean;
  transition?: Transition;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ViewSwitcher<T extends string | number = string>({
  value,
  onChange,
  options = [],
  size = "md",
  activeColor = "slate",
  activeClassName = "",
  inactiveClassName = "",
  pillClassName = "",
  buttonClassName = "",
  fullWidth = false,
  transition = { type: "spring", bounce: 0.15, duration: 0.28 },
  disabled = false,
  className = "",
  ariaLabel = "View switcher",
}: ViewSwitcherProps<T>) {
  const id = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isSmall = size === "sm";
  const isLarge = size === "lg";

  const containerSizeClasses = isSmall
    ? "p-0.5 rounded-lg border border-border/70 shadow-xs gap-0.5"
    : isLarge
    ? "p-1.5 rounded-2xl border border-border/70 shadow-inner gap-1.5"
    : "p-1 rounded-xl border border-border/70 shadow-inner gap-1";

  const defaultButtonSizeClasses = isSmall
    ? "px-3 py-1.5 rounded-md text-xs"
    : isLarge
    ? "px-5 py-2 rounded-xl text-base"
    : "px-4 py-1.5 rounded-lg text-sm";

  const pillRadiusClass = isSmall ? "rounded-md" : isLarge ? "rounded-xl" : "rounded-lg";
  const iconSize = isSmall ? 14 : isLarge ? 18 : 16;

  const resolvedActiveClass =
    activeClassName ||
    ACTIVE_COLOR_MAP[activeColor] ||
    (activeColor.startsWith("text-") ? activeColor : "text-foreground font-semibold");

  const resolvedInactiveClass =
    inactiveClassName ||
    "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 font-medium";

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled || !options.length) return;

    let targetIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      for (let i = 1; i <= options.length; i++) {
        const nextIdx = (currentIndex + i) % options.length;
        if (!options[nextIdx].disabled) {
          targetIndex = nextIdx;
          break;
        }
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      for (let i = 1; i <= options.length; i++) {
        const prevIdx = (currentIndex - i + options.length) % options.length;
        if (!options[prevIdx].disabled) {
          targetIndex = prevIdx;
          break;
        }
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstNonDisabled = options.findIndex((opt) => !opt.disabled);
      if (firstNonDisabled !== -1) targetIndex = firstNonDisabled;
    } else if (e.key === "End") {
      e.preventDefault();
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i].disabled) {
          targetIndex = i;
          break;
        }
      }
    }

    if (targetIndex !== -1 && targetIndex !== currentIndex) {
      const targetOption = options[targetIndex];
      onChange?.(targetOption.value);
      buttonRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 select-none relative",
        fullWidth && "w-full flex",
        containerSizeClasses,
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {options.map((opt, idx) => {
        const isActive = value === opt.value;
        const isItemDisabled = disabled || opt.disabled;

        return (
          <button
            key={String(opt.value)}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.ariaLabel || (typeof opt.label === "string" ? opt.label : undefined)}
            tabIndex={isActive ? 0 : -1}
            disabled={isItemDisabled}
            onClick={() => {
              if (!isItemDisabled && !isActive) {
                onChange?.(opt.value);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer",
              fullWidth && "flex-1",
              defaultButtonSizeClasses,
              buttonClassName,
              opt.className,
              isActive ? resolvedActiveClass : resolvedInactiveClass,
              isItemDisabled && "cursor-not-allowed pointer-events-none opacity-50"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`view-switcher-pill-${id}`}
                className={cn(
                  "absolute inset-0 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs border border-neutral-200/80 dark:border-neutral-700/80 -z-10",
                  pillRadiusClass,
                  pillClassName
                )}
                transition={transition}
              />
            )}
            {opt.icon && (
              <span className="shrink-0">
                {React.isValidElement(opt.icon)
                  ? opt.icon
                  : React.createElement(opt.icon as React.ComponentType<{ size?: number }>, {
                      size: iconSize,
                    })}
              </span>
            )}
            {opt.label && <span className="relative z-10">{opt.label}</span>}
            {opt.badge !== undefined && (
              <span
                className={cn(
                  "relative z-10 ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "bg-muted/60 text-muted-foreground"
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 3. Component: ViewTransition
// ============================================================================

export type TransitionType = "slide" | "fade" | "none";

const createSlideVariants = (offset = 18): Variants => ({
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? offset : -offset,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -offset : offset,
  }),
});

const createFadeVariants = (): Variants => ({
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
});

export interface ViewTransitionProps {
  viewKey: string | number;
  direction?: number;
  order?: (string | number)[];
  transitionType?: TransitionType;
  duration?: number;
  slideOffset?: number;
  variants?: Variants;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function ViewTransition({
  viewKey,
  direction,
  order,
  transitionType = "slide",
  duration = 0.2,
  slideOffset = 18,
  variants,
  className = "",
  containerClassName = "",
  children,
}: ViewTransitionProps) {
  const [history, setHistory] = useState({ prevKey: viewKey, autoDirection: 1 });

  if (history.prevKey !== viewKey) {
    let newDir = history.autoDirection;
    if (order && order.length > 0) {
      const oldIdx = order.indexOf(history.prevKey);
      const newIdx = order.indexOf(viewKey);
      if (oldIdx !== -1 && newIdx !== -1) {
        newDir = newIdx > oldIdx ? 1 : -1;
      }
    }
    setHistory({ prevKey: viewKey, autoDirection: newDir });
  }

  // If transitionType is "none", render directly without Framer Motion overhead
  if (transitionType === "none") {
    return (
      <div className={cn("w-full flex-1 flex flex-col relative", containerClassName)}>
        <div key={viewKey} className={cn("w-full flex-1 flex flex-col", className)}>
          {children}
        </div>
      </div>
    );
  }

  const activeDirection = direction !== undefined ? direction : history.autoDirection;
  const activeVariants =
    variants ||
    (transitionType === "fade" ? createFadeVariants() : createSlideVariants(slideOffset));

  return (
    <div className={cn("w-full flex-1 flex flex-col overflow-hidden relative", containerClassName)}>
      <AnimatePresence mode="wait" initial={false} custom={activeDirection}>
        <motion.div
          key={viewKey}
          custom={activeDirection}
          variants={activeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration, ease: "easeOut" }}
          className={cn("w-full flex-1 flex flex-col", className)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 4. Main Component: MultiViewCard
// ============================================================================

export interface ViewDefinition<T extends string | number = string> {
  key: T;
  label: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }> | React.ReactNode;
  badge?: React.ReactNode;
  render?: () => React.ReactNode;
  content?: React.ReactNode;
  component?: React.ComponentType<any>;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export interface MultiViewCardProps<T extends string | number = string> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  views: ViewDefinition<T>[];
  defaultView?: T;
  view?: T;
  direction?: number;
  onViewChange?: (nextView: T) => void;
  size?: "sm" | "md" | "lg";
  activeColor?: ViewSwitcherActiveColor;
  switcherProps?: Partial<ViewSwitcherProps<T>>;
  headerRight?: React.ReactNode;
  className?: string;
  contentClassName?: string;

  // Flexible Content Rendering
  keepMounted?: boolean;

  // Animation & Transition Controls
  transitionType?: TransitionType;
  duration?: number;
  slideOffset?: number;
  variants?: Variants;

  // Card Layout & Slots
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  headerLeft?: React.ReactNode;
  footer?: React.ReactNode;
  footerClassName?: string;
  switcherPosition?: "top-right" | "top-left" | "bottom" | "none";
}

function renderViewContent<T extends string | number>(item?: ViewDefinition<T>): React.ReactNode {
  if (!item) return null;
  if (typeof item.render === "function") {
    return item.render();
  }
  if (item.content !== undefined) {
    return item.content;
  }
  if (item.component) {
    const Component = item.component;
    return <Component />;
  }
  return null;
}

function MultiViewCardInner<T extends string | number = string>({
  title,
  subtitle,
  views = [],
  defaultView,
  view,
  direction,
  onViewChange,
  size = "sm",
  activeColor = "slate",
  switcherProps = {},
  headerRight = null,
  className = "",
  contentClassName = "",

  // Flexible Content Rendering
  keepMounted = false,

  // Animation & Transition Controls
  transitionType = "slide",
  duration = 0.2,
  slideOffset = 18,
  variants,

  // Card Layout & Slots
  headerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  headerLeft = null,
  footer = null,
  footerClassName = "",
  switcherPosition = "top-right",
}: MultiViewCardProps<T>) {
  const viewOrder = useMemo(() => views.map((v) => v.key), [views]);

  const {
    view: internalView,
    direction: internalDirection,
    setView: setInternalView,
  } = useViewSwitch<T>(defaultView || viewOrder[0] || ("" as T), viewOrder);

  const isControlled = view !== undefined;
  const activeView = isControlled ? view : internalView;
  const activeDirection = direction !== undefined ? direction : internalDirection;

  const handleViewChange = (nextView: T) => {
    if (!isControlled) {
      setInternalView(nextView);
    }
    onViewChange?.(nextView);
  };

  const switcherOptions = useMemo(() => {
    return views.map((v) => ({
      value: v.key,
      label: v.label,
      icon: v.icon,
      badge: v.badge,
      disabled: v.disabled,
      ariaLabel: v.ariaLabel,
      className: v.className,
    }));
  }, [views]);

  const activeItem = useMemo(() => {
    return views.find((v) => v.key === activeView) || views[0];
  }, [views, activeView]);

  const showSwitcher = switcherPosition !== "none" && switcherOptions.length > 1;
  const isBottomSwitcher = showSwitcher && switcherPosition === "bottom";

  const switcherElement = showSwitcher ? (
    <ViewSwitcher<T>
      value={activeView}
      onChange={handleViewChange}
      options={switcherOptions}
      size={size}
      activeColor={activeColor}
      ariaLabel={typeof title === "string" ? `${title} view mode` : "Card view mode"}
      {...switcherProps}
    />
  ) : null;

  // Determine if header row has any content to display
  const hasHeaderLeft = Boolean(headerLeft || (switcherPosition === "top-left" && switcherElement));
  const hasHeaderTitle = Boolean(title || subtitle);
  const hasHeaderRight = Boolean(headerRight || (switcherPosition === "top-right" && switcherElement));
  const hasHeader = hasHeaderLeft || hasHeaderTitle || hasHeaderRight;

  return (
    <div
      className={cn(
        "w-full bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 flex flex-col",
        className
      )}
    >
      {/* Header Row - Only rendered if header contents exist */}
      {hasHeader && (
        <div className={cn("flex flex-wrap items-start justify-between gap-4 mb-4", headerClassName)}>
          {/* Left group */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {headerLeft}
            {switcherPosition === "top-left" && switcherElement}
            {hasHeaderTitle && (
              <div className="flex flex-col min-w-0">
                {title && (
                  typeof title === "string" ? (
                    <h3 className={cn("text-lg font-bold text-card-foreground tracking-tight", titleClassName)}>
                      {title}
                    </h3>
                  ) : (
                    title
                  )
                )}
                {subtitle && (
                  typeof subtitle === "string" ? (
                    <p className={cn("text-sm text-muted-foreground mt-0.5", subtitleClassName)}>
                      {subtitle}
                    </p>
                  ) : (
                    subtitle
                  )
                )}
              </div>
            )}
          </div>

          {/* Right group */}
          {hasHeaderRight && (
            <div className="flex items-center gap-3 shrink-0">
              {headerRight}
              {switcherPosition === "top-right" && switcherElement}
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 w-full flex flex-col">
        {keepMounted ? (
          <div className="w-full flex-1 flex flex-col relative">
            {views.map((v) => {
              const isCurrent = v.key === activeView;
              const rendered = renderViewContent(v);

              return (
                <div
                  key={String(v.key)}
                  role="tabpanel"
                  aria-hidden={!isCurrent}
                  className={cn(
                    "w-full flex-1 flex flex-col",
                    !isCurrent && "hidden",
                    contentClassName
                  )}
                >
                  {isCurrent && transitionType !== "none" ? (
                    <ViewTransition
                      viewKey={v.key}
                      direction={activeDirection}
                      order={viewOrder}
                      transitionType={transitionType}
                      duration={duration}
                      slideOffset={slideOffset}
                      variants={variants}
                      className="w-full flex-1 flex flex-col"
                    >
                      {rendered}
                    </ViewTransition>
                  ) : (
                    rendered
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <ViewTransition
            viewKey={activeView}
            direction={activeDirection}
            order={viewOrder}
            transitionType={transitionType}
            duration={duration}
            slideOffset={slideOffset}
            variants={variants}
            className={contentClassName || "w-full flex-1 flex flex-col"}
          >
            {renderViewContent(activeItem)}
          </ViewTransition>
        )}
      </div>

      {/* Bottom Switcher */}
      {isBottomSwitcher && (
        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-border">
          {switcherElement}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            "mt-4 pt-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground",
            footerClassName
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export const MultiViewCard = memo(MultiViewCardInner) as typeof MultiViewCardInner;
export default MultiViewCard;
