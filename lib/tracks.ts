import { createMultipleTrackAudios } from "@/lib/track-urls"
import type { AudioBaseUrl, AudioQualitySelection } from "@/lib/types/audio"

const baseUrl = process.env.NEXT_PUBLIC_AUDIO_BASE_URL as AudioBaseUrl | undefined

if (!baseUrl) throw new Error("NEXT_PUBLIC_AUDIO_BASE_URL is not set")

export const tracks = [
	{
		shortName: "contact",
		fullName: "Daft Punk - Contact"
	},
	{
		shortName: "angel",
		fullName: "Massive Attack - Angel"
	},
	{
		shortName: "symphony-9",
		fullName: "Symphony No. 9 (Beethoven)"
	},
	{
		shortName: "less-sex",
		fullName: "Daughters – Less Sex"
	},
	{
		shortName: "doing-it-right",
		fullName: "Daft Punk - Doin' it Right"
	},

	{
		shortName: "takyon",
		fullName: "Death Grips - Takyon (Death Yon)"
	},
	{
		shortName: "the-less-i-know-the-better",
		fullName: "Tame Impala - The Less I Know The Better"
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
