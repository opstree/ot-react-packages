import React from 'react'

interface SkeletonProps {
  variant?: "text" | "rectangular" | "circular",
  width?: string | number,
  height?: string | number,
  className?: string
}

const Skeleton = ({
  variant = "text",
  width = '100%',
  height = '16px',
  className = ''
}: SkeletonProps) => {
  const baseStyles = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse'

  const variantStyles = {
    text: 'rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full',
  }

  const selectedVariant = variantStyles[variant] || variantStyles.text

  const circularHeight = variant === 'circular' ? width : height

  return (
    <div
      className={`${baseStyles} ${selectedVariant} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof circularHeight === 'number' ? `${circularHeight}px` : circularHeight,
      }}
    />
  )
}

export default Skeleton