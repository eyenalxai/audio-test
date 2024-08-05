import { Button } from "@/components/ui/button"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import type { AudioQualityInternal, ShortName } from "@/lib/types/audio"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type TrackButtonProps = {
	allLoaded: boolean
	shortName: ShortName
	internalQuality: AudioQualityInternal
	loadError: boolean
	setLoadError: Dispatch<SetStateAction<boolean>>
	setLoadTime: Dispatch<SetStateAction<number>>
}

export const TrackButton = ({
	allLoaded,
	shortName,
	internalQuality,
	loadError,
	setLoadError,
	setLoadTime
}: TrackButtonProps) => {
	const {
		currentlyPlayingShortName,
		setCurrentlyPlayingShortName,
		currentlyPlayingQuality,
		setCurrentlyPlayingQuality
	} = useAudioPlayer()

	if (loadError) {
		return (
			<Button
				type={"button"}
				onClick={() => {
					setLoadError(false)
					setLoadTime((prev) => prev * 2)
				}}
				className={cn("w-16", "border-red-500")}
				variant={"outline"}
			>
				load
			</Button>
		)
	}

	const setPlaying = (shortName: string, quality: AudioQualityInternal) => {
		setCurrentlyPlayingShortName(shortName)
		setCurrentlyPlayingQuality(quality)
	}

	const setUnplaying = () => {
		setCurrentlyPlayingShortName(undefined)
		setCurrentlyPlayingQuality(undefined)
	}

	const isCurrentlyPlaying = (shortName: string, quality: AudioQualityInternal) =>
		shortName === currentlyPlayingShortName && quality === currentlyPlayingQuality

	return (
		<Button
			disabled={!allLoaded}
			type={"button"}
			onClick={() => {
				isCurrentlyPlaying(shortName, internalQuality) ? setUnplaying() : setPlaying(shortName, internalQuality)
			}}
			className={cn("w-16")}
			variant={"outline"}
		>
			{isCurrentlyPlaying(shortName, internalQuality) ? "stop" : "play"} {loadError}
		</Button>
	)
}
