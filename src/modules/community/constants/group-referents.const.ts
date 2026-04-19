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
		id: 'fabri-lennart',
		nombre: 'Fabri Lennart',
		rol: 'Referente técnico',
		descripcion: ['Con más de 3 años construyendo soluciones en entornos dinámicos, me especializo en automatización de workflows, Customer Data Platforms (CDP) y analítica de datos para escalar operaciones de forma inteligente', 'Diseño e implemento pipelines y arquitecturas de datos que unifican fuentes, activan datos en tiempo real y permiten a los equipos tomar decisiones más rápidas y precisas. Mi enfoque está en transformar procesos manuales en sistemas automatizados, conectando herramientas y datos para generar impacto directo en el negocio'],
		image: '/images/fabri.webp',
		redes: [
			{
				label: 'GitHub',
				url: 'https://fabri-lennart.github.io/landing-page-fabri/',
			},
		],
		web: 'https://fabri-lennart.github.io/landing-page-fabri/',
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
