import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CHAdeMOIcon = (props: SvgProps) => (
  <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.color || "#000"}
      fillRule="evenodd"
      d="M13.5 2.2V2a2 2 0 0 0-4 0v.2a10 10 0 1 0 4 0Zm-2 17.8a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm5-5.75A1.25 1.25 0 1 1 15.25 13a1.25 1.25 0 0 1 1.25 1.25Zm-7.5 0A1.25 1.25 0 1 1 7.75 13 1.25 1.25 0 0 1 9 14.25Zm4-5.75A1.5 1.5 0 1 1 11.5 7 1.5 1.5 0 0 1 13 8.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CHAdeMOIcon;