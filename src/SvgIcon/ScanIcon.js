import * as React from "react";
import Svg, { Path, Text } from "react-native-svg";
const ScanIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" {...props}>
    <Path
      d="M2 9V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1v4a1 1 0 0 1-2 0Zm25-7h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 1 1v4a1 1 0 0 0 2 0V5a3 3 0 0 0-3-3Zm2 20a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 0 0 2h4a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1ZM9 28H5a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 0 0 0-2ZM3 16a1 1 0 0 0 1 1h24a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1Z"
      data-name="Layer 2"
    />
    <Text
      y={47}
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      fontSize={5}
      fontWeight="bold"
    >
      {"Created by scorpicon"}
    </Text>
    <Text
      y={52}
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      fontSize={5}
      fontWeight="bold"
    >
      {"from the Noun Project"}
    </Text>
  </Svg>
);
export default ScanIcon;
