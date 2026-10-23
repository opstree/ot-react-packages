/**
 * @name MultiViewCard
 * @description A dashboard multi-view card with an animated segmented view switcher and directional slide transitions.
 * @category ui
 */

import React, { memo, useId, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. Hook: useViewSwitch
// ============================================================================

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
  activeColor?: "slate" | "blue" | string;
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

  const isSmall = size === "sm";
  const isLarge = size === "lg";

  const containerSizeClasses = isSmall
    ? "p-0.5 rounded-lg border border-slate-200/80 dark:border-neutral-800 shadow-2xs gap-0.5"
    : isLarge
    ? "p-1.5 rounded-2xl border border-slate-200/60 dark:border-neutral-800 shadow-inner gap-1.5"
    : "p-1 rounded-xl border border-slate-200/50 dark:border-neutral-800 shadow-inner gap-1";

  const defaultButtonSizeClasses = isSmall
    ? "px-3 py-1.5 rounded-md text-xs"
    : isLarge
    ? "px-5 py-2 rounded-xl text-base"
    : "px-4 py-1.5 rounded-lg text-sm";

  const pillRadiusClass = isSmall ? "rounded-md" : isLarge ? "rounded-xl" : "rounded-lg";
  const iconSize = isSmall ? 14 : isLarge ? 18 : 16;

  const resolvedActiveClass =
    activeClassName ||
    (activeColor === "blue"
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "text-slate-900 dark:text-neutral-100 font-semibold");

  const resolvedInactiveClass =
    inactiveClassName ||
    "text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200 font-medium";

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled || !options.length) return;

    let targetIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + options.length) % options.length;
    }

    if (targetIndex !== -1) {
      const targetOption = options[targetIndex];
      if (!targetOption.disabled) {
        onChange?.(targetOption.value);
      }
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center bg-slate-100 dark:bg-neutral-800/80 select-none relative",
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
                  "absolute inset-0 bg-white dark:bg-neutral-900 shadow-xs border border-slate-200/60 dark:border-neutral-700/80 -z-10",
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
                  "relative z-10 ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold transition-colors",
                  isActive
                    ? "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200"
                    : "bg-slate-200/70 dark:bg-neutral-700/70 text-slate-600 dark:text-neutral-300"
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

export interface ViewTransitionProps {
  viewKey: string | number;
  direction?: number;
  order?: (string | number)[];
  className?: string;
  containerClassName?: string;
  duration?: number;
  slideOffset?: number;
  variants?: Variants;
  children?: React.ReactNode;
}

export function ViewTransition({
  viewKey,
  direction,
  order,
  className = "",
  containerClassName = "",
  duration = 0.2,
  slideOffset = 18,
  variants,
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

  const activeDirection = direction !== undefined ? direction : history.autoDirection;
  const activeVariants = variants || createSlideVariants(slideOffset);

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
          className={cn("w-full flex flex-col", className)}
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
  render: () => React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export interface MultiViewCardProps<T extends string | number = string> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  views: ViewDefinition<T>[];
  defaultView?: T;
  view?: T;
  direction?: number;
  onViewChange?: (nextView: T) => void;
  size?: "sm" | "md" | "lg";
  activeColor?: "slate" | "blue" | string;
  switcherProps?: Partial<ViewSwitcherProps<T>>;
  headerRight?: React.ReactNode;
  className?: string;
  contentClassName?: string;
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

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm p-6 flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex flex-col min-w-0 flex-1">
          {typeof title === "string" ? (
            <h3 className="text-lg font-bold text-slate-800 dark:text-neutral-100 tracking-tight">
              {title}
            </h3>
          ) : (
            title
          )}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">{subtitle}</p>
            ) : (
              subtitle
            ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {headerRight}
          {switcherOptions.length > 1 && (
            <ViewSwitcher<T>
              value={activeView}
              onChange={handleViewChange}
              options={switcherOptions}
              size={size}
              activeColor={activeColor}
              ariaLabel={typeof title === "string" ? `${title} view mode` : "Card view mode"}
              {...switcherProps}
            />
          )}
        </div>
      </div>

      {/* Content with directional slide transition */}
      <div className="flex-1 w-full flex flex-col">
        <ViewTransition
          viewKey={activeView}
          direction={activeDirection}
          order={viewOrder}
          className={contentClassName || "w-full flex-1 flex flex-col"}
        >
          {activeItem?.render ? activeItem.render() : null}
        </ViewTransition>
      </div>
    </div>
  );
}

export const MultiViewCard = memo(MultiViewCardInner) as typeof MultiViewCardInner;
export default MultiViewCard;
