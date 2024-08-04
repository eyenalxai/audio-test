"use client"

import { SelectQuality } from "@/components/track-picker/select-quality"
import { Button } from "@/components/ui/button"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type TrackQualityPickerProps = {
	learningMode: boolean
	displayResults: boolean
	allLoaded: boolean
	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
	selectedQualities: SelectedAudioQualities
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const TrackQualityPicker = ({
	learningMode,
	displayResults,
	allLoaded,
	trackAudio,
	trackQualityOptions,
	selectedQualities,
	setSelectedQualities
}: TrackQualityPickerProps) => {
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
								setSelectedQualities={setSelectedQualities}
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
