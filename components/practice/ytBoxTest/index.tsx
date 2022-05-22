import * as T from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { angleToRadians } from "../../../lib/angleToRadians";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import gsap from "gsap";

const clock = new T.Clock();
const elapsed = clock.getElapsedTime();

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
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};

const Block = (props: JSX.IntrinsicElements["mesh"]) => {
  // this reference gives direct access to the THREE.Mesh object
  const blockRef = useRef<T.Mesh>(null!);
  const cameraRef = useRef<T.Camera>(null!);
  const orbitControlsRef = useRef<any>(null!);

  // set some state for hover and click events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // rotate mesh every frame, this is a react/three feature
  useFrame((state) => {
    //   if (!!orbitControlsRef.current) {
    //     const { x, y } = state.mouse;
    //     orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(180));
    //     orbitControlsRef.current.setPolarAngle((y + 1.5) * angleToRadians(45));
    //     orbitControlsRef.current.update();
    //   }

    // ref.current.position.y = elapsed;
    // ref.current.position.y = Math.sin(elapsed * 1.5) + 1.5;
    // console.log(cameraRef.current.position);
    // cameraRef.current.position.y = Math.sin(elapsed * 2) + 1.5;
    cameraRef.current.lookAt(blockRef.current.position);
    // cameraRef.current.lookAt(0, 4, 0);
  });

  useEffect(() => {
    if (!!blockRef.current) {
      // console.log(ref.current);

      gsap.from(blockRef.current.position, {
        x: 8,
        y: 5.0,
        duration: 2,
        ease: "expo.out",
      });
    }
  }, [blockRef.current]);

  const clickBounce = () => {
    // console.log(clicked);

    if (!!blockRef.current) {
      console.log(clicked);
      // console.log(blockRef.current);

      gsap.to(
        blockRef.current.position,
        clicked
          ? {
              y: 3.0,
              // delay: 0.4,
              duration: 2,
              ease: "elastic.out",
            }
          : {
              // x: 4.5,
              y: 0.5,
              delay: 0.4,
              duration: 3,
              ease: "bounce.out",
            }
      );
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 1, 14]} />
      <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={angleToRadians(90)}
      />
      <mesh
        {...props}
        ref={blockRef}
        // scale={clicked ? 1.5 : 1}
        // onClick={() => click(!clicked)}
        // onClick={() => {
        //   click(!clicked);
        //   clickBounce();
        // }}

        // onPointerOver={() => hover(true)}
        // onPointerOut={() => hover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={"yellow"}
          metalness={1}
          wireframe={false}
        />
      </mesh>
      {/* <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow> */}
      {/*   <planeGeometry args={[10, 10]} /> */}
      {/*   <meshStandardMaterial color={hovered ? 'blue' : 'green'} /> */}
      {/* </mesh> */}
    </>
  );
};

export const MyBlock = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.25} />
      <pointLight args={["white", 0.8]} position={[-3, 5, 3]} castShadow />
      {/* <pointLight args={['white', 1]} position={[-5, 5, 3]} /> */}
      {/* <spotLight args={['white', 1]} position={[-5, 5, 3]} /> */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={T.BackSide} color={"gray"} />
        </mesh>
      </Environment>
      {/* top */}
      <Block
        position={[-0.75, 3.2, 0.0]}
        castShadow
        rotation={[0, 0, angleToRadians(15)]}
      />
      {/* bottom left */}
      <Block position={[-1.2, 1.0, 0.0]} castShadow />
      {/* bottom right */}
      <Block
        position={[1.1, 1.4, 0.0]}
        rotation={[0, 0, -angleToRadians(25)]}
        castShadow
      />
      <Plane position={[0, 0, -0.5]} />
      {/* <mesh receiveShadow> */}
      {/*   <planeGeometry args={[10, 10]} /> */}
      {/*   <meshStandardMaterial color={'green'} /> */}
      {/* </mesh> */}
    </Canvas>
  );
};
