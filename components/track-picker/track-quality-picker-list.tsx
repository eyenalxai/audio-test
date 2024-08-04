"use client"

import { TrackQualityPicker } from "@/components/track-picker/track-quality-picker"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import { shuffleAudioLinks } from "@/lib/shuffle"
import { trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useMemo, useState } from "react"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
	const [learningMode, setLearningMode] = useState(false)
	const [displayResults, setDisplayResults] = useState(false)
	const [shuffledTrackAudios, setShuffledTrackAudios] = useState<TrackAudio[] | undefined>(undefined)
	const [selectedQualities, setSelectedQualities] = useState<SelectedAudioQualities>(
		Object.fromEntries(
			trackAudios.map((trackAudio) => [
				trackAudio.musicTrack.shortName,
				{
					flac: "",
					mp3_320: "",
					mp3_128: "",
					mp3_64: ""
				}
			])
		)
	)

	const { setCurrentlyPlayingShortName, setCurrentlyPlayingQuality, keepPlaybackTime, setKeepPlaybackTime } =
		useAudioPlayer()

	useEffect(() => {
		if (displayResults) return
		setShuffledTrackAudios(shuffleAudioLinks(trackAudios))
	}, [trackAudios, displayResults])

	useEffect(() => {
		if (displayResults) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
		}
	}, [displayResults])

	const resetAll = useCallback(() => {
		setCurrentlyPlayingShortName(undefined)
		setCurrentlyPlayingQuality(undefined)
		setDisplayResults(false)
		setSelectedQualities(
			Object.fromEntries(
				trackAudios.map((trackAudio) => [
					trackAudio.musicTrack.shortName,
					{
						flac: "",
						mp3_320: "",
						mp3_128: "",
						mp3_64: ""
					}
				])
			)
		)
	}, [setCurrentlyPlayingShortName, setCurrentlyPlayingQuality, trackAudios])

	useEffect(() => {
		if (!learningMode) {
			resetAll()
		}
	}, [learningMode, resetAll])

	const totalOptions = trackAudios.length * trackQualityOptions.length

	const correctPicks = useMemo(
		() =>
			Object.values(selectedQualities).reduce((total, qualities) => {
				const correctPicks = Object.entries(qualities).reduce((acc, [qualityKey, qualityValue]) => {
					return acc + (qualityValue !== null && qualityKey === qualityValue ? 1 : 0)
				}, 0)
				return total + correctPicks
			}, 0),
		[selectedQualities]
	)

	if (!shuffledTrackAudios) return null

	const tracksToUse = learningMode ? trackAudios : shuffledTrackAudios

	return (
		<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
			<div className={cn("flex", "flex-col", "gap-2")}>
				<div className={cn("flex", "flex-row", "gap-2", "items-center")}>
					<Switch
						disabled={displayResults}
						checked={learningMode}
						onCheckedChange={(checked) => setLearningMode(checked)}
					/>
					<Label>learning mode</Label>
				</div>
				<div className={cn("flex", "flex-row", "gap-2", "items-center")}>
					<Switch checked={keepPlaybackTime} onCheckedChange={(checked) => setKeepPlaybackTime(checked)} />
					<Label>keep playback time</Label>
				</div>
			</div>
			{tracksToUse.map((trackAudio) => (
				<TrackQualityPicker
					key={trackAudio.musicTrack.shortName}
					learningMode={learningMode}
					displayResults={displayResults}
					trackAudio={trackAudio}
					trackQualityOptions={trackQualityOptions}
					selectedQualities={selectedQualities}
					setSelectedQualities={setSelectedQualities}
				/>
			))}
			<div className={cn("flex", "flex-row", "gap-2")}>
				{!learningMode && (
					<Button
						disabled={displayResults}
						onClick={() => {
							setCurrentlyPlayingShortName(undefined)
							setCurrentlyPlayingQuality(undefined)
							setDisplayResults(true)
						}}
					>
						check
					</Button>
				)}
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
