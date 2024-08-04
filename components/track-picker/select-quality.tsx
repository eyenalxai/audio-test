import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AudioQualityInternal, AudioQualitySelection, ShortName } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

type SelectQualityProps = {
	trackQualityOptions: AudioQualitySelection[]
	selectForShortName: ShortName
	selectForQuality: AudioQualityInternal
	selectedQualities: SelectedAudioQualities
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
	displayResults: boolean
}

export const SelectQuality = ({
	trackQualityOptions,
	selectForShortName,
	selectForQuality,
	selectedQualities,
	setSelectedQualities,
	displayResults
}: SelectQualityProps) => {
	return (
		<Select
			key={selectForShortName + selectForQuality}
			disabled={displayResults}
			onValueChange={(value: AudioQualityInternal) => {
				setSelectedQualities((prev) => ({
					...prev,
					[selectForShortName]: {
						...prev[selectForShortName],
						[selectForQuality]: value
					}
				}))
			}}
			value={selectedQualities[selectForShortName][selectForQuality]}
		>
			<SelectTrigger className={cn("w-32")}>
				<SelectValue placeholder="quality" />
			</SelectTrigger>
			<SelectContent>
				{trackQualityOptions.map((quality) => (
					<SelectItem key={quality.internal} value={quality.internal}>
						{quality.display}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
