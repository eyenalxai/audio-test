"use client"

import { TrackQualityPickerList } from "@/components/track-picker/track-quality-picker-list"
import { trackAudios } from "@/lib/tracks"
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

	return <TrackQualityPickerList trackAudios={trackAudios} allLoaded={allLoaded} />
}
