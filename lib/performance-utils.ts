import React from "react"

// 节流函数，提高性能
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let inThrottle: boolean
  let lastResult: ReturnType<T>

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    if (!inThrottle) {
      lastResult = func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
    return lastResult
  }
}

// 防抖函数，用于输入处理
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// 懒加载辅助函数
export const lazyLoad = (importFn: () => Promise<any>, options?: { ssr?: boolean }) => {
  return (props: any) => {
    const Component = React.lazy(importFn)
    return (
      <React.Suspense fallback={<div className="h-32 w-full flex items-center justify-center">Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    )
  }
}

// 图像优化函数
export const getOptimizedImageUrl = (url: string, width: number, quality = 80) => {
  if (!url) return "/placeholder.svg"
  if (url.startsWith("/")) return url

  // 如果是外部URL，可以使用图像优化服务
  try {
    const parsedUrl = new URL(url)
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp`
  } catch (e) {
    return url
  }
}

// 添加资源提示
export const addResourceHints = () => {
  if (typeof window === "undefined") return

  // 预连接到常用域名
  const domains = ["https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://images.weserv.nl"]

  domains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = domain
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)

    const dnsPrefetch = document.createElement("link")
    dnsPrefetch.rel = "dns-prefetch"
    dnsPrefetch.href = domain
    document.head.appendChild(dnsPrefetch)
  })
}

// 优化渲染性能
export const optimizeRenderPerformance = (callback: () => void) => {
  if (typeof window === "undefined") return callback()

  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => callback())
  } else {
    setTimeout(callback, 1)
  }
}
