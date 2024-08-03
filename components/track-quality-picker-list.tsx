"use client"

import { TrackQualityPicker } from "@/components/track-quality-picker"
import { trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import type { TrackQualityPicks } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useState } from "react"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
	const [correctQualityPicks, setCorrectQualityPicks] = useState<TrackQualityPicks>(
		Object.fromEntries(trackAudios.map((trackAudio) => [trackAudio.musicTrack.shortName, 0]))
	)

	const totalOptions = trackAudios.length * trackQualityOptions.length

	return (
		<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
			{trackAudios.map((trackAudio) => (
				<TrackQualityPicker
					key={trackAudio.musicTrack.shortName}
					trackAudio={trackAudio}
					trackQualityOptions={trackQualityOptions}
					setCorrectQualityPicks={setCorrectQualityPicks}
				/>
			))}
		</div>
	)
}
