import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LanguageIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.833 11a9.167 9.167 0 1 0 18.334 0 9.167 9.167 0 0 0-18.334 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.917 1.879s2.75 3.62 2.75 9.12c0 5.5-2.75 9.122-2.75 9.122M10.083 20.121S7.333 16.5 7.333 11s2.75-9.121 2.75-9.121M2.41 14.208h17.18M2.41 7.792h17.18"
    />
  </Svg>
);
export default LanguageIcon;
