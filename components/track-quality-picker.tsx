"use client"

import { SelectQuality } from "@/components/select-quality"
import { Button } from "@/components/ui/button"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type TrackQualityPickerProps = {
	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const TrackQualityPicker = ({
	trackAudio,
	trackQualityOptions,
	setSelectedQualities
}: TrackQualityPickerProps) => {
	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([internalQuality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2")}>
						<Button className={cn("w-16")} variant={"outline"}>
							play
						</Button>
						<SelectQuality
							trackQualityOptions={trackQualityOptions}
							selectForShortName={trackAudio.musicTrack.shortName}
							selectForQuality={internalQuality}
							setSelectedQualities={setSelectedQualities}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
