import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

const MenuIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M3 5h18M3 12h18M3 19h18"
      stroke={props.color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default MenuIcon
