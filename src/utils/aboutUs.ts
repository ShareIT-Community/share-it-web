import GithubIcon from '@icons/GithubIcon.astro'
import WhatsappIcon from '@icons/WhatsappIcon.astro'

export const socialLinks = [
  {
    title: 'GitHub de la comunidad',
    description: 'Repositorio de GitHub',
    url: 'https://github.com/eliasvelazquezdev/share-it-resources',
    icon: GithubIcon,
  },
  {
    title: 'WhatsApp de la comunidad',
    description: 'Únete a la comunidad',
    url: 'https://chat.whatsapp.com/LlbgQpQ7EB1Hy5Rq4WhJd6',
    icon: WhatsappIcon,
  },
]

export const groups = [
  {
    title: '🗣️ General:',
    description:
      'El grupo donde nos presentamos y hablamos de cualquier tema que nos interese.',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '🌎📝 Networking y CV:',
    description:
      'El espacio ideal para que compartas tus redes sociales y conozcas a otros profesionales de la industria. También vas a poder solicitar una revisión de tu CV para poder mejorarlo y aumentar tus probabilidades de encontrar ese ansiado empleo.',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '📚🆘 Recursos y Ayuda:',
    description:
      'En este grupo compartimos aquellos recursos (videos, blog posts, enlaces, etc) que nos permitan mejorar nuestros conocimientos y resolver aquellos problemas cuando Google, GPT o StackOverflow no tienen la respuesta.',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '💼🤝🏻 Ofertas Laborales:',
    description:
      'Tal como el nombre lo indica, este grupo es utilizado para compartir ofertas laborales orientadas al sector tecnológico. ¿Y si tu próximo destino laboral está en SHARE IT?',
    size: 'sm:col-span-1 sm:row-span-1',
  },
  {
    title: '☕💧 La Llorería:',
    description:
      'A veces necesitamos hacer catarsis de ese compañero que no nos escucha en el trabajo, de aquel profesor que pide cosas imposibles o cuando te ghostean en un proceso laboral. ¡Acá tenés el lugar indicado para descargarte!',
    size: 'sm:col-span-2 sm:row-span-2',
  },
]

export const admins = [
  {
    name: 'Elias Velázquez (Kani)',
    about: 'Fundador de la Comunidad',
    role: 'Data Engineer',
    avatar: '/images/kani-avatar.jpg',
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
    name: 'Eros Benitez (Shini)',
    about: 'Admin',
    role: 'Diseñador Multimedia',
    avatar: '/images/eros-avatar.jpg',
    github: 'https://github.com/Shinigamy19',
    linkedin: 'https://www.linkedin.com/in/eros-benitez/',
    website: 'https://linktr.ee/shinigamy19',
  },
  {
    name: 'Jean Roa (Drak)',
    about: 'Admin',
    role: 'Software Developer',
    avatar: '/images/drak-avatar.jpeg',
    github: 'https://github.com/jeanroadev',
    linkedin: 'https://www.linkedin.com/in/jeanmra/',
    website: 'https://jeanroa.dev/',
  },
  {
    name: 'Nicolás Cruz (Nico)',
    about: 'Admin',
    role: 'Fullstack Developer',
    avatar: '/images/nico-avatar.jpg',
    github: 'https://github.com/NicoFJCruz',
    linkedin: 'https://www.linkedin.com/in/nicofj-cruz',
    website: 'http://nicolascruz.jovinet.com/',
    twitter: 'https://x.com/NicoCruzDev',
  },
]
