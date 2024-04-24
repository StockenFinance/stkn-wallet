import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#03C121"
      d="M18 35.063A17.063 17.063 0 1 1 18 .937a17.063 17.063 0 0 1 0 34.126Zm0-31.5a14.437 14.437 0 1 0 0 28.874 14.437 14.437 0 0 0 0-28.874Z"
    />
    <Path
      fill="#03C121"
      d="M18 27.188a1.313 1.313 0 0 1-1.313-1.313v-15.75a1.313 1.313 0 0 1 2.625 0v15.75A1.313 1.313 0 0 1 18 27.188Z"
    />
    <Path
      fill="#03C121"
      d="M25.875 19.313h-15.75a1.313 1.313 0 0 1 0-2.625h15.75a1.313 1.313 0 0 1 0 2.625Z"
    />
  </Svg>
);
export default PlusIcon;
