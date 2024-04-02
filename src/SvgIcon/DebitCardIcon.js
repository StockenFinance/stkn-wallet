import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DebitCardIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M18.26 13.913H1.74A1.74 1.74 0 0 1 0 12.173V1.74C0 .78.779 0 1.74 0h16.52C19.222 0 20 .779 20 1.74v10.434c0 .96-.779 1.739-1.74 1.739ZM.87 5.653h18.26v-1.74H.87v1.74Zm18.26-3.914a.87.87 0 0 0-.87-.87H1.74a.87.87 0 0 0-.87.87v1.304h18.26V1.74Zm0 4.783H.87v5.652c0 .48.39.87.87.87h16.52c.48 0 .87-.39.87-.87V6.522ZM10.87 9.13H9.13a.434.434 0 1 1 0-.87h1.74a.435.435 0 1 1 0 .87Zm-3.913 0H3.043a.434.434 0 1 1 0-.87h3.914a.435.435 0 1 1 0 .87Zm-3.914 1.305h2.61a.435.435 0 1 1 0 .87h-2.61a.434.434 0 1 1 0-.87Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DebitCardIcon;
