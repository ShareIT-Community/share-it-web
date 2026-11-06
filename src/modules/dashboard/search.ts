export function normalizeSearch(value: string): string {
	return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('es').trim()
}
