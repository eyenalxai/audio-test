import type { AudioLinks } from "@/lib/types/audio"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

type UseLoadTracksProps = {
	audioLinks: AudioLinks
}

export const useLoadTracks = ({ audioLinks }: UseLoadTracksProps) => {
	const { ref, inView } = useInView()

	const [loadTime, setLoadTime] = useState(10)
	const [loadError, setLoadError] = useState(false)
	const [allLoaded, setAllLoaded] = useState(false)

	const aborted = useRef(false)

	useEffect(() => {
		if (allLoaded) return

		aborted.current = !inView || loadError
		if (aborted.current) return

		const promises: Promise<{ success: boolean }>[] = []

		for (const link of Object.values(audioLinks)) {
			const audio = new Audio(link)
			audio.preload = "auto"

			const promise = new Promise<{ success: boolean }>((resolve) => {
				const timeoutId = setTimeout(() => {
					if (aborted.current) return

					setLoadError(true)
					audio.oncanplaythrough = null
					resolve({ success: false })
				}, loadTime * 1000)

				audio.oncanplaythrough = () => {
					if (aborted.current) return

					clearTimeout(timeoutId)
					resolve({ success: true })
				}
			})

			promises.push(promise)
			audio.load()
		}

		Promise.all(promises).then((results) => {
			if (aborted.current) return

			const allSuccess = results.every((result) => result.success)

			if (allSuccess && !loadError) {
				setAllLoaded(true)
			}
		})

		return () => {
			aborted.current = true
		}
	}, [audioLinks, inView, loadTime, loadError, allLoaded])

	return {
		inViewRef: ref,
		allLoaded,
		loadError,
		setLoadError,
		setLoadTime
	}
}
