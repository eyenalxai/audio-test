import { PreloadAudio } from "@/components/preload-audio"
import { TrackQualityPicker } from "@/components/track-quality-picker"
import { createMultipleTrackAudios } from "@/lib/track-urls"
import type { MusicTrack } from "@/lib/types/audio"
import { cn } from "@/lib/utils"

export default function Page() {
	const baseUrl = "https://audio-test.fra1.cdn.digitaloceanspaces.com"

	const tracks: MusicTrack[] = [
		{
			shortName: "contact",
			fullName: "Daft Punk - Contact"
		},
		{
			shortName: "doing-it-right",
			fullName: "Daft Punk - Doin' it Right"
		}
	]

	const trackAudios = createMultipleTrackAudios(tracks, baseUrl)

	return (
		<main className={cn("container", "mx-auto", "max-w-xl", "mt-12")}>
			<PreloadAudio trackAudios={trackAudios} />
			<div className={cn("w-full", "flex", "flex-col", "justify-center", "items-start", "gap-8")}>
				{trackAudios.map((trackAudio) => (
					<TrackQualityPicker key={trackAudio.musicTrack.shortName} trackAudio={trackAudio} />
				))}
			</div>
		</main>
	)
}
