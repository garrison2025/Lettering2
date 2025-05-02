export function SchemaMarkup() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Generador de Lettering",
    url: "https://generador-lettering.pages.dev",
    description: "Herramienta online para crear lettering personalizado y diseños tipográficos",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://generador-lettering.pages.dev/plantillas?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "es-ES",
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  }

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Generador de Lettering",
    description: "Herramienta online para crear lettering personalizado y diseños tipográficos",
    url: "https://generador-lettering.pages.dev",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: "Generador de Lettering",
      url: "https://generador-lettering.pages.dev",
    },
    screenshot: "https://generador-lettering.pages.dev/og-image.png",
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Generador de Lettering",
    url: "https://generador-lettering.pages.dev",
    logo: "https://generador-lettering.pages.dev/logo.png",
    sameAs: [
      "https://twitter.com/generadorlettering",
      "https://facebook.com/generadorlettering",
      "https://instagram.com/generadorlettering",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@generadordelettering.com",
      availableLanguage: "Spanish",
    },
  }

  // 添加面包屑导航结构化数据
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://generador-lettering.pages.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Editor",
        item: "https://generador-lettering.pages.dev/editor",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Plantillas",
        item: "https://generador-lettering.pages.dev/plantillas",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
