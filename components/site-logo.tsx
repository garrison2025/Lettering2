import { PencilLine } from "lucide-react"
import Link from "next/link"

interface SiteLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function SiteLogo({ size = "md", showText = true }: SiteLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-secondary rounded-full blur-sm transform -translate-x-1 translate-y-1"></div>
        <div className="relative bg-primary rounded-full p-2 text-white">
          <PencilLine className={sizeClasses[size]} />
        </div>
      </div>
      {showText && (
        <div>
          <h1 className={`font-bold text-primary ${textSizeClasses[size]}`}>Generador de Lettering</h1>
          <p className="text-xs text-muted-foreground">Arte tipográfico personalizado</p>
        </div>
      )}
    </Link>
  )
}
