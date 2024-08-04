"use client"

import { trackAudios } from "@/lib/tracks"
import type { AudioQualityInternal, ShortName } from "@/lib/types/audio"
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useMemo, useState } from "react"

export const AudioPlayerContext = createContext<
	| {
			currentlyPlayingShortName: ShortName | undefined
			setCurrentlyPlayingShortName: Dispatch<SetStateAction<ShortName | undefined>>
			currentlyPlayingQuality: AudioQualityInternal | undefined
			setCurrentlyPlayingQuality: Dispatch<SetStateAction<AudioQualityInternal | undefined>>
	  }
	| undefined
>(undefined)

type AudioPlayerProps = {
	currentlyPlayingShortName: ShortName | undefined
	currentlyPlayingQuality: AudioQualityInternal | undefined
}

const AudioPlayer = ({ currentlyPlayingShortName, currentlyPlayingQuality }: AudioPlayerProps) => {
	const audios: Record<AudioQualityInternal, HTMLAudioElement> | null = useMemo(
		() =>
			typeof Audio !== "undefined"
				? {
						flac: new Audio(),
						mp3_320: new Audio(),
						mp3_128: new Audio(),
						mp3_64: new Audio()
					}
				: null,
		[]
	)

	useEffect(() => {
		if (!currentlyPlayingShortName || !currentlyPlayingQuality || !audios) return

		const trackAudioLinks = trackAudios.find(
			(track) => track.musicTrack.shortName === currentlyPlayingShortName
		)?.audioLinks

		if (trackAudioLinks) {
			for (const [quality, audio] of Object.entries(audios)) {
				audio.src = trackAudioLinks[quality as AudioQualityInternal]
				audio.muted = quality !== currentlyPlayingQuality

				if (quality === currentlyPlayingQuality) {
					audio.play().catch((error) => console.error("Playback failed:", error))
				}
			}
		}

		return () => {
			for (const audio of Object.values(audios)) {
				audio.pause()
				audio.src = ""
			}
		}
	}, [audios, currentlyPlayingShortName, currentlyPlayingQuality])

	return null
}

type AudioPlayerContextProviderProps = {
	children: ReactNode
}

export const AudioPlayerContextProvider = ({ children }: AudioPlayerContextProviderProps) => {
	const [currentlyPlayingShortName, setCurrentlyPlayingShortName] = useState<ShortName | undefined>(undefined)
	const [currentlyPlayingQuality, setCurrentlyPlayingQuality] = useState<AudioQualityInternal | undefined>(undefined)

	return (
		<AudioPlayerContext.Provider
			value={{
				currentlyPlayingShortName,
				setCurrentlyPlayingShortName,
				currentlyPlayingQuality,
				setCurrentlyPlayingQuality
			}}
		>
			<AudioPlayer
				currentlyPlayingShortName={currentlyPlayingShortName}
				currentlyPlayingQuality={currentlyPlayingQuality}
			/>
			{children}
		</AudioPlayerContext.Provider>
	)
}
