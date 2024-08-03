import type { tracks } from "@/lib/tracks"

export type AudioBaseUrl = `https://${string}`

export type MusicTrack = (typeof tracks)[number]

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
