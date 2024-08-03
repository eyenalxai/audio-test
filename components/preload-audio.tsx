"use client"

import type { TrackAudio } from "@/lib/track-urls"
import { useEffect } from "react"

type PreloadAudioProps = {
	trackAudios: TrackAudio[]
}

export const PreloadAudio = ({ trackAudios }: PreloadAudioProps) => {
	useEffect(() => {
		const audios: {
			audio: HTMLAudioElement
			onLoad: () => void
		}[] = []

		for (const trackAudio of trackAudios) {
			for (const link of Object.values(trackAudio.audioLinks)) {
				const audio = new Audio(link)
				audio.preload = "auto"
				audio.load()

				const onLoad = () => {
					console.log(`${link} is loaded and can play through.`)
				}

				audio.addEventListener("canplaythrough", onLoad)
				audios.push({ audio, onLoad })
			}
		}

		return () => {
			for (const { audio, onLoad } of audios) {
				audio.removeEventListener("canplaythrough", onLoad)
			}
		}
	}, [trackAudios])

	return null
}
