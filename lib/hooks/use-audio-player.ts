import { AudioPlayerContext } from "@/components/audio-player-context"
import { useContext } from "react"

export const useAudioPlayer = () => {
	const context = useContext(AudioPlayerContext)
	if (context === undefined) {
		throw new Error("useAudioPlayer must be used within a AudioPlayerContext")
	}
	return context
}
