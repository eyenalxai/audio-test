"use client"

import { TrackQualityPickerList } from "@/components/track-picker/track-quality-picker-list"
import { trackAudios } from "@/lib/tracks"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function Page() {
	const [allLoaded, setAllLoaded] = useState(false)

	useEffect(() => {
		const promises: Promise<void>[] = []

		for (const trackAudio of trackAudios) {
			for (const link of Object.values(trackAudio.audioLinks)) {
				const audio = new Audio(link)
				audio.preload = "auto"

				const promise = new Promise<void>((resolve) => {
					audio.oncanplaythrough = () => resolve()
				})
				promises.push(promise)

				audio.load()
			}
		}

		Promise.all(promises).then(() => {
			setAllLoaded(true)
		})
	}, [])

	return (
		<main className={cn("container", "mx-auto", "max-w-xl", "my-12")}>
			<TrackQualityPickerList trackAudios={trackAudios} allLoaded={allLoaded} />
		</main>
	)
}
