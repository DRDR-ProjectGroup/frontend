import { memo } from "react"

type SvgProps = React.ComponentPropsWithoutRef<"svg">

export const VideoPlusIcon = memo(({ className, ...props }: SvgProps) => {
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
        d="M19 1C19.5523 1 20 1.44772 20 2V4H22C22.5523 4 23 4.44772 23 5C23 5.55228 22.5523 6 22 6H20V8C20 8.55228 19.5523 9 19 9C18.4477 9 18 8.55228 18 8V6H16C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4H18V2C18 1.44772 18.4477 1 19 1ZM4 7C4 5.34315 5.34315 4 7 4H12C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6H7C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7ZM9.5 14.1339V9.86607C9.5 9.2475 10.2095 8.8733 10.7277 9.23607L14.2277 11.3701C14.6957 11.6973 14.6957 12.3027 14.2277 12.6299L10.7277 14.7639C10.2095 15.1267 9.5 14.7525 9.5 14.1339Z"
        fill="currentColor"
      />
    </svg>
  )
})

VideoPlusIcon.displayName = "VideoPlusIcon"
