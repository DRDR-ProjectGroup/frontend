import { memo } from "react"

type SvgProps = React.ComponentPropsWithoutRef<"svg">

export const YoutubeIcon = memo(({ className, ...props }: SvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.3803 5.54807C22.1633 5.77748 22.7796 6.39379 23.009 7.17684C23.4349 8.63348 23.4349 11.6667 23.4349 11.6667C23.4349 11.6667 23.4349 14.7 23.009 16.1566C22.7796 16.9397 22.1633 17.556 21.3803 17.7854C19.9236 18.2113 12.1088 18.2113 12.1088 18.2113C12.1088 18.2113 4.29401 18.2113 2.83738 17.7854C2.05433 17.556 1.43802 16.9397 1.20861 16.1566C0.782715 14.7 0.782715 11.6667 0.782715 11.6667C0.782715 11.6667 0.782715 8.63348 1.20861 7.17684C1.43802 6.39379 2.05433 5.77748 2.83738 5.54807C4.29401 5.12217 12.1088 5.12217 12.1088 5.12217C12.1088 5.12217 19.9236 5.12217 21.3803 5.54807ZM15.5459 11.6667L9.78027 15.0447V8.28871L15.5459 11.6667Z"
        fill="currentColor"
      />
    </svg>
  )
})

YoutubeIcon.displayName = "YoutubeIcon"
