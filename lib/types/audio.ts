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

type AudioQualities = {
	flac: "flac"
	mp3_320: "320kbps"
	mp3_128: "128kbps"
	mp3_64: "64kbps"
}

export type AudioQualityInternal = keyof AudioQualities
export type AudioQuality = AudioQualities[AudioQualityInternal]

export type AudioQualitySelection = {
	[K in keyof AudioQualities]: { internal: K; display: AudioQualities[K] }
}[keyof AudioQualities]

export type AudioLinks = {
	[K in AudioQualityInternal]: string
}

export type TrackAudio = {
	musicTrack: MusicTrack
	audioLinks: AudioLinks
}
