import type { AudioQualityInternal, ShortName } from "@/lib/types/audio"

export type SelectedAudioQualitiesForTrack = Record<AudioQualityInternal, AudioQualityInternal | "">

export type SelectedAudioQualities = Record<ShortName, SelectedAudioQualitiesForTrack>
