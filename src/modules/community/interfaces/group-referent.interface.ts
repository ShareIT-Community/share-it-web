/** Red social u otro enlace del referente (LinkedIn, GitHub, etc.) */
export interface GroupReferentSocial {
	label: string
	url: string
}

/** Persona referida asociada a uno o más grupos de WhatsApp */
export interface GroupReferent {
	id: string
	nombre: string
	rol: string
	descripcion: string | string[]
	image: string
	redes?: GroupReferentSocial[]
	/** Sitio web personal o portfolio (opcional) */
	web?: string
}
