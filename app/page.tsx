import { PreloadAudio } from "@/components/preload-audio"
import { TrackQualityPickerList } from "@/components/track-quality-picker-list"
import { trackAudios } from "@/lib/tracks"
import { cn } from "@/lib/utils"

export default function Page() {
	return (
		<main className={cn("container", "mx-auto", "max-w-xl", "mt-12")}>
			<PreloadAudio trackAudios={trackAudios} />
			<TrackQualityPickerList trackAudios={trackAudios} />
		</main>
	)
}
