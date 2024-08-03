import type { AudioQuality, AudioQualityInternal, ShortName } from "@/lib/types/audio"

export type SelectedAudioQualitiesForTrack = Record<AudioQualityInternal, AudioQuality | null>

export type SelectedAudioQualities = Record<ShortName, SelectedAudioQualitiesForTrack>
