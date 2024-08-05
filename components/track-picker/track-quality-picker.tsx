"use client"

import { SelectQuality } from "@/components/track-picker/select-quality"
import { Button } from "@/components/ui/button"
import type { SelectQualityFnProps } from "@/lib/hooks/audio-test"
import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import type { AudioQualityInternal, AudioQualitySelection, ShortName, TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { cn } from "@/lib/utils"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

type OofProps = {
	allLoaded: boolean
	shortName: ShortName
	internalQuality: AudioQualityInternal
	loadError: boolean
	setLoadError: Dispatch<SetStateAction<boolean>>
	setLoadTime: Dispatch<SetStateAction<number>>
}

export const Oof = ({ allLoaded, shortName, internalQuality, loadError, setLoadError, setLoadTime }: OofProps) => {
	const {
		currentlyPlayingShortName,
		setCurrentlyPlayingShortName,
		currentlyPlayingQuality,
		setCurrentlyPlayingQuality
	} = useAudioPlayer()

	if (loadError) {
		return (
			<Button
				type={"button"}
				onClick={() => {
					setLoadError(false)
					setLoadTime((prev) => prev * 2)
				}}
				className={cn("w-16", "border-red-500")}
				variant={"outline"}
			>
				load
			</Button>
		)
	}

	const setPlaying = (shortName: string, quality: AudioQualityInternal) => {
		setCurrentlyPlayingShortName(shortName)
		setCurrentlyPlayingQuality(quality)
	}

	const setUnplaying = () => {
		setCurrentlyPlayingShortName(undefined)
		setCurrentlyPlayingQuality(undefined)
	}

	const isCurrentlyPlaying = (shortName: string, quality: AudioQualityInternal) =>
		shortName === currentlyPlayingShortName && quality === currentlyPlayingQuality

	return (
		<Button
			disabled={!allLoaded}
			type={"button"}
			onClick={() => {
				isCurrentlyPlaying(shortName, internalQuality) ? setUnplaying() : setPlaying(shortName, internalQuality)
			}}
			className={cn("w-16")}
			variant={"outline"}
		>
			{isCurrentlyPlaying(shortName, internalQuality) ? "stop" : "play"} {loadError}
		</Button>
	)
}

type TrackQualityPickerProps = {
	learningMode: boolean
	displayResults: boolean

	trackAudio: TrackAudio
	trackQualityOptions: AudioQualitySelection[]
	selectedQualities: SelectedAudioQualities
	selectQuality: (props: SelectQualityFnProps) => void
}

export const TrackQualityPicker = ({
	learningMode,
	displayResults,
	trackAudio,
	trackQualityOptions,
	selectedQualities,
	selectQuality
}: TrackQualityPickerProps) => {
	const { ref, inView } = useInView()
	const [loadTime, setLoadTime] = useState(10)
	const [loadError, setLoadError] = useState(false)
	const [allLoaded, setAllLoaded] = useState(false)

	useEffect(() => {
		if (!inView || loadError) return
		const promises: Promise<{ success: boolean }>[] = []

		for (const link of Object.values(trackAudio.audioLinks)) {
			const audio = new Audio(link)
			audio.preload = "auto"

			const promise = new Promise<{ success: boolean }>((resolve) => {
				const timeoutId = setTimeout(() => {
					console.log("Timeout")
					setLoadError(true)
					audio.oncanplaythrough = null
					resolve({ success: false })
				}, loadTime * 1000)

				audio.oncanplaythrough = () => {
					clearTimeout(timeoutId)
					resolve({ success: true })
				}
			})
			promises.push(promise)

			audio.load()
		}

		Promise.all(promises).then((results) => {
			if (results.every((result) => result.success) && !loadError) {
				console.log("All loaded")
				setAllLoaded(true)
			}
		})
	}, [trackAudio.audioLinks, inView, loadTime, loadError])

	const trackQualityLinks: [AudioQualityInternal, string][] = Object.entries(trackAudio.audioLinks) as [
		AudioQualityInternal,
		string
	][]

	const getDisplayQuality = (internalQuality: AudioQualityInternal) =>
		trackQualityOptions.find((quality) => quality.internal === internalQuality)?.display

	return (
		<div className={cn("flex", "flex-col", "gap-2", "justify-center", "items-start")}>
			<div ref={ref} />
			<div>{trackAudio.musicTrack.fullName}</div>
			<div className={cn("flex", "flex-col", "gap-4")}>
				{trackQualityLinks.map(([internalQuality, link]) => (
					<div key={link} className={cn("flex", "flex-row", "gap-2", "items-center")}>
						<Oof
							allLoaded={allLoaded}
							shortName={trackAudio.musicTrack.shortName}
							internalQuality={internalQuality}
							loadError={loadError}
							setLoadError={setLoadError}
							setLoadTime={setLoadTime}
						/>
						{learningMode ? (
							<div className={cn("ml-[0.815rem]", "text-sm")}>{getDisplayQuality(internalQuality)}</div>
						) : (
							<SelectQuality
								allLoaded={allLoaded}
								trackQualityOptions={trackQualityOptions}
								selectForShortName={trackAudio.musicTrack.shortName}
								selectForQuality={internalQuality}
								selectedQualities={selectedQualities}
								selectQuality={selectQuality}
								displayResults={displayResults}
							/>
						)}

						{displayResults && (
							<div
								className={cn(
									"text-sm",
									selectedQualities[trackAudio.musicTrack.shortName][internalQuality] === internalQuality
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{trackQualityOptions.find((quality) => quality.internal === internalQuality)?.display}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
