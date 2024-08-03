import type { AudioQuality, AudioQualityInternal, ShortName } from "@/lib/types/audio"

export type SelectedAudioQualities = Record<AudioQualityInternal, AudioQuality | null>

export type TrackQualityPicks = Record<ShortName, number>
