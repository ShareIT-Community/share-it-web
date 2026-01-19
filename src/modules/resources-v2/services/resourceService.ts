import type { Resource, Category } from '../types/resource'

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Tailwind CSS',
    description:
      'Un framework CSS centrado en utilidades para construir diseños personalizados rápidamente sin salir de tu HTML.',
    thumbnail:
      'https://tailwindcss.com/_next/static/media/twitter-card.83a8080.jpg',
    status: 'Open Source',
    label: 'popular',
    tags: ['CSS', 'Framework', 'Frontend'],
    url: 'https://tailwindcss.com',
    category: 'front-end',
    contributor: {
      name: 'Victoria',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria',
    },
  },
  {
    id: '2',
    title: 'React Icons',
    description:
      'Incluye iconos populares en tus proyectos React fácilmente con react-icons.',
    thumbnail: 'https://react-icons.github.io/react-icons/favicon.ico',
    status: 'Free',
    label: 'popular',
    tags: ['Icons', 'React', 'Library'],
    url: 'https://react-icons.github.io/react-icons/',
    category: 'front-end',
    contributor: {
      name: 'Alex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
  },
  {
    id: '3',
    title: 'Shadcn UI',
    description:
      'Componentes diseñados de forma hermosa que puedes copiar y pegar en tus aplicaciones. Accesible. Personalizable. Código abierto.',
    thumbnail: 'https://ui.shadcn.com/og.jpg',
    status: 'Open Source',
    label: 'new',
    tags: ['Components', 'React', 'Tailwind'],
    url: 'https://ui.shadcn.com',
    category: 'front-end',
    contributor: {
      name: 'Dani',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dani',
    },
  },
  {
    id: '4',
    title: 'Framer Motion',
    description:
      'Una biblioteca de movimiento lista para producción para React. Simple pero potente.',
    thumbnail:
      'https://framerusercontent.com/images/48ha9Z9YidO9X8M9y4V5n8G9A.png',
    status: 'Free',
    label: 'trending',
    tags: ['Animation', 'React', 'Frontend'],
    url: 'https://www.framer.com/motion/',
    category: 'front-end',
    contributor: {
      name: 'Santi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Santi',
    },
  },
  {
    id: '5',
    title: 'Supabase',
    description:
      'La alternativa de código abierto a Firebase. Crea un backend en menos de 2 minutos.',
    thumbnail: 'https://supabase.com/images/share/og-image.png',
    status: 'Open Source',
    label: 'popular',
    tags: ['Database', 'Auth', 'Backend'],
    url: 'https://supabase.com',
    category: 'back-end',
    contributor: {
      name: 'Luis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    },
  },
  {
    id: '6',
    title: 'Figma',
    description:
      'La herramienta colaborativa de diseño de interfaces para equipos que construyen productos juntos.',
    thumbnail:
      'https://www.figma.com/0f6e5c8e76317281f5e278e3488f72c0e816a2d1/static/og-image.png',
    status: 'Paid',
    label: null,
    tags: ['UI', 'UX', 'Design'],
    url: 'https://www.figma.com',
    category: 'ux-ui-design',
    contributor: {
      name: 'Maria',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
  },
  {
    id: '7',
    title: 'Docker',
    description:
      'Docker ayuda a los desarrolladores a construir, compartir y ejecutar aplicaciones modernas rápidamente.',
    thumbnail:
      'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
    status: 'Free',
    label: null,
    tags: ['DevOps', 'Containers', 'Infrastructure'],
    url: 'https://www.docker.com',
    category: 'devops',
    contributor: {
      name: 'Juan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    },
  },
  {
    id: '8',
    title: 'Python',
    description:
      'Python es un lenguaje de programación que te permite trabajar rápidamente e integrar sistemas de manera más efectiva.',
    thumbnail: 'https://www.python.org/static/opengraph-icon-200x200.png',
    status: 'Free',
    label: null,
    tags: ['Programming', 'Data Science', 'Backend'],
    url: 'https://www.python.org',
    category: 'data-science',
    contributor: {
      name: 'Ana',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
  },
  {
    id: '9',
    title: 'Prisma',
    description:
      'ORM de siguiente generación para Node.js y TypeScript. Automatiza migraciones y genera un cliente tipo-seguro.',
    thumbnail: 'https://www.prisma.io/images/og-image.png',
    status: 'Open Source',
    label: 'trending',
    tags: ['ORM', 'Database', 'NodeJS'],
    url: 'https://www.prisma.io',
    category: 'back-end',
    contributor: {
      name: 'Carlos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    },
  },
  {
    id: '10',
    title: 'Astro',
    description:
      'El framework web para construir sitios web orientados al contenido rápidamente.',
    thumbnail: 'https://astro.build/og.png',
    status: 'Open Source',
    label: 'new',
    tags: ['Framework', 'Frontend', 'Performance'],
    url: 'https://astro.build',
    category: 'front-end',
    contributor: {
      name: 'Pedro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    },
  },
]

const MOCK_CATEGORIES: Category[] = [
  { id: 'front-end', name: 'Front-end', icon: 'FiCode', count: 124 },
  { id: 'back-end', name: 'Back-end', icon: 'FiServer', count: 45 },
  { id: 'ux-ui-design', name: 'UX/UI Design', icon: 'FiPenTool', count: 89 },
  { id: 'devops', name: 'DevOps', icon: 'FiSettings', count: 22 },
  { id: 'data-science', name: 'Data Science', icon: 'FiDatabase', count: 18 },
]

export const resourceService = {
  async getAllResources(): Promise<Resource[]> {
    // Simulating API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESOURCES), 500)
    })
  },

  async getCategories(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_CATEGORIES), 300)
    })
  },
}
