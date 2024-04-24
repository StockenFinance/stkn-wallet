import * as React from "react";
import Svg, { Path } from "react-native-svg";
const WalletIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      fill={color ? color : "none"}
      d="M21.375 7.875H20.25V6.75a3.375 3.375 0 0 0-3.375-3.375H5.625A3.375 3.375 0 0 0 2.25 6.75v13.5a3.375 3.375 0 0 0 3.375 3.375h15.75a3.375 3.375 0 0 0 3.375-3.375v-9a3.375 3.375 0 0 0-3.375-3.375Zm-15.75-2.25h11.25A1.125 1.125 0 0 1 18 6.75v1.125H5.625a1.125 1.125 0 0 1 0-2.25ZM22.5 16.875h-1.125a1.125 1.125 0 1 1 0-2.25H22.5v2.25Zm0-4.5h-1.125a3.375 3.375 0 0 0 0 6.75H22.5v1.125a1.125 1.125 0 0 1-1.125 1.125H5.625A1.125 1.125 0 0 1 4.5 20.25V9.934c.361.127.742.192 1.125.191h15.75A1.125 1.125 0 0 1 22.5 11.25v1.125Z"
    />
  </Svg>
);
export default WalletIcon;
