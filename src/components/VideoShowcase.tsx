import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react"

interface VideoPlayerProps {
  children: React.ReactNode
  className?: string
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  aspectRatio?: string
  mediaProps?: {
    [key: string]: unknown
  }
}

export function VideoPlayer({
  children,
  className = "",
  src,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
  aspectRatio = "16/9",
  mediaProps = {},
}: VideoPlayerProps) {
  return (
    <MediaController
      defaultSubtitles
      style={{
        aspectRatio,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <video
        slot="media"
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        crossOrigin="anonymous"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        {...mediaProps}
      />
      {children}
    </MediaController>
  )
}

export const VideoPlayerControlBar = MediaControlBar
export const VideoPlayerPlayButton = MediaPlayButton
export const VideoPlayerTimeRange = MediaTimeRange
export const VideoPlayerTimeDisplay = MediaTimeDisplay
export const VideoPlayerVolumeRange = MediaVolumeRange
export const VideoPlayerMuteButton = MediaMuteButton
export const VideoPlayerSeekBackwardButton = MediaSeekBackwardButton
export const VideoPlayerSeekForwardButton = MediaSeekForwardButton

export interface VideoPopOverProps {
  showVideoPopOver: boolean
  setShowVideoPopOver: (show: boolean) => void
  videoSrc?: string
}

export function VideoPopOver({
  showVideoPopOver,
  setShowVideoPopOver,
  videoSrc = "/showreel/skiper-ui-showreel.mp4",
}: VideoPopOverProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showVideoPopOver) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowVideoPopOver(false)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showVideoPopOver, setShowVideoPopOver])

  if (!showVideoPopOver) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowVideoPopOver(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl"
        >
          <button
            type="button"
            onClick={() => setShowVideoPopOver(false)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-40 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
          >
            ✕
          </button>

          <VideoPlayer
            src={videoSrc}
            autoPlay
            loop
            aspectRatio="16/9"
            className="w-full h-auto"
          >
            <VideoPlayerControlBar className="absolute bottom-3 left-1/2 z-30 flex w-[calc(100%-24px)] sm:w-[calc(100%-48px)] max-w-3xl -translate-x-1/2 items-center justify-center gap-2 sm:gap-3 rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-md text-white sm:px-6">
              <VideoPlayerPlayButton className="h-5 bg-transparent text-white cursor-pointer hover:opacity-80" />
              <VideoPlayerTimeRange className="bg-transparent text-white flex-1 cursor-pointer" />
              <VideoPlayerTimeDisplay className="text-[11px] sm:text-[12px] tabular-nums text-white/80 p-0" />
              <VideoPlayerMuteButton className="size-5 bg-transparent text-white cursor-pointer hover:opacity-80 ml-1 sm:ml-2" />
            </VideoPlayerControlBar>
          </VideoPlayer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
