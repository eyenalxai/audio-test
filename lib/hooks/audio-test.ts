import { useAudioPlayer } from "@/lib/hooks/use-audio-player"
import { shuffleAudioLinks } from "@/lib/shuffle"
import { trackAudios, trackQualityOptions } from "@/lib/tracks"
import type { TrackAudio } from "@/lib/types/audio"
import type { SelectedAudioQualities } from "@/lib/types/select"
import { useCallback, useEffect, useMemo, useState } from "react"

export const useAudioTest = () => {
	const [learningMode, setLearningMode] = useState(false)
	const [displayResults, setDisplayResults] = useState(false)
	const [shuffledTrackAudios, setShuffledTrackAudios] = useState<TrackAudio[] | undefined>(undefined)
	const [selectedQualities, setSelectedQualities] = useState<SelectedAudioQualities>(
		Object.fromEntries(
			trackAudios.map((trackAudio) => [
				trackAudio.musicTrack.shortName,
				{
					flac: "",
					mp3_320: "",
					mp3_128: "",
					mp3_64: ""
				}
			])
		)
	)

	const { setCurrentlyPlayingShortName, setCurrentlyPlayingQuality, keepPlaybackTime, setKeepPlaybackTime } =
		useAudioPlayer()

	useEffect(() => {
		if (displayResults) return
		setShuffledTrackAudios(shuffleAudioLinks(trackAudios))
	}, [displayResults])

	useEffect(() => {
		if (displayResults) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
		}
	}, [displayResults])

	const resetAll = useCallback(() => {
		setCurrentlyPlayingShortName(undefined)
		setCurrentlyPlayingQuality(undefined)
		setDisplayResults(false)
		setSelectedQualities(
			Object.fromEntries(
				trackAudios.map((trackAudio) => [
					trackAudio.musicTrack.shortName,
					{
						flac: "",
						mp3_320: "",
						mp3_128: "",
						mp3_64: ""
					}
				])
			)
		)
	}, [setCurrentlyPlayingShortName, setCurrentlyPlayingQuality])

	useEffect(() => {
		if (!learningMode) {
			resetAll()
		}
	}, [learningMode, resetAll])

	const totalOptions = trackAudios.length * trackQualityOptions.length

	const correctPicks = useMemo(
		() =>
			Object.values(selectedQualities).reduce((total, qualities) => {
				const correctPicks = Object.entries(qualities).reduce((acc, [qualityKey, qualityValue]) => {
					return acc + (qualityValue !== null && qualityKey === qualityValue ? 1 : 0)
				}, 0)
				return total + correctPicks
			}, 0),
		[selectedQualities]
	)

	const tracksToUse = learningMode ? trackAudios : shuffledTrackAudios

	return {
		displayResults,
		learningMode,
		setLearningMode,
		keepPlaybackTime,
		setKeepPlaybackTime,
		tracksToUse,
		selectedQualities,
		setSelectedQualities,
		correctPicks,
		totalOptions,
		resetAll,
		setCurrentlyPlayingShortName,
		setCurrentlyPlayingQuality,
		setDisplayResults
	}
}
