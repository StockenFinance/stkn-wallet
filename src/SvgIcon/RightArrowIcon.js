import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RightArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#B6BDC8"
      d="M-.001 7.5H10.14l-4.654 4.654 1.18 1.18 6.666-6.667L6.665 0 5.486 1.18l4.654 4.653H0V7.5Z"
    />
  </Svg>
);
export default RightArrowIcon;
