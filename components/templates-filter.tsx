"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface TemplatesFilterProps {
  categories: { id: string; nombre: string }[]
  onFilterChange: (categoryId: string) => void
  activeCategory?: string
}

export function TemplatesFilter({ categories, onFilterChange, activeCategory = "all" }: TemplatesFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          key="all"
          variant={activeCategory === "all" ? "default" : "outline"}
          className="relative"
          onClick={() => onFilterChange("all")}
        >
          {activeCategory === "all" && (
            <motion.div
              className="absolute inset-0 bg-primary opacity-10 rounded-md"
              layoutId="activeCategory"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span className="relative z-10">Todas</span>
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="relative"
            onClick={() => onFilterChange(category.id)}
          >
            {activeCategory === category.id && (
              <motion.div
                className="absolute inset-0 bg-primary opacity-10 rounded-md"
                layoutId="activeCategory"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category.nombre}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
