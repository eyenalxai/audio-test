"use client"

import { TrackQualityPicker } from "@/components/track-picker/track-quality-picker"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAudioTest } from "@/lib/hooks/audio-test"
import { trackQualityOptions } from "@/lib/tracks"
import { cn } from "@/lib/utils"

export default function Page() {
	const {
		displayResults,
		learningMode,
		setLearningMode,
		keepPlaybackTime,
		setKeepPlaybackTime,
		tracksToUse,
		selectedQualities,
		selectQuality,
		correctPicks,
		totalOptions,
		resetAll,
		setCurrentlyPlayingShortName,
		setCurrentlyPlayingQuality,
		setDisplayResults
	} = useAudioTest()

	if (!tracksToUse) return null

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
					selectQuality={selectQuality}
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
