"use client"

import { SelectQuality } from "@/components/track-picker/select-quality"
import { Button } from "@/components/ui/button"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type TrackQualityPickerProps = {
	displayResults: boolean
	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
	selectedQualities: SelectedAudioQualities
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const TrackQualityPicker = ({
	displayResults,
	trackAudio,
	trackQualityOptions,
	selectedQualities,
	setSelectedQualities
}: TrackQualityPickerProps) => {
	const { playingUrl, setPlayingUrl } = useAudioPlayer()

	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([internalQuality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2", "items-center")}>
						<Button
							type={"button"}
							onClick={() => {
								playingUrl === link ? setPlayingUrl(null) : setPlayingUrl(link)
							}}
							className={cn("w-16")}
							variant={"outline"}
						>
							{playingUrl === link ? "stop" : "play"}
						</Button>
						<SelectQuality
							trackQualityOptions={trackQualityOptions}
							selectForShortName={trackAudio.musicTrack.shortName}
							selectForQuality={internalQuality}
							selectedQualities={selectedQualities}
							setSelectedQualities={setSelectedQualities}
							displayResults={displayResults}
						/>
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
