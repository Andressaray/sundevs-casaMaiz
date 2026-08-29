import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"

const ReservationIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Rect
      x={3}
      y={4}
      width={18}
      height={16}
      rx={2}
      stroke={props.color || "currentColor"}
      strokeWidth={1.5}
    />
    <Path
      d="M16 2v4M8 2v4M3 10h18"
      stroke={props.color || "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
)

export default ReservationIcon
