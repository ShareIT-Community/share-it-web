import { FaDiscord, FaWhatsapp } from 'react-icons/fa6'
import { GoRocket } from 'react-icons/go'

export const socialLinks = {
  discord: {
    title: 'Discord de la comunidad',
    description: 'Únete a la comunidad',
    url: 'https://discord.gg/bqRttzC4YB',
    icon: FaDiscord,
  },
  github: {
    title: 'Nuestras redes (Linktree)',
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
  linkedin: string
  website?: string
  github?: string
  twitter?: string
  instagram?: string
  description?: string[]
}

export const admins: Admin[] = [
  {
    name: 'Elias Velázquez (Kani)',
    about: 'Fundador de la Comunidad',
    role: 'Data Engineer',
    avatar: '/images/kani.webp',
    linkedin: 'https://linkedin.com/in/eliassvelazquez',
    website: 'https://elingenieroconsciente.com',
    github: 'https://github.com/eliasvelazquezdev',
    description: [
      '¡Buenas! Soy Elias (Kani), Data Engineer. Construyo pipelines de datos y sigo en constante formación.',
      'Además de aprender, me gusta enseñar y por eso comparto contenido en LinkedIn y escribo "El Ingeniero Consciente", mi newsletter donde mezclo reflexiones personales con recursos sobre Data Engineering y AWS.',
      'Fuera del mundo tech me gusta hacer de todo un poco: jugar fichines, ver series, pelis, leer, escribir, caminar y andar en bici, la música (toco teclado y produzco desde 2014), y las buenas conversaciones.',
      'En la comunidad busco impulsar la proactividad y el crecimiento colectivo. ¡A un mensaje para lo que necesiten!',
    ],
  },
  {
    name: 'Natalia Quevedo (Brooke)',
    about: 'Admin',
    role: 'UX/UI Designer',
    avatar: '/images/naty-avatar.webp',
    linkedin: 'https://www.linkedin.com/in/natalia-a-quevedo/',
    description: [
      'Hola! Soy Brooke. Mi camino en IT no ha sido lineal: pasé por QA, ciberseguridad, y diseño UX UI, hoy me dedico de lleno al soporte técnico LLM. Disfruto resolver problemas y guiar a otros, lo que me llevó a ser admin de este espacio y a trabajar actualmente en Solsteinn, gracias a una gran persona que conocí en esta misma comunidad.',
      'Cuando apago la pantalla, mi mundo es 100% analógico. Me encontrás entre pinceles, telas y proyectos manuales; creo que esa creatividad artística es el cable a tierra ideal para mi faceta técnica y social. ¡Sigamos creciendo juntos!',
    ],
  },
  {
    name: 'Nataya Flores',
    about: 'Admin',
    role: 'Data Engineer',
    avatar: '/images/Nataya.jpg',
    linkedin: 'https://www.linkedin.com/in/natayadev',
    description: [
      'Hola, soy Nata (@natayadev). Trabajo como ingeniera de datos y desarrolladora hace seis años, me especializo en Cloud y me estoy preparando para ser bioinformática en la UNQ. También tengo un poco de conocimiento en gobernanza y privacidad de datos, en bioquímica y en marketing. Hincha de Boca, me gusta el mate amargo y el rock en todas sus formas. A veces hago divulgación científica, o eso lo intento.',
    ],
  },
]
