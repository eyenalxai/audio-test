export type AudioBaseUrl = `https://${string}`

type TrackDetails = {
	contact: "Daft Punk - Contact"
	"doing-it-right": "Daft Punk - Doin' it Right"
}

type ShortName = keyof TrackDetails
type FullName = TrackDetails[keyof TrackDetails]

export type MusicTrack = {
	[K in keyof TrackDetails]: { shortName: K; fullName: TrackDetails[K] }
}[keyof TrackDetails]

type AudioQuality = "flac" | "mp3_320" | "mp3_128" | "mp3_64"

export type AudioLinks = {
	[K in AudioQuality]: string
}

export type TrackAudio = {
	musicTrack: MusicTrack
	audioLinks: AudioLinks
}
