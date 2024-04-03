import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const CustomTokenIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={9.25} stroke="#fff" strokeWidth={1.5} />
    <Circle cx={10} cy={10} r={1.977} stroke="#fff" strokeWidth={1.5} />
  </Svg>
);
export default CustomTokenIcon;
