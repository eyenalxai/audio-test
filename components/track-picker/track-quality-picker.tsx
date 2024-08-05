"use client"

import { TrackButton } from "@/components/track-button"
import { SelectQuality } from "@/components/track-picker/select-quality"
import type { SelectQualityFnProps } from "@/lib/hooks/audio-test"
import { useLoadTracks } from "@/lib/hooks/load-tracks"
import type { AudioQualityInternal, AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"

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
	const { inViewRef, allLoaded, loadError, setLoadError, setLoadTime } = useLoadTracks({
		audioLinks: trackAudio.audioLinks
	})

	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	const getDisplayQuality = (internalQuality: AudioQualityInternal) =>
		trackQualityOptions.find((quality) => quality.internal === internalQuality)?.display

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div ref={inViewRef} />
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([internalQuality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2", "items-center")}>
						<TrackButton
							allLoaded={allLoaded}
							shortName={trackAudio.musicTrack.shortName}
							internalQuality={internalQuality}
							loadError={loadError}
							setLoadError={setLoadError}
							setLoadTime={setLoadTime}
						/>
						{learningMode ? (
							<div className={cn("ml-[0.815rem]", "text-sm")}>{getDisplayQuality(internalQuality)}</div>
						) : (
							<SelectQuality
								allLoaded={allLoaded}
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
