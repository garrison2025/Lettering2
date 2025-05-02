"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // 确定图片格式，优先使用WebP
  const imgSrc = src || "/placeholder.svg?width=40&height=40"

  // 计算合适的sizes属性以优化响应式加载
  const sizes = `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.min(width, 1200)}px`

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("duration-500 ease-in-out", isLoading ? "scale-105 blur-sm" : "scale-100 blur-0")}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Cargando...</span>
        </div>
      )}
    </div>
  )
}
