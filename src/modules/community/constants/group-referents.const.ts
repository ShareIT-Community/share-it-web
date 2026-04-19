import type { GroupReferent } from '../interfaces/group-referent.interface'

export const GROUP_REFERENTS: GroupReferent[] = [
	{
		id: 'omar-valdez',
		nombre: 'Omar Valdez',
		rol: 'Referente técnico',
		descripcion: ['Con más de 10 años de experiencia, he trabajado desde la construcción de pipelines y analítica hasta la definición de arquitecturas de datos a escala empresarial. Diseño sistemas de datos confiables que permiten tomar mejores decisiones.', 'Actualmente enfocado en plataformas cloud, arquitecturas modernas y estándares que aseguren que los datos no solo existan, sino que puedan ser utilizados con confianza, seguridad y alineación al negocio.'],
		image: '/images/omar.webp',
		redes: [
			{
				label: 'Youtube',
				url: 'https://youtube.com/@soyomarvaldezg',
			},
		],
	},
	{
		id: 'edwin-deza',
		nombre: 'Edwin Deza',
		rol: 'Referente técnico',
		descripcion: ['Ingeniero de software, con 9 años de experiencia y Fundador de OpenLabs. Mis principales habilidades son Frontend, Backend, Gestión de proyectos end to end.',
			'He asumido roles de Frontend Developer, Frontend Architect, Full Stack y Technical Leader de manera efectiva.Me gusta enseñar y disfruto de sacar el potencial de las personas.'],
		image: '/images/Edwin.webp',
		web: 'https://openlablatam.com/',
	},
	{
		id: 'jean-roa',
		nombre: 'Jean Roa',
		rol: 'Referente técnico',
		descripcion: ['Software Developer con más de 10 años en TI y 5+ años desarrollando soluciones. Experiencia en React, Python (Django/Flask), Linux, bash, scripting y automatización de procesos. Actualmente adentrándome en el mundo de la ciberseguridad.'],
		image: '/images/Drak.webp',
		web: 'https://jeanroa.dev',
	},
	{
		id: 'fabri-lennart',
		nombre: 'Fabri Lennart',
		rol: 'Referente técnico',
		descripcion: ['Con más de 3 años construyendo soluciones en entornos dinámicos, me especializo en automatización de workflows, Customer Data Platforms (CDP) y analítica de datos para escalar operaciones de forma inteligente', 'Diseño e implemento pipelines y arquitecturas de datos que unifican fuentes, activan datos en tiempo real y permiten a los equipos tomar decisiones más rápidas y precisas. Mi enfoque está en transformar procesos manuales en sistemas automatizados, conectando herramientas y datos para generar impacto directo en el negocio'],
		image: '/images/fabri.webp',
		web: 'https://fabri-lennart.github.io/landing-page-fabri/',
	},
	{
		id: 'nahuel-gomez',
		nombre: 'Nahuel Gomez',
		rol: 'Referente técnico',
		descripcion: ['SR Backend developer en Mercado Libre con amplia experiencia en el diseño de arquitecturas escalables y la resolución de problemas técnicos complejos en entornos de alta exigencia. ', 
'Me destaco por combinar la excelencia en ingeniería con un rol activo en la formación de talento - habiendo mentorizado a decenas de desarrolladores- y por integrar herramientas de IA de vanguardia para optimizar procesos de desarrollo y productividad'],
		image: '/images/Nahuel.webp',
		web: 'https://nahuelgomez.ar/',
	},
]

export function getGroupReferentsByIds(
	ids?: string[],
): GroupReferent[] {
	if (!ids?.length) return []
	const byId = new Map(GROUP_REFERENTS.map((r) => [r.id, r]))
	return ids
		.map((id) => byId.get(id))
		.filter((r): r is GroupReferent => r !== undefined)
}
