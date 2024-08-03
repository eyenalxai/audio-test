import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AudioQualityInternal, AudioQualitySelection } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type SelectQualityProps = {
	trackQualityOptions: AudioQualitySelection[]
	selectForQuality: AudioQualityInternal
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const SelectQuality = ({ trackQualityOptions, selectForQuality, setSelectedQualities }: SelectQualityProps) => {
	return (
		<Select
			onValueChange={(value: AudioQualityInternal) => {
				setSelectedQualities((prev) => {
					return {
						...prev,
						[selectForQuality]: trackQualityOptions.find((quality) => quality.internal === value)?.internal || null
					} satisfies SelectedAudioQualities
				})
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
