import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowBackIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke={props.color || "currentColor"}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <Path d="m12 19-7-7 7-7M19 12H5" />
  </Svg>
);
export default ArrowBackIcon;
