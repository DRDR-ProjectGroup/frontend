"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"

// --- Lib ---
import { isExtensionAvailable } from "@/lib/tiptap-utils"

// --- Icons ---
import { YoutubeIcon } from "@/components/tiptap/tiptap-icons/youtube-icon"

export const YOUTUBE_SHORTCUT_KEY = "mod+shift+y"

export interface UseYoutubeConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onInserted?: () => void
}

export function canInsertYoutube(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, "youtube")) return false

  return editor.can().insertContent({ type: "youtube" })
}

export function isYoutubeActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive("youtube")
}

export function insertYoutube(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsertYoutube(editor)) return false

  const url = prompt("YouTube URL을 입력하세요:")
  if (!url) return false

  try {
    return editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: url,
        width: 640,
        height: 360,
      })
      .run()
  } catch {
    return false
  }
}

export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, "youtube")) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertYoutube(editor)
  }

  return true
}

export function useYoutube(config?: UseYoutubeConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canInsert = canInsertYoutube(editor)
  const isActive = isYoutubeActive(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleYoutube = useCallback(() => {
    if (!editor) return false

    const success = insertYoutube(editor)
    if (success) {
      onInserted?.()
    }
    return success
  }, [editor, onInserted])

  useHotkeys(
    YOUTUBE_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleYoutube()
    },
    {
      enabled: isVisible && canInsert,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    isActive,
    handleYoutube,
    canInsert,
    label: "Add YouTube video",
    shortcutKeys: YOUTUBE_SHORTCUT_KEY,
    Icon: YoutubeIcon,
  }
}
