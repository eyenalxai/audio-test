"use client"

import { AudioPlayerContextProvider } from "@/components/audio-player-context"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import * as React from "react"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<AudioPlayerContextProvider>{children}</AudioPlayerContextProvider>
		</NextThemesProvider>
	)
}
