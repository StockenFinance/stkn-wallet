import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ImportIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#0065EC"
      d="M25.75 17a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 1-1.25 1.25H5.75a1.25 1.25 0 0 1-1.25-1.25v-5a1.25 1.25 0 0 0-2.5 0v5A3.75 3.75 0 0 0 5.75 27h17.5A3.75 3.75 0 0 0 27 23.25v-5A1.25 1.25 0 0 0 25.75 17Zm-12.137 2.137c.118.114.259.203.412.263a1.175 1.175 0 0 0 .95 0 1.25 1.25 0 0 0 .412-.262l5-5a1.255 1.255 0 1 0-1.774-1.775l-2.863 2.875V3.25a1.25 1.25 0 0 0-2.5 0v11.988l-2.863-2.875a1.256 1.256 0 0 0-1.774 1.774l5 5Z"
    />
  </Svg>
);
export default ImportIcon;
