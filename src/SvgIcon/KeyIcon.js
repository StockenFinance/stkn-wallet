import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const KeyIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M10.764 10.833A5.002 5.002 0 0 1 .834 10a5 5 0 0 1 9.93-.833h8.403v1.666H17.5v3.334h-1.667v-3.334h-1.666v3.334H12.5v-3.334h-1.736Zm-4.93 2.5a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default KeyIcon;
