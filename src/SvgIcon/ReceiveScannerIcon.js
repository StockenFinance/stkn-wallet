import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ReceiveScannerIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ? color : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.51 1H1.693A.694.694 0 0 0 1 1.694v3.815c0 .384.31.694.694.694h3.815c.384 0 .694-.31.694-.694V1.694A.694.694 0 0 0 5.51 1ZM5.51 9.672H1.693a.694.694 0 0 0-.694.694v3.815c0 .383.31.694.694.694h3.815c.384 0 .694-.31.694-.694v-3.815a.694.694 0 0 0-.694-.694ZM14.181 1h-3.815a.694.694 0 0 0-.694.694v3.815c0 .384.31.694.694.694h3.815c.383 0 .694-.31.694-.694V1.694A.694.694 0 0 0 14.181 1ZM9.672 9.672v2.081M9.672 14.875h3.122V9.672M12.793 11.06h2.081"
    />
  </Svg>
);
export default ReceiveScannerIcon;
