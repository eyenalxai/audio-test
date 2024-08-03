import { createMultipleTrackAudios } from "@/lib/track-urls"
import type { AudioQualitySelection } from "@/lib/types/audio"

const baseUrl = "https://audio-test.fra1.cdn.digitaloceanspaces.com"

export const tracks = [
	{
		shortName: "contact",
		fullName: "Daft Punk - Contact"
	},
	{
		shortName: "doing-it-right",
		fullName: "Daft Punk - Doin' it Right"
	}
]

export const trackAudios = createMultipleTrackAudios(tracks, baseUrl)

export const trackQualityOptions: AudioQualitySelection[] = [
	{
		internal: "flac",
		display: "flac"
	},
	{
		internal: "mp3_320",
		display: "320kbps"
	},
	{
		internal: "mp3_128",
		display: "128kbps"
	},
	{
		internal: "mp3_64",
		display: "64kbps"
	}
]
