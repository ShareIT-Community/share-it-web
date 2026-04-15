export interface ShareITEvent {
  title: string
  description: string
  startDate: string // ISO format
  endDate: string // ISO format
  speaker?: string
  site?: string
  media?: string
  repository?: string | null
  type: 'meetup' | 'workshop'
  location?: string // Replace titleMeta
}

export const EVENTS: ShareITEvent[] = [
  // --- Upcoming Events ---
  {
    title: 'MeetUp Presencial Abril',
    description:
      'No todo tiene que quedar en lo virtual. Conocernos en persona es algo que nos gusta hacer, ya que trascender la pantalla es la mejor forma de construir relaciones, tanto personales como profesionales.',
    startDate: '2026-04-11T21:00:00-03:00',
    endDate: '2026-04-12T01:00:00-03:00',
    location: 'CABA, Argentina',
    type: 'meetup',
  },
  {
    title: 'Simulación de Entrevistas',
    description:
      'Se nos viene una nueva simulación de entrevistas de la mano del genio de Ed. En esta oportunidad el entrevistado es alguien que conocen 👀 y que participó en varios proyectos de la comunidad.',
    speaker: 'Edwin Deza',
    site: 'www.linkedin.com/company/deza-dev/',
    startDate: '2026-04-19T18:00:00-03:00',
    endDate: '2026-04-19T20:00:00-03:00',
    location: 'Server Discord - ShareIT',
    type: 'workshop',
  },
  {
    title: 'Community Call Abril',
    description:
      'Sumate a la llamada comunitaria que hacemos cada mes en nuestro server de Discord. No hay tema puntual. La idea es pasar un rato divertido, charlar y conocernos más entre todos.',
    startDate: '2026-04-18T19:00:00-03:00',
    endDate: '2026-04-18T21:00:00-03:00',
    location: 'Server Discord - ShareIT',
    type: 'meetup',
  },

  // --- Past Events / Recordings ---
  {
    title: 'Arquitectura Frontend',
    description:
      'Descubrí cómo modular tu código por dominios 🧱, separar responsabilidades ✂️ y evitar efectos colaterales 😵‍💫 — sin importar si usás Next.js, Angular, Svelte o el framework del futuro 🚀.',
    speaker: 'Edwin Deza',
    site: 'www.linkedin.com/company/deza-dev/',
    media:
      'https://drive.google.com/file/d/11tW7aYxaS8-nCaoPDRn_djMsVYzErJWE/preview',
    repository: 'https://github.com/Edwindeza/Screaming-Modular-Architecture',
    type: 'workshop',
    startDate: '2025-04-25T18:00:00-03:00',
    endDate: '2025-04-25T20:00:00-03:00',
  },
  {
    title: 'Mesa Redonda - ¿Cómo es trabajar en Data?',
    description:
      "Una charla interna para la comunidad 'Share IT' dónde se habló de qué son los datos, qué es el big data, los roles que existen en el área y consejos de búsqueda laboral.",
    speaker: 'Nataya Flores',
    site: 'linktr.ee/natayadev',
    media: 'https://www.youtube.com/embed/0P0118TFkjc',
    repository: 'https://github.com/natayadev/dataengineering-roadmap',
    type: 'workshop',
    startDate: '2025-04-05T18:00:00-03:00',
    endDate: '2025-04-05T20:00:00-03:00',
  },
  {
    title: 'Desarrollo con Inteligencia Artificial',
    description:
      '¿Querés saber cómo incluir a la IA en tu flujo como programador? ​Nuestro querido Nacho, desarrollador backend en Mercado Libre con + 10 años de experiencia en el rubro, te lo cuenta.',
    speaker: 'Nahuel Gómez',
    site: 'www.nahuelgomez.ar',
    media: 'https://www.youtube.com/embed/7p7sk1PXYI8',
    repository: null,
    type: 'workshop',
    startDate: '2025-03-20T18:00:00-03:00',
    endDate: '2025-03-20T20:00:00-03:00',
  },
]
