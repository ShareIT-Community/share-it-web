// Función para obtener todas las categorías únicas de los recursos
export function getUniqueCategories(resources: any[]): string[] {
  return [
    ...new Set(resources.map((resource) => resource.data.category)),
  ].sort()
}

// Función para filtrar recursos por categoría
export function filterResourcesByCategory(
  resources: any[],
  category: string | null
) {
  if (!category) return resources
  return resources.filter((resource) => resource.data.category === category)
}
