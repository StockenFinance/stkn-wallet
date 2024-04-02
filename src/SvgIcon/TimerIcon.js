import * as React from "react";
import Svg, { Path } from "react-native-svg";
const TimerIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#808BA0"
      fillRule="evenodd"
      d="M9.45 0C6.3 0 3.51 1.71 2.07 4.32L0 2.25V8.1h5.85L3.33 5.58C4.5 3.33 6.75 1.8 9.45 1.8c3.69 0 6.75 3.06 6.75 6.75s-3.06 6.75-6.75 6.75c-2.97 0-5.4-1.89-6.39-4.5H1.17c.99 3.6 4.32 6.3 8.28 6.3 4.77 0 8.55-3.87 8.55-8.55C18 3.87 14.13 0 9.45 0ZM8.1 4.5v4.59l4.23 2.52.72-1.17-3.6-2.16V4.5H8.1Z"
      clipRule="evenodd"
      opacity={0.9}
    />
  </Svg>
);
export default TimerIcon;
