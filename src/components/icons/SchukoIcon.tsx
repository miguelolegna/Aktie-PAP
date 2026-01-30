import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SchukoIcon = (props: SvgProps) => (
  <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" {...props}>
    <Path fill={props.color || "#000"} d="M9.5 12A1.25 1.25 0 1 1 7 12a1.25 1.25 0 0 1 2.5 0ZM17 12a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
    <Path
      fill={props.color || "#000"}
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-11 7.938V18h2v1.938a8.001 8.001 0 0 0 0-15.876V6h-2V4.062a8.001 8.001 0 0 0 0 15.876Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SchukoIcon;