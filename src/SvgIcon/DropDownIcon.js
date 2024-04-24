import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DropDownIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#253452"
      d="m4.057 5.625-.682.728L9 12.375l5.625-6.022-.678-.728L9 10.916 4.057 5.625Z"
    />
  </Svg>
);
export default DropDownIcon;
