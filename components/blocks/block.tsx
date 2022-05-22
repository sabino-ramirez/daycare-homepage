import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";

const Block = forwardRef(
  (
    {
      children,
      transparent = true,
      opacity = 1,
      color = "lightblue",
      args = [3, 3, 3],
      metalness = 1,
      ...props
    },
    ref
  ) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
          metalness={metalness}
        />
      </RoundedBox>
    );
  }
);

export default Block;
