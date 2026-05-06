import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'

export interface WhatsappGroup {
  title: string
  order: number
  description: string | string[]
  icon: string
  image: string
  color?: string
  tags?: string[]
  /** IDs de `GROUP_REFERENTS` — opcional */
  referrals?: string[]
}

export const whatsappGroups: WhatsappGroup[] = [
  {
    title: 'General',
    order: 1,
    description:
      'El punto de encuentro principal. Acá charlamos, compartimos novedades, ideas y reflexiones del día a día. Si querés presentarte o simplemente saludar, ¡este es el lugar!',
    icon: whatsappGroupIcons.data,
    image: '/images/groups/GENERAL.jpg',
    color: '[#a78bfa]',
  },
  {
    title: 'Amplify',
    order: 2,
    description:
      'Amplify es el espacio de la comunidad dedicado a construir y potenciar nuestra presencia profesional en redes. Nace del Content Boost Challenge, donde un grupo de personas se acompañó para desarrollar su marca personal, encontrar su voz y crear contenido con propósito.',
    icon: whatsappGroupIcons.data,
    image: '/images/groups/AMPLIFY.jpg',
    color: '[#a78bfa]',
    referrals: ['brigitte'],
  },
  {
    title: 'Desarrollo Web',
    order: 3,
    description:
      'Grupo pensado para compartir conocimientos, resolver dudas y conversar sobre buenas prácticas, herramientas y experiencias reales del día a día relacionadas a desarrollo web. La idea es mantener un espacio colaborativo y profesional, pero también cercano, donde todos puedan aportar y aprender en conjunto.',
    icon: whatsappGroupIcons.data,
    image: '/images/groups/WEBDEVELOPMENT.jpg',
    color: '[#a78bfa]',
    referrals: ['edwin-deza', 'jean-roa', 'nahuel-gomez'],
  },
  {
    title: 'Data, Cloud, ML & AI',
    order: 4,
    description:
      'Este grupo es para quienes están dando sus primeros pasos en datos, cloud, ML e IA. Compartimos recursos, dudas, experiencias y ejemplos reales, con foco en aprender juntos y entender conceptos que a veces parecen más complejos de lo que realmente son.',
    icon: whatsappGroupIcons.data,
    image: '/images/groups/DATA.jpg',
    color: '[#a78bfa]',
    referrals: ['omar-valdez', 'fabri-lennart', 'nataya-dev', 'franco-antuna'],
  },
]
