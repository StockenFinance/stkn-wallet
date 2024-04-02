import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DiamondIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill={color ? color : "none"}
      d="m19.223 15.273-1.947-1.883-3.634 3.602 1.923 1.906 3.658-3.625ZM10.008 13.39l-1.951 1.883 3.661 3.625 1.923-1.906-3.633-3.602Z"
    />
    <Path
      fill={color ? color : "none"}
      d="m13.643 16.991-1.923 1.907 1.923 1.906 1.923-1.906-1.923-1.907ZM21.6 2.212l-.462-.45-6.705 6.686 1.92 1.906 6.715-6.689L21.6 2.212ZM18.358 12.324l1.923 1.906 4.789-4.745-1.923-1.906-4.788 4.745ZM24.171 4.781l-1.947 1.882.925.916 1.926-1.906-.904-.892Z"
    />
    <Path
      fill={color ? color : "none"}
      d="m25.075 5.673-1.926 1.906 1.922 1.906 1.927-1.906-1.923-1.906ZM2.83 4.492l1.946 1.88-.925.918-1.926-1.906.904-.892ZM1.923 5.384 3.849 7.29 1.923 9.196 0 7.29l1.923-1.906ZM8.412 11.8l-1.947 1.883 3.658 3.625 1.923-1.906L8.412 11.8Z"
    />
    <Path
      fill={color ? color : "none"}
      d="M3.85 7.29 1.925 9.197l3.526 3.496 1.92-1.913-3.52-3.49ZM3.666 3.624h19.359L20.326.945H6.365l-2.699 2.68Z"
    />
    <Path
      fill={color ? color : "none"}
      d="m5.58 1.725-1.923 1.91 13.639 13.54 1.95-1.882L5.58 1.725Z"
    />
    <Path
      fill={color ? color : "none"}
      d="m13.789 16.048 2.702 1.127-1.916-1.906-.786.78ZM18.392 3.702l3.095.739.779-.776-.042-.041-3.745-.01-.087.088Z"
      opacity={0.22}
    />
  </Svg>
);
export default DiamondIcon;
