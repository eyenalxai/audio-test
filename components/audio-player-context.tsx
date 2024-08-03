"use client"

import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useRef, useState } from "react"

export const AudioPlayerContext = createContext<
	| {
			playingUrl: string | null
			setPlayingUrl: Dispatch<SetStateAction<string | null>>
	  }
	| undefined
>(undefined)

type AudioPlayerProps = {
	src: string | null
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		if (src === null && audioRef.current) {
			audioRef.current.pause()
			return
		}
		if (src && audioRef.current) {
			audioRef.current.src = src
			audioRef.current.play().catch((error) => console.error("Error playing audio:", error))
			return
		}
	}, [src])

	return (
		// biome-ignore lint/a11y/useMediaCaption: <explanation>
		<audio ref={audioRef} controls style={{ display: "none" }}>
			Your browser does not support the audio element.
		</audio>
	)
}

type AudioPlayerContextProviderProps = {
	children: ReactNode
}

export const AudioPlayerContextProvider = ({ children }: AudioPlayerContextProviderProps) => {
	const [playingUrl, setPlayingUrl] = useState<string | null>(null)

	return (
		<AudioPlayerContext.Provider value={{ playingUrl, setPlayingUrl }}>
			<AudioPlayer src={playingUrl} />
			{children}
		</AudioPlayerContext.Provider>
	)
}
