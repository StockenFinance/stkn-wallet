import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const OptionIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={2}
    height={12}
    fill="none"
    {...props}
  >
    <Circle cx={1} cy={1} r={1} fill="#253452" />
    <Circle cx={1} cy={6} r={1} fill="#253452" />
    <Circle cx={1} cy={11} r={1} fill="#253452" />
  </Svg>
);
export default OptionIcon;
