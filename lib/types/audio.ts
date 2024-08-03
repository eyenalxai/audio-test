export type AudioBaseUrl = `https://${string}`

export type MusicTrack = {
	shortName: string
	fullName: string
}

type AudioQuality = "flac" | "mp3_320" | "mp3_128" | "mp3_64"

export type AudioLinks = {
	[K in AudioQuality]: string
}

export type TrackAudio = {
	musicTrack: MusicTrack
	audioLinks: AudioLinks
}
