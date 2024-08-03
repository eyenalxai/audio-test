import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AudioQualityInternal, AudioQualitySelection, ShortName } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Dispatch, type SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type AudioQualityInternalForm = AudioQualityInternal | "no_selection"

type SelectQualityProps = {
	trackQualityOptions: AudioQualitySelection[]
	selectForShortName: ShortName
	selectForQuality: AudioQualityInternal
	selectedQualities: SelectedAudioQualities
	setSelectedQualities: Dispatch<SetStateAction<SelectedAudioQualities>>
}

export const SelectQuality = ({
	trackQualityOptions,
	selectForShortName,
	selectForQuality,
	selectedQualities,
	setSelectedQualities
}: SelectQualityProps) => {
	const selectQualityFormSchema = z.object({
		quality: z
			.enum(["flac", "mp3_320", "mp3_128", "mp3_64"])
			.transform((val): AudioQualityInternalForm => val as AudioQualityInternalForm)
	})

	const form = useForm<z.infer<typeof selectQualityFormSchema>>({
		resolver: zodResolver(selectQualityFormSchema)
	})

	useEffect(() => {
		if (selectedQualities[selectForShortName]?.[selectForQuality] === null) {
			form.reset({
				quality: "no_selection"
			})
		}
	}, [form, selectedQualities, selectForShortName, selectForQuality, form.reset])

	function onSubmit(data: z.infer<typeof selectQualityFormSchema>) {
		setSelectedQualities((prev) => ({
			...prev,
			[selectForShortName]: {
				...prev[selectForShortName],
				[selectForQuality]: data.quality
			}
		}))
	}

	return (
		<Form {...form}>
			<form>
				<FormField
					control={form.control}
					name="quality"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={(value: AudioQualityInternal) => {
									form.setValue("quality", value, { shouldValidate: true })
									form.handleSubmit(onSubmit)()
								}}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger className={cn("w-32")}>
										<SelectValue placeholder="quality" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{trackQualityOptions.map((quality) => (
										<SelectItem key={quality.internal} value={quality.internal}>
											{quality.display}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
