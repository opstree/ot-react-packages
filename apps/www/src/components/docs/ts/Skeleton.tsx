import { cn } from '@workspace/ui/lib/utils'
import React from 'react'

interface SkeletonProps {
  variant?: "text" | "rectangular" | "circular"
  width?: string | number
  height?: string | number
  className?: string
}

const Skeleton = ({
  variant = "text",
  width = '100%',
  height = '16px',
  className = ''
}: SkeletonProps) => {
  const variantStyles = {
    text: 'rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full',
  }

  const selectedVariant = variantStyles[variant] || variantStyles.text
  const circularHeight = variant === 'circular' ? width : height

  return (
    <div
      className={cn(selectedVariant, className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof circularHeight === 'number' ? `${circularHeight}px` : circularHeight,
      }}
    />
  )
}

export default Skeleton