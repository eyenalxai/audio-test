"use client"

import { TrackQualityPicker } from "@/components/track-quality-picker"
import { trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useState } from "react"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
	const [selectedQualities, setSelectedQualities] = useState<SelectedAudioQualities>(
		Object.fromEntries(
			trackAudios.map((trackAudio) => [
				trackAudio.musicTrack.shortName,
				{
					flac: null,
					mp3_320: null,
					mp3_128: null,
					mp3_64: null
				}
			])
		)
	)

	console.log(selectedQualities)

	return (
		<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
			{trackAudios.map((trackAudio) => (
				<TrackQualityPicker
					key={trackAudio.musicTrack.shortName}
					trackAudio={trackAudio}
					trackQualityOptions={trackQualityOptions}
					setSelectedQualities={setSelectedQualities}
				/>
			))}
		</div>
	)
}
