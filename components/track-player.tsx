import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TrackAudio } from "@/lib/types/audio"
import { cn } from "@/lib/utils"

type TracksPlayerProps = {
	trackAudio: TrackAudio
}

export const TrackPlayer = ({ trackAudio }: TracksPlayerProps) => {
	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{Object.entries(trackAudio.audioLinks).map(([quality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2")}>
						<Button className={cn("w-16")} variant={"outline"}>
							play
						</Button>
						<Select>
							<SelectTrigger className={cn("w-32")}>
								<SelectValue placeholder="quality" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="flac">flac</SelectItem>
									<SelectItem value="mp3_320">320kbps</SelectItem>
									<SelectItem value="mp3_128">120kbps</SelectItem>
									<SelectItem value="mp3_64">64kbps</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				))}
			</div>
		</div>
	)
}
