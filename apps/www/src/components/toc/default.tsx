import { cn } from "@/lib/utils";
import { type ComponentProps, useRef } from 'react';
import { mergeRefs } from '../../lib/merge-refs';
import { TocThumb, useTOCItems } from './index';
import * as Primitive from 'fumadocs-core/toc';

export function TOCItems({ ref, className, ...props }: ComponentProps<'div'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();

  if (items.length === 0) return null;

  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className="absolute w-0.5 rounded-e-sm bg-purple-600 dark:bg-purple-400 transition-[top,height] ease-linear"
        style={{
          top: 'var(--fd-top, 0px)',
          height: 'var(--fd-height, 0px)',
        }}
      />
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn('flex flex-col border-s border-fd-foreground/10', className)}
        {...props}
      >
        {items.map((item) => (
          <TOCItem key={item.url} item={item} />
        ))}
      </div>
    </>
  );
}

function TOCItem({ item }: { item: Primitive.TOCItemType }) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        'prose py-1.5 text-sm text-fd-muted-foreground transition-colors wrap-anywhere first:pt-0 last:pb-0 data-[active=true]:text-fd-primary',
        item.depth <= 2 && 'ps-3',
        item.depth === 3 && 'ps-6',
        item.depth >= 4 && 'ps-8',
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}
