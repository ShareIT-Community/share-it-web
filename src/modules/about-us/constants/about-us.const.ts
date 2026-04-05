import { FaDiscord } from 'react-icons/fa6'
import { GoRocket } from 'react-icons/go'

export const socialLinks = {
  discord: {
    title: 'Discord de la comunidad',
    description: 'Únete a la comunidad',
    url: 'https://discord.gg/AKRcVdjSP8',
    icon: FaDiscord,
  },
  github: {
    title: 'GitHub de la comunidad',
    description: 'Nuestras redes',
    url: 'https://linktr.ee/shareit_tech',
    icon: GoRocket,
  },
}

export const groups = [
  {
    title: '💬 | General',
    description:
      'El punto de encuentro principal. Acá charlamos, compartimos novedades, ideas y reflexiones del día a día. Si querés presentarte o simplemente saludar, ¡este es el lugar!',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '📝  | Revision de CV y Eventos',
    description:
      'Espacio para recibir feedback sobre tu CV o avisar de próximos eventos y encuentros de índole IT.',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '🎲 | Off Topic',
    description:
      'Espacio para charlas fuera del mundo IT. Aquí puedes hablar de series, anime, películas, videojuegos, deportes o cualquier tema divertido y relajado. Ideal para conocernos mejor y compartir gustos personales sin distracciones técnicas.',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '🆘  | Mesa de Ayuda',
    description:
      'Lugar para pedir o brindar ayuda rápida sobre temas técnicos o profesionales.',
    span: 'Recuerda: este grupo no reemplaza el canal “#mesa-de - ayuda” de Discord. Si surge una solución útil, te invitamos a publicarla en dicho canal para que quede registrada y pueda ayudar a otros en el futuro. ',
    spanStyle: true,
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '🚀 | Amplify',
    description: `Amplify es el espacio de la comunidad dedicado a construir y potenciar nuestra presencia profesional en redes. Nace del Content Boost Challenge, donde un grupo de personas se acompañó para desarrollar su marca personal, encontrar su voz y crear contenido con propósito.`,
    span: `En este espacio podés compartir tus publicaciones para recibir feedback, mostrar tu perfil profesional para recibir una revisión, pedir ayuda para planificar contenido y trabajar tu marca personal a tu propio ritmo. También podés aprender de quienes ya vienen creando de forma constante.
No hay presión por publicar todos los días; solo acompañamiento y guía.`,
    spanStyle: false,
    size: 'sm:col-span-2 sm:row-span-1',
  },
]

export interface Admin {
  name: string
  about: string
  role: string
  avatar: string
  github?: string
  linkedin: string
  website?: string
  twitter?: string
  instagram?: string
  description?: string[]
}

export const admins: Admin[] = [
  {
    name: 'Elias Velázquez (Kani)',
    about: 'Fundador de la Comunidad',
    role: 'Data Engineer',
    avatar: '/images/kani-avatar.png',
    github: 'https://github.com/eliasvelazquezdev',
    linkedin: 'https://linkedin.com/in/eliassvelazquez',
    website: 'https://linktr.ee/elingenieroconsciente',
    twitter: 'https://x.com/ingeconsciente',
    description: [
      'Buenas! Soy Elias (Kani)',
      'Arranqué en IT en 2024 como Python/ETL Dev y fui evolucionando hacia Data Engineering, trabajando en la construcción de pipelines desde cero. Actualmente estoy profundizando mi formación para crecer en este rol.',
      'Además de aprender, me gusta enseñar y compartir contenido en redes. También escribo una newsletter (El Ingeniero Consciente) donde mezclo reflexiones personales con recursos sobre Data Engineering y AWS.',
      'Fuera del mundo tech, existen otras cosas que me encantan, como jugar en la PC, ver series, pelis, leer, caminar, la música (toco teclado y produzco desde 2014) y las buenas conversaciones.',
      'Dentro de la comunidad, mi foco es impulsar la proactividad y el crecimiento colectivo. A veces puedo ser directo, pero siempre con la intención de que avancemos.',
      'Si necesitan algo, estoy a un mensaje 👍',
    ],
  },
  {
    name: 'Natalia Quevedo (Brooke)',
    about: 'Admin',
    role: 'UX/UI Designer',
    avatar: '/images/naty-avatar.jpg',
    linkedin: 'https://www.linkedin.com/in/natalia-a-quevedo/',
    description: [
      'Hola! Soy Brooke. Mi camino en IT no ha sido lineal: pasé por QA, ciberseguridad, y diseño UX UI, hoy me dedico de lleno al soporte técnico LLM. Disfruto resolver problemas y guiar a otros, lo que me llevó a ser admin de este espacio y a trabajar actualmente en Solsteinn, gracias a una gran persona que conocí en esta misma comunidad.',
      'Cuando apago la pantalla, mi mundo es 100% analógico. Me encontrás entre pinceles, telas y proyectos manuales; creo que esa creatividad artística es el cable a tierra ideal para mi faceta técnica y social. ¡Sigamos creciendo juntos!',
    ],
  },
]
