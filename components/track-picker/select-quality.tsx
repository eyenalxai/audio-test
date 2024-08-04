import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SelectQualityFnProps } from "@/lib/hooks/audio-test"
import type { AudioQualityInternal, AudioQualitySelection, ShortName } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"

type SelectQualityProps = {
	trackQualityOptions: AudioQualitySelection[]
	selectForShortName: ShortName
	selectForQuality: AudioQualityInternal
	selectedQualities: SelectedAudioQualities
	selectQuality: (props: SelectQualityFnProps) => void
	displayResults: boolean
}

export const SelectQuality = ({
	trackQualityOptions,
	selectForShortName,
	selectForQuality,
	selectedQualities,
	selectQuality,
	displayResults
}: SelectQualityProps) => {
	return (
		<Select
			key={selectForShortName + selectForQuality}
			disabled={displayResults}
			onValueChange={(value: AudioQualityInternal) => selectQuality({ selectForShortName, selectForQuality, value })}
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
