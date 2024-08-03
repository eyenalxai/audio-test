"use client"

import { TrackQualityPicker } from "@/components/track-picker/track-quality-picker"
import { Button } from "@/components/ui/button"
import { trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useState } from "react"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
	const [displayResults, setDisplayResults] = useState(false)
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

	const resetAll = () => {
		setDisplayResults(false)
		setSelectedQualities(
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
	}

	const totalOptions = trackAudios.length * trackQualityOptions.length

	const correctPicks = Object.values(selectedQualities).reduce((total, qualities) => {
		const correctPicks = Object.entries(qualities).reduce((acc, [qualityKey, qualityValue]) => {
			return acc + (qualityValue !== null && qualityKey === qualityValue ? 1 : 0)
		}, 0)
		return total + correctPicks
	}, 0)

	const allSelected = Object.values(selectedQualities).every((qualities) =>
		Object.values(qualities).every((value) => value !== null)
	)

	return (
		<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
			{trackAudios.map((trackAudio) => (
				<TrackQualityPicker
					key={trackAudio.musicTrack.shortName}
					displayResults={displayResults}
					trackAudio={trackAudio}
					trackQualityOptions={trackQualityOptions}
					selectedQualities={selectedQualities}
					setSelectedQualities={setSelectedQualities}
				/>
			))}
			<div className={cn("flex", "flex-row", "gap-2")}>
				<Button disabled={!allSelected || displayResults} onClick={() => setDisplayResults(true)}>
					check
				</Button>
				{displayResults && (
					<Button variant={"outline"} onClick={() => resetAll()}>
						reset
					</Button>
				)}
			</div>
			{displayResults && (
				<div className={cn("flex", "flex-row", "gap-4")}>
					<span>you got</span>
					<span className={cn(correctPicks === totalOptions ? "text-green-500" : "text-red-500")}>
						{correctPicks} out of {totalOptions}
					</span>
					<span>correct</span>
				</div>
			)}
		</div>
	)
}
