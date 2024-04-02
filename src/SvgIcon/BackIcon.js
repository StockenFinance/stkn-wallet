import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const BackIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#253452"
        d="M16.667 9.167H6.525l4.654-4.654L10 3.333 3.334 10 10 16.667l1.18-1.18-4.655-4.654h10.142V9.167Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BackIcon;
