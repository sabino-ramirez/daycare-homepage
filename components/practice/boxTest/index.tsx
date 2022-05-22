import * as T from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const BoxSetup = (props: JSX.IntrinsicElements["mesh"]) => {
  // this reference gives direct access to the THREE.Mesh object
  const ref = useRef<T.Mesh>(null!);

  // set some state for hover and click events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // rotate mesh every frame, this is a react/three feature
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[3, 2, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export const MyBox = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="gray" />
      </mesh>
      <BoxSetup position={[-2.2, 0, 0]} />
      <BoxSetup position={[2.2, 0, 0]} />
    </Canvas>
  );
};
