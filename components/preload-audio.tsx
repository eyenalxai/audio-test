"use client"

import type { TrackAudio } from "@/lib/types/audio"
import { useEffect } from "react"

type PreloadAudioProps = {
	trackAudios: TrackAudio[]
}

export const PreloadAudio = ({ trackAudios }: PreloadAudioProps) => {
	useEffect(() => {
		for (const trackAudio of trackAudios) {
			for (const link of Object.values(trackAudio.audioLinks)) {
				const audio = new Audio(link)
				audio.preload = "auto"
				audio.load()
			}
		}
	}, [trackAudios])

	return null
}
