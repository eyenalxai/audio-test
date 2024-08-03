"use client"

import { SelectQuality } from "@/components/select-quality"
import { Button } from "@/components/ui/button"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type TrackQualityPickerProps = {
	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
}

export const TrackQualityPicker = ({ trackAudio, trackQualityOptions }: TrackQualityPickerProps) => {
	const [selectedQualities, setSelectedQualities] = useState<SelectedAudioQualities>({
		flac: null,
		mp3_320: null,
		mp3_128: null,
		mp3_64: null
	})

	useEffect(() => {
		const correctPicksCount = Object.keys(selectedQualities).reduce((acc, key) => {
			const quality = key as AudioQualityInternal
			return selectedQualities[quality] === quality ? acc + 1 : acc
		}, 0)
		console.log(correctPicksCount)
	}, [selectedQualities])

	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([quality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2")}>
						<Button className={cn("w-16")} variant={"outline"}>
							play
						</Button>
						<SelectQuality
							trackQualityOptions={trackQualityOptions}
							selectForQuality={quality}
							setSelectedQualities={setSelectedQualities}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
