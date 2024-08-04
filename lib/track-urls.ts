import type { AudioBaseUrl, AudioLinks, MusicTrack, TrackAudio } from "@/lib/types/audio"

const generateAudioLinks = (baseUrl: AudioBaseUrl, shortName: string): AudioLinks => ({
	flac: `${baseUrl}/${shortName}/${shortName}.flac`,
	mp3_320: `${baseUrl}/${shortName}/${shortName}-320.mp3`,
	mp3_128: `${baseUrl}/${shortName}/${shortName}-128.mp3`,
	mp3_96: `${baseUrl}/${shortName}/${shortName}-96.mp3`,
	mp3_64: `${baseUrl}/${shortName}/${shortName}-64.mp3`
})

export const createTrackAudio = (musicTrack: MusicTrack, baseUrl: AudioBaseUrl): TrackAudio => ({
	musicTrack,
	audioLinks: generateAudioLinks(baseUrl, musicTrack.shortName)
})

export const createMultipleTrackAudios = (musicTracks: MusicTrack[], baseUrl: AudioBaseUrl): TrackAudio[] =>
	musicTracks.map((track) => createTrackAudio(track, baseUrl))
