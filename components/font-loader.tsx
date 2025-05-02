"use client"

import { useEffect } from "react"

export function FontLoader() {
  useEffect(() => {
    // 使用字体显示交换和预加载策略
    const fontLink = document.createElement("link")
    fontLink.href =
      "https://fonts.googleapis.com/css2?display=swap&family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap"
    fontLink.rel = "stylesheet"
    fontLink.media = "print"
    fontLink.onload = () => {
      fontLink.media = "all"
    }

    // 添加预连接以减少DNS查询时间
    const preconnectGoogle = document.createElement("link")
    preconnectGoogle.rel = "preconnect"
    preconnectGoogle.href = "https://fonts.googleapis.com"

    const preconnectGstatic = document.createElement("link")
    preconnectGstatic.rel = "preconnect"
    preconnectGstatic.href = "https://fonts.gstatic.com"
    preconnectGstatic.crossOrigin = "anonymous"

    document.head.appendChild(preconnectGoogle)
    document.head.appendChild(preconnectGstatic)
    document.head.appendChild(fontLink)

    return () => {
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink)
      }
      if (document.head.contains(preconnectGoogle)) {
        document.head.removeChild(preconnectGoogle)
      }
      if (document.head.contains(preconnectGstatic)) {
        document.head.removeChild(preconnectGstatic)
      }
    }
  }, [])

  return null
}
