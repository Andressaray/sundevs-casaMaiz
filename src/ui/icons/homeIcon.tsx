import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M3 10l9-8 9 8v11a1 1 0 01-1 1h-3v-6h-8v6H4a1 1 0 01-1-1z"
      stroke={props.color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
)

export default HomeIcon
