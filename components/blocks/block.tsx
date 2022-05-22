// import * as T from "three";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useBox } from "@react-three/cannon";

// const Block = (props: JSX.IntrinsicElements["mesh"]) => {
//   const blockRef = useRef<T.Mesh>(null);

//   // const [blockRef]: any = useBox(() => ({ mass: 1 }));

//   // useFrame(() => {
//   //   if (!!blockRef.current) {
//   //     blockRef.current.rotation.x += 0.01;
//   //   }
//   // });

//   return (
//     <>
//       <mesh {...props} ref={blockRef} receiveShadow>
//         <boxGeometry args={[2, 2, 2]} />
//         <meshStandardMaterial color={"lightblue"} />
//       </mesh>
//     </>
//   );
// };

// export default Block;

import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";

const Block = forwardRef(
  (
    {
      children,
      transparent = true,
      opacity = 0.98,
      color = "gold",
      args = [2, 2, 2],
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
          metalness={1}
        />
      </RoundedBox>
    );
  }
);

export default Block;
