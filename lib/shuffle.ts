import type { AudioLinks, TrackAudio } from "@/lib/types/audio"

const shuffle = ([...arr]) => {
	let m = arr.length
	while (m) {
		const i = Math.floor(Math.random() * m--)
		;[arr[m], arr[i]] = [arr[i], arr[m]]
	}
	return arr
}

export const shuffleAudioLinks = (trackAudios: TrackAudio[]) =>
	trackAudios.map((trackAudio) => ({
		...trackAudio,
		audioLinks: Object.fromEntries(shuffle(Object.entries(trackAudio.audioLinks))) as AudioLinks
	}))
