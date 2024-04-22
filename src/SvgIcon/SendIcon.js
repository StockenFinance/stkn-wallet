import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SendIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ? color : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.75 8.5-2.375 7.125L15.625 8.5 1.375 1.375 3.75 8.5Zm0 0H8.5"
    />
  </Svg>
);
export default SendIcon;
