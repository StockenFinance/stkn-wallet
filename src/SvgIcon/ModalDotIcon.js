import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";
const ModalDotIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={19}
    fill="none"
    {...props}
  >
    <Circle cx={8.5} cy={5.554} r={1.063} fill="#fff" />
    <Circle cx={8.5} cy={12.992} r={1.063} fill="#fff" />
    <Circle cx={8.5} cy={9.273} r={1.063} fill="#fff" />
    <Rect width={16} height={18} x={0.5} y={0.5} stroke="#fff" rx={5.5} />
  </Svg>
);
export default ModalDotIcon;
