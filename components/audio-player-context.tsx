"use client"

import { trackAudios, trackQualityOptions } from "@/lib/tracks"
import type { AudioQualityInternal, ShortName } from "@/lib/types/audio"
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useMemo, useState } from "react"

export const AudioPlayerContext = createContext<
	| {
			currentlyPlayingShortName: ShortName | undefined
			setCurrentlyPlayingShortName: Dispatch<SetStateAction<ShortName | undefined>>
			currentlyPlayingQuality: AudioQualityInternal | undefined
			setCurrentlyPlayingQuality: Dispatch<SetStateAction<AudioQualityInternal | undefined>>
			keepPlaybackTime: boolean
			setKeepPlaybackTime: Dispatch<SetStateAction<boolean>>
	  }
	| undefined
>(undefined)

type AudioPlayerProps = {
	currentlyPlayingShortName: ShortName | undefined
	setCurrentlyPlayingShortName: Dispatch<SetStateAction<ShortName | undefined>>
	currentlyPlayingQuality: AudioQualityInternal | undefined
	setCurrentlyPlayingQuality: Dispatch<SetStateAction<AudioQualityInternal | undefined>>
	keepPlaybackTime: boolean
}

const AudioPlayer = ({
	currentlyPlayingShortName,
	setCurrentlyPlayingShortName,
	currentlyPlayingQuality,
	setCurrentlyPlayingQuality,
	keepPlaybackTime
}: AudioPlayerProps) => {
	const audios: Record<AudioQualityInternal, HTMLAudioElement> | null = useMemo(() => {
		if (typeof Audio !== "undefined") {
			return trackQualityOptions.reduce(
				(acc, option) => {
					acc[option.internal] = new Audio()
					return acc
				},
				{} as Record<AudioQualityInternal, HTMLAudioElement>
			)
		}
		return null
	}, [])

	useEffect(() => {
		if (!currentlyPlayingShortName || !audios) return

		const trackAudioLinks = trackAudios.find(
			(track) => track.musicTrack.shortName === currentlyPlayingShortName
		)?.audioLinks

		if (trackAudioLinks) {
			for (const [quality, audio] of Object.entries(audios)) {
				audio.src = trackAudioLinks[quality as AudioQualityInternal]
				audio.play().catch((error) => console.error(`${quality} Playback failed:`, error))
				audio.onended = () => {
					setCurrentlyPlayingShortName(undefined)
					setCurrentlyPlayingQuality(undefined)
				}
			}
		}

		return () => {
			for (const audio of Object.values(audios)) {
				audio.pause()
				audio.src = ""
				audio.onended = null
			}
		}
	}, [audios, currentlyPlayingShortName, setCurrentlyPlayingShortName, setCurrentlyPlayingQuality])

	useEffect(() => {
		if (audios) {
			for (const [quality, audio] of Object.entries(audios)) {
				audio.muted = quality !== currentlyPlayingQuality
				if (!keepPlaybackTime) {
					audio.currentTime = 0
				}
			}
		}
	}, [audios, currentlyPlayingQuality, keepPlaybackTime])

	return null
}

type AudioPlayerContextProviderProps = {
	children: ReactNode
}

export const AudioPlayerContextProvider = ({ children }: AudioPlayerContextProviderProps) => {
	const [currentlyPlayingShortName, setCurrentlyPlayingShortName] = useState<ShortName | undefined>(undefined)
	const [currentlyPlayingQuality, setCurrentlyPlayingQuality] = useState<AudioQualityInternal | undefined>(undefined)
	const [keepPlaybackTime, setKeepPlaybackTime] = useState(false)

	return (
		<AudioPlayerContext.Provider
			value={{
				currentlyPlayingShortName,
				setCurrentlyPlayingShortName,
				currentlyPlayingQuality,
				setCurrentlyPlayingQuality,
				keepPlaybackTime,
				setKeepPlaybackTime
			}}
		>
			<AudioPlayer
				currentlyPlayingShortName={currentlyPlayingShortName}
				setCurrentlyPlayingShortName={setCurrentlyPlayingShortName}
				currentlyPlayingQuality={currentlyPlayingQuality}
				setCurrentlyPlayingQuality={setCurrentlyPlayingQuality}
				keepPlaybackTime={keepPlaybackTime}
			/>
			{children}
		</AudioPlayerContext.Provider>
	)
}
