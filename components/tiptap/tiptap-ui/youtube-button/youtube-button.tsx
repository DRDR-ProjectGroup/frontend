"use client"

import { forwardRef, useCallback } from "react"

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type { UseYoutubeConfig } from "@/components/tiptap/tiptap-ui/youtube-button"
import {
  YOUTUBE_SHORTCUT_KEY,
  useYoutube,
} from "@/components/tiptap/tiptap-ui/youtube-button"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap/tiptap-ui-primitive/badge"

type IconProps = React.SVGProps<SVGSVGElement>
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement

export interface YoutubeButtonProps
  extends Omit<ButtonProps, "type">,
    UseYoutubeConfig {
  text?: string
  showShortcut?: boolean
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>
}

export function YoutubeShortcutBadge({
  shortcutKeys = YOUTUBE_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}

export const YoutubeButton = forwardRef<
  HTMLButtonElement,
  YoutubeButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onInserted,
      showShortcut = false,
      onClick,
      icon: CustomIcon,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      canInsert,
      handleYoutube,
      label,
      isActive,
      shortcutKeys,
      Icon,
    } = useYoutube({
      editor,
      hideWhenUnavailable,
      onInserted,
    })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleYoutube()
      },
      [handleYoutube, onClick]
    )

    if (!isVisible) {
      return null
    }

    const RenderIcon = CustomIcon ?? Icon

    return (
      <Button
        type="button"
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <RenderIcon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && <YoutubeShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    )
  }
)

YoutubeButton.displayName = "YoutubeButton"
