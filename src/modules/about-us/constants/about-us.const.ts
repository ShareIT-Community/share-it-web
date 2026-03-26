import { FaDiscord } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";

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
    url: 'https://bento.me/shareit',
    icon: GoRocket,
  },
};

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
    span: "Recuerda: este grupo no reemplaza el canal “#mesa-de - ayuda” de Discord. Si surge una solución útil, te invitamos a publicarla en dicho canal para que quede registrada y pueda ayudar a otros en el futuro. ",
    spanStyle: true,
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: "🚀 | Amplify",
    description: `Amplify es el espacio de la comunidad dedicado a construir y potenciar nuestra presencia profesional en redes. Nace del Content Boost Challenge, donde un grupo de personas se acompañó para desarrollar su marca personal, encontrar su voz y crear contenido con propósito.`,
    span: `En este espacio podés compartir tus publicaciones para recibir feedback, mostrar tu perfil profesional para recibir una revisión, pedir ayuda para planificar contenido y trabajar tu marca personal a tu propio ritmo. También podés aprender de quienes ya vienen creando de forma constante.
No hay presión por publicar todos los días; solo acompañamiento y guía.`,
    spanStyle: false,
    size: "sm:col-span-2 sm:row-span-1",
  },
];

export const admins = [
  {
    name: 'Elias Velázquez (Kani)',
    about: 'Fundador de la Comunidad',
    role: 'Data Engineer | Fullstack Developer',
    avatar: '/images/kani-avatar.png',
    github: 'https://github.com/eliasvelazquezdev',
    linkedin: 'https://linkedin.com/in/eliassvelazquez',
    website: 'http://evelazquez.dev/',
    twitter: 'https://x.com/esvdev',
  },
  {
    name: 'Natalia Quevedo (Brooke)',
    about: 'Admin',
    role: 'UX/UI Designer',
    avatar: '/images/naty-avatar.jpg',
    linkedin: 'https://www.linkedin.com/in/natalia-a-quevedo/',
  },
  {
    name: 'Jean Roa (Drak)',
    about: 'Admin',
    role: 'Software Engineer | Cybersecurity',
    avatar: '/images/drak-avatar.png',
    github: 'https://github.com/TheSoftwareWizard',
    linkedin: 'https://www.linkedin.com/in/jeanmra/',
    website: 'https://jeanroa.dev/',
  },
]

