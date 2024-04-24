import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RecoveryPhraseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M10.3 7.625h5.736l-5.911 10.64v-7.14H3.939l4.266-9.75h3.486L9.604 6.597l-.412 1.028H10.3Z"
    />
  </Svg>
);
export default RecoveryPhraseIcon;
