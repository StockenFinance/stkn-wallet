import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SwapIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G
      stroke={color ? color : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M3 17h2.397a5 5 0 0 0 4.096-2.133l.177-.253m3.66-5.227.177-.254A5 5 0 0 1 17.603 7H21" />
      <Path d="m18 4 3 3-3 3M3 7h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734A5 5 0 0 0 17.603 17H21" />
      <Path d="m18 20 3-3-3-3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SwapIcon;
