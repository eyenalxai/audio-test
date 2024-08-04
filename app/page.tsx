"use client"

import { TrackQualityPickerList } from "@/components/track-picker/track-quality-picker-list"
import { trackAudios } from "@/lib/tracks"

export default function Page() {
	return <TrackQualityPickerList trackAudios={trackAudios} />
}
