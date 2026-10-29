import {
	EVENTS,
	type ShareITEvent,
} from 'src/modules/global/constants/events.const'
import { API_URL } from './groups.service'

interface ApiEvent {
	title: string
	description: string
	type: ShareITEvent['type']
	start_at: string
	end_at: string
	location: string | null
	speaker: string | null
	site: string | null
	media: string | null
	repository: string | null
}

// The API may return naive UTC datetimes; without an offset `new Date()` would read them as local time.
const utc = (iso: string) => (/(Z|[+-]\d\d:\d\d)$/.test(iso) ? iso : `${iso}Z`)

/** Events from the API mapped to the local shape; falls back to constants on any failure. */
export async function fetchEvents(): Promise<ShareITEvent[]> {
	try {
		const res = await fetch(`${API_URL}/events`, {
			signal: AbortSignal.timeout(3000),
		})
		if (!res.ok) return EVENTS
		const data = (await res.json()) as ApiEvent[]
		if (data.length === 0) return EVENTS
		return data.map((e) => ({
			title: e.title,
			description: e.description,
			type: e.type,
			startDate: utc(e.start_at),
			endDate: utc(e.end_at),
			location: e.location ?? undefined,
			speaker: e.speaker ?? undefined,
			// Event cards prepend https:// themselves.
			site: e.site?.replace(/^https?:\/\//, ''),
			media: e.media ?? undefined,
			repository: e.repository,
		}))
	} catch {
		return EVENTS
	}
}
