import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const LockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={18}
    fill="none"
    {...props}
  >
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M13.273 7.507h-1.181v-2.67C12.092 2.171 9.809.003 7 .003c-2.809 0-5.092 2.17-5.092 4.837v2.667H.74c-.405 0-.74.305-.74.689v8.066C0 17.221.829 18 1.84 18h10.334c1.01 0 1.826-.78 1.826-1.738V8.196c0-.384-.322-.69-.727-.69Zm-9.9-2.667c0-1.9 1.626-3.447 3.627-3.447 2 0 3.628 1.545 3.628 3.444v2.67H3.372V4.84Zm9.163 11.422c0 .192-.16.349-.362.349H1.839c-.202 0-.375-.157-.375-.349V8.896h11.072v7.366Z" />
      <Path d="M7 14.837c.405 0 .732-.312.732-.696v-2.503c0-.384-.327-.695-.732-.695-.405 0-.732.311-.732.695v2.503c0 .384.327.696.732.696Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h14v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LockIcon;
