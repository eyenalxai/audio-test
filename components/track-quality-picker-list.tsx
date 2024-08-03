import { TrackQualityPicker } from "@/components/track-quality-picker"
import { trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import { cn } from "@/lib/utils"

type TrackQualityPickerListProps = {
	trackAudios: TrackAudio[]
}

export const TrackQualityPickerList = ({ trackAudios }: TrackQualityPickerListProps) => {
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
