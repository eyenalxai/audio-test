import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AudioQualityInternal, AudioQualitySelection, ShortName } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type SelectQualityProps = {
	trackQualityOptions: AudioQualitySelection[]
	selectForShortName: ShortName
	selectForQuality: AudioQualityInternal
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const SelectQuality = ({
	trackQualityOptions,
	selectForShortName,
	selectForQuality,
	setSelectedQualities
}: SelectQualityProps) => {
	return (
		<Select
			onValueChange={(quality: AudioQualityInternal) => {
				setSelectedQualities((prev) => ({
					...prev,
					[selectForShortName]: {
						...prev[selectForShortName],
						[selectForQuality]: quality
					}
				}))
			}}
		>
			<SelectTrigger className={cn("w-32")}>
				<SelectValue placeholder="quality" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{trackQualityOptions.map((quality) => (
						<SelectItem key={quality.internal} value={quality.internal}>
							{quality.display}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
