import { TrackQualityPicker } from "@/components/track-quality-picker"
import type { AudioQualitySelection, TrackAudio } from "@/lib/types/audio"
import { cn } from "@/lib/utils"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
	const trackQualityOptions: AudioQualitySelection[] = [
		{
			internal: "flac",
			display: "flac"
		},
		{
			internal: "mp3_320",
			display: "320kbps"
		},
		{
			internal: "mp3_128",
			display: "128kbps"
		},
		{
			internal: "mp3_64",
			display: "64kbps"
		}
	]

	return (
		<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
			{trackAudios.map((trackAudio) => (
				<TrackQualityPicker
					key={trackAudio.musicTrack.shortName}
					trackAudio={trackAudio}
					trackQualityOptions={trackQualityOptions}
				/>
			))}
		</div>
	)
}
