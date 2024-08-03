import { createMultipleTrackAudios } from "@/lib/track-urls"

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
