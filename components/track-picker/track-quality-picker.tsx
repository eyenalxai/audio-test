"use client"

import { SelectQuality } from "@/components/track-picker/select-quality"
import { Button } from "@/components/ui/button"
import type { SelectQualityFnProps } from "@/lib/hooks/audio-test"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type TrackQualityPickerProps = {
	learningMode: boolean
	displayResults: boolean

	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
	selectedQualities: SelectedAudioQualities
	selectQuality: (props: SelectQualityFnProps) => void
}

export const TrackQualityPicker = ({
	learningMode,
	displayResults,
	trackAudio,
	trackQualityOptions,
	selectedQualities,
	selectQuality
}: TrackQualityPickerProps) => {
	const [allLoaded, setAllLoaded] = useState(false)

	useEffect(() => {
		const promises: Promise<void>[] = []

		for (const link of Object.values(trackAudio.audioLinks)) {
			const audio = new Audio(link)
			audio.preload = "auto"

			const promise = new Promise<void>((resolve) => {
				audio.oncanplaythrough = () => resolve()
			})
			promises.push(promise)

			audio.load()
		}

		Promise.all(promises).then(() => {
			setAllLoaded(true)
		})
	}, [trackAudio.audioLinks])

	const {
		currentlyPlayingShortName,
		setCurrentlyPlayingShortName,
		currentlyPlayingQuality,
		setCurrentlyPlayingQuality
	} = useAudioPlayer()

	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	const isCurrentlyPlaying = (shortName: string, quality: AudioQualityInternal) =>
		shortName === currentlyPlayingShortName && quality === currentlyPlayingQuality

	const setPlaying = (shortName: string, quality: AudioQualityInternal) => {
		setCurrentlyPlayingShortName(shortName)
		setCurrentlyPlayingQuality(quality)
	}

	const setUnplaying = () => {
		setCurrentlyPlayingShortName(undefined)
		setCurrentlyPlayingQuality(undefined)
	}

	const getDisplayQuality = (internalQuality: AudioQualityInternal) =>
		trackQualityOptions.find((quality) => quality.internal === internalQuality)?.display

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([internalQuality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2", "items-center")}>
						<Button
							disabled={!allLoaded}
							type={"button"}
							onClick={() => {
								isCurrentlyPlaying(trackAudio.musicTrack.shortName, internalQuality)
									? setUnplaying()
									: setPlaying(trackAudio.musicTrack.shortName, internalQuality)
							}}
							className={cn("w-16")}
							variant={"outline"}
						>
							{isCurrentlyPlaying(trackAudio.musicTrack.shortName, internalQuality) ? "stop" : "play"}
						</Button>
						{learningMode ? (
							<div className={cn("ml-[0.815rem]", "text-sm")}>{getDisplayQuality(internalQuality)}</div>
						) : (
							<SelectQuality
								trackQualityOptions={trackQualityOptions}
								selectForShortName={trackAudio.musicTrack.shortName}
								selectForQuality={internalQuality}
								selectedQualities={selectedQualities}
								selectQuality={selectQuality}
								displayResults={displayResults}
							/>
						)}

						{displayResults && (
							<div
								className={cn(
									"text-sm",
									selectedQualities[trackAudio.musicTrack.shortName][internalQuality] === internalQuality
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{trackQualityOptions.find((quality) => quality.internal === internalQuality)?.display}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
