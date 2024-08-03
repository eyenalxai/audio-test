"use client"

import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useState } from "react"

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
	useEffect(() => {
		if (!src) return

		const audio = new Audio(src)
		audio.play().catch((error) => console.error("Error playing audio:", error))

		return () => {
			audio.pause()
		}
	}, [src])

	return null
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
