import type { AudioLinks } from "@/lib/types/audio"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

type UseLoadTracksProps = {
	audioLinks: AudioLinks
}

export const useLoadTracks = ({ audioLinks }: UseLoadTracksProps) => {
	const { ref, inView } = useInView()
	const [loadTime, setLoadTime] = useState(10)
	const [loadError, setLoadError] = useState(false)
	const [allLoaded, setAllLoaded] = useState(false)

	useEffect(() => {
		if (!inView || loadError) return
		const promises: Promise<{ success: boolean }>[] = []

		for (const link of Object.values(audioLinks)) {
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
	}, [audioLinks, inView, loadTime, loadError])

	return {
		inViewRef: ref,
		allLoaded,
		loadError,
		setLoadError,
		setLoadTime
	}
}
