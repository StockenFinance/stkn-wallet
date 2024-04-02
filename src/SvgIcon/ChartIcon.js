import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ChartIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#F19220"
      d="M13.125 4.375h-3.5v8.75H8.75V0h-3.5v13.125h-.875V7h-3.5v6.125H0V14h14v-.875h-.875v-8.75Z"
    />
  </Svg>
);
export default ChartIcon;
