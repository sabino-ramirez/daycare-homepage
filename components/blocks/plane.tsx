import * as T from "three";
import { useRef } from "react";
import { usePlane } from "@react-three/cannon";
import { angleToRadians } from "../../lib/angleToRadians";

const Plane = (props: JSX.IntrinsicElements["mesh"]) => {
  const planeRef = useRef<T.Mesh>(null);

  // useEffect(() => {
  //   if (!!planeRef.current) {
  //     // console.log(ref.current);
  //
  //     gsap.from(planeRef.current.position, {
  //       x: 0,
  //       y: 0,
  //       z: -100,
  //       duration: 2,
  //       ease: 'expo.out',
  //     });
  //   }
  // }, [planeRef.current]);

  return (
    <>
      <mesh
        {...props}
        ref={planeRef}
        rotation={[-angleToRadians(90), 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={"lightgrey"} />
      </mesh>
    </>
  );
};

export default Plane;
