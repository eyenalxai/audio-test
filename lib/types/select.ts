import type { AudioQuality, AudioQualityInternal } from "@/lib/types/audio"

export type SelectedAudioQualities = Record<AudioQualityInternal, AudioQuality | null>
