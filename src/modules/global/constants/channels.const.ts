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
    description: [
      'La columna vertebral de la comunidad. El punto de encuentro donde se siente la calidad humana de este espacio.',
      'Acá nos conocemos, debatimos, compartimos dilemas reales y nos apoyamos entre todos, más allá del rol técnico de cada uno.',
      '🚀 Antes que la tecnología, están las personas. Pasá, presentate y sé parte de la conversación que mueve a ShareIT.',
    ],
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
    title: 'Data, Cloud, ML & AI',
    order: 3,
    description:
      'Este grupo es para quienes están dando sus primeros pasos en datos, cloud, ML e IA. Compartimos recursos, dudas, experiencias y ejemplos reales, con foco en aprender juntos y entender conceptos que a veces parecen más complejos de lo que realmente son.',
    icon: whatsappGroupIcons.data,
    image: '/images/groups/DATA.jpg',
    color: '[#a78bfa]',
    referrals: ['omar-valdez', 'fabri-lennart', 'nataya-dev', 'franco-antuna', 'elias-velazquez'],
  },
  {
    title: 'Inglés - Práctica y Consultas',
    order: 4,
    description: [
      'El espacio donde los miembros pueden mejorar sus habilidades comunicativas en inglés, mientras comparten recursos, resuelven dudas y se ayudan mutuamente en el proceso de aprendizaje.',
      'No es necesario tener un nivel avanzado para participar. Quienes estén dando sus primeros pasos pueden realizar consultas y pedir orientación, mientras que quienes tengan mayor dominio pueden practicar conversaciones y colaborar con otros miembros.',
    ],
    icon: whatsappGroupIcons.data,
    image: '/images/groups/ENGLISH.jpg',
    color: '[#a78bfa]',
  },
]
