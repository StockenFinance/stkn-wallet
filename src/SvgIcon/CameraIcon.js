import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CameraIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={70}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F12020"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m2 2 66 66M62 62H8a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6h9m9-9h18l6 9h12a6 6 0 0 1 6 6v28.02m-23.16-6.18a12 12 0 1 1-16.68-16.68"
    />
  </Svg>
);
export default CameraIcon;
