"use client"

import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useMemo, useState } from "react"

export const AudioPlayerContext = createContext<
	| {
			playingUrl: string | undefined
			setPlayingUrl: Dispatch<SetStateAction<string | undefined>>
	  }
	| undefined
>(undefined)

type AudioPlayerProps = {
	src: string | undefined
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
	const [audio] = useMemo(() => (typeof Audio !== "undefined" ? [new Audio()] : [null]), [])

	useEffect(() => {
		if (!src || audio === null) return

		audio.src = src
		audio.play().catch((error) => console.error("Error playing audio:", error))

		return () => {
			audio.pause()
		}
	}, [src, audio])

	return null
}

type AudioPlayerContextProviderProps = {
	children: ReactNode
}

export const AudioPlayerContextProvider = ({ children }: AudioPlayerContextProviderProps) => {
	const [playingUrl, setPlayingUrl] = useState<string | undefined>(undefined)

	return (
		<AudioPlayerContext.Provider value={{ playingUrl, setPlayingUrl }}>
			<AudioPlayer src={playingUrl} />
			{children}
		</AudioPlayerContext.Provider>
	)
}
