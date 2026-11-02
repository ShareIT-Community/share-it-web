export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

/** What the user did with the image field: pick a new file or remove the current one. */
export interface ImageChange {
	file?: File
	remove?: boolean
}

/** Fast client-side feedback; the backend stays the authority. Returns an error message or undefined. */
export function validateImage(file: { type: string; size: number }): string | undefined {
	if (!IMAGE_TYPES.includes(file.type)) return 'Formato no permitido. Usá JPG, PNG, WebP o GIF.'
	if (file.size > MAX_IMAGE_BYTES) return 'La imagen supera el límite de 5 MB.'
}

/** Reads the `image` / `remove_image` fields rendered by ImageField. */
export function imageChange(f: FormData): ImageChange {
	const file = f.get('image')
	return { file: file instanceof File && file.size > 0 ? file : undefined, remove: f.get('remove_image') === '1' }
}

/** Event `media` also holds recording embeds; only other URLs are images. */
export const mediaImage = (media?: string | null) =>
	media && !/youtube\.com|youtu\.be|drive\.google\.com/.test(media) ? media : null
