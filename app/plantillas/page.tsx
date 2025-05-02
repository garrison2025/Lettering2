"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PencilLine } from "lucide-react"
import { InteractiveLetteringPreview } from "@/components/interactive-lettering-preview"
import { TemplatesFilter } from "@/components/templates-filter"
import { motion, AnimatePresence } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Definición de fuentes para el lettering
const FONTS = [
  { id: "dancing-script", name: "Caligrafía Elegante", family: "'Dancing Script', cursive" },
  { id: "pacifico", name: "Script Moderno", family: "'Pacifico', cursive" },
  { id: "satisfy", name: "Caligrafía Fluida", family: "'Satisfy', cursive" },
  { id: "sacramento", name: "Lettering Fino", family: "'Sacramento', cursive" },
  { id: "great-vibes", name: "Caligrafía Clásica", family: "'Great Vibes', cursive" },
  { id: "amatic-sc", name: "Letras Manuales", family: "'Amatic SC', cursive" },
  { id: "lobster", name: "Lettering Bold", family: "'Lobster', cursive" },
  { id: "caveat", name: "Escritura Natural", family: "'Caveat', cursive" },
  { id: "kaushan-script", name: "Script Dinámico", family: "'Kaushan Script', cursive" },
  { id: "permanent-marker", name: "Marcador", family: "'Permanent Marker', cursive" },
]

// Definición de categorías de plantillas
const CATEGORIAS = [
  { id: "ocasiones", nombre: "Ocasiones Especiales" },
  { id: "frases", nombre: "Frases Inspiradoras" },
  { id: "festividades", nombre: "Festividades" },
  { id: "negocios", nombre: "Negocios" },
]

// Definición de plantillas
const PLANTILLAS = [
  {
    id: "boda",
    categoria: "ocasiones",
    nombre: "Invitación de Boda",
    texto: "Juan & María\n12 de Junio 2023",
    estilo: "dancing-script",
    color: "#5B4FBE",
    fontSize: 36,
    letterSpacing: 1,
    lineHeight: 1.8,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    id: "cumpleanos",
    categoria: "ocasiones",
    nombre: "Feliz Cumpleaños",
    texto: "¡Feliz Cumpleaños!",
    estilo: "pacifico",
    color: "#FF6B6B",
    fontSize: 38,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 5,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
  },
  {
    id: "graduacion",
    categoria: "ocasiones",
    nombre: "Graduación",
    texto: "¡Felicidades\nGraduado 2023!",
    estilo: "great-vibes",
    color: "#4A4A4A",
    fontSize: 34,
    letterSpacing: 1,
    lineHeight: 1.6,
    alignment: "center",
    outline: true,
    outlineColor: "#FFD93D",
    outlineWidth: 1,
  },
  {
    id: "motivacion1",
    categoria: "frases",
    nombre: "Motivación Diaria",
    texto: "Nunca te rindas",
    estilo: "permanent-marker",
    color: "#E53935",
    fontSize: 36,
    letterSpacing: 1,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowBlur: 3,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
  },
  {
    id: "motivacion2",
    categoria: "frases",
    nombre: "Éxito",
    texto: "El éxito es la suma de pequeños esfuerzos",
    estilo: "satisfy",
    color: "#1E88E5",
    fontSize: 32,
    letterSpacing: 0,
    lineHeight: 1.5,
    alignment: "center",
  },
  {
    id: "amor",
    categoria: "frases",
    nombre: "Amor",
    texto: "Ama y sé feliz",
    estilo: "sacramento",
    color: "#FF6B6B",
    fontSize: 40,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 4,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
  },
  {
    id: "navidad",
    categoria: "festividades",
    nombre: "Navidad",
    texto: "¡Feliz Navidad\ny Próspero Año Nuevo!",
    estilo: "lobster",
    color: "#43A047",
    fontSize: 34,
    letterSpacing: 1,
    lineHeight: 1.6,
    alignment: "center",
    shadow: true,
    shadowColor: "#FF6B6B",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    id: "annonuevo",
    categoria: "festividades",
    nombre: "Año Nuevo",
    texto: "¡Feliz 2023!",
    estilo: "kaushan-script",
    color: "#FFD93D",
    fontSize: 42,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "#4A4A4A",
    shadowBlur: 6,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    id: "halloween",
    categoria: "festividades",
    nombre: "Halloween",
    texto: "Noche de Terror",
    estilo: "amatic-sc",
    color: "#8E24AA",
    fontSize: 40,
    letterSpacing: 3,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "#000000",
    shadowBlur: 8,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
  },
  {
    id: "logo",
    categoria: "negocios",
    nombre: "Logo Empresa",
    texto: "Mi Empresa",
    estilo: "caveat",
    color: "#5B4FBE",
    fontSize: 38,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    outline: true,
    outlineColor: "#FFFFFF",
    outlineWidth: 2,
  },
  {
    id: "promocion",
    categoria: "negocios",
    nombre: "Promoción",
    texto: "¡OFERTA\nESPECIAL!",
    estilo: "permanent-marker",
    color: "#E53935",
    fontSize: 36,
    letterSpacing: 1,
    lineHeight: 1.4,
    alignment: "center",
    rotation: -5,
    shadow: true,
    shadowColor: "#000000",
    shadowBlur: 2,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    outline: true,
    outlineColor: "#FFD93D",
    outlineWidth: 3,
  },
  {
    id: "menu",
    categoria: "negocios",
    nombre: "Menú Restaurante",
    texto: "Nuestro Menú",
    estilo: "great-vibes",
    color: "#4A4A4A",
    fontSize: 36,
    letterSpacing: 1,
    lineHeight: 1.5,
    alignment: "center",
  },
]

export default function PlantillasPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredTemplates, setFilteredTemplates] = useState(PLANTILLAS)
  const [searchQuery, setSearchQuery] = useState("")

  // Cargar fuentes de Google
  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Filtrar plantillas por categoría y búsqueda
  useEffect(() => {
    let filtered = PLANTILLAS

    if (activeCategory !== "all") {
      filtered = filtered.filter((template) => template.categoria === activeCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (template) => template.nombre.toLowerCase().includes(query) || template.texto.toLowerCase().includes(query),
      )
    }

    setFilteredTemplates(filtered)
  }, [activeCategory, searchQuery])

  // Manejar cambio de categoría
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Plantillas de Lettering
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Elige entre nuestra colección de plantillas prediseñadas para diferentes ocasiones y personalízalas a tu
              gusto.
            </motion.p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar plantillas..."
              className="w-full p-3 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TemplatesFilter
            categories={CATEGORIAS}
            onFilterChange={handleCategoryChange}
            activeCategory={activeCategory}
          />

          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredTemplates.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((plantilla) => {
                      const font = FONTS.find((f) => f.id === plantilla.estilo) || FONTS[0]
                      return (
                        <motion.div
                          key={plantilla.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <InteractiveLetteringPreview template={plantilla} fontFamily={font.family} />
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No se encontraron plantillas que coincidan con tu búsqueda.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setActiveCategory("all")
                        setSearchQuery("")
                      }}
                    >
                      Ver todas las plantillas
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Suspense>

          <div className="mt-12 text-center">
            <p className="text-lg mb-4">¿No encuentras lo que buscas?</p>
            <Button size="lg" asChild>
              <Link href="/editor" className="gap-2">
                <PencilLine className="h-5 w-5" />
                Crear diseño personalizado
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
