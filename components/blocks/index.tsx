import { RefObject, useContext, useEffect, useState } from 'react';
import { Canvas, RootState, useFrame } from '@react-three/fiber';
import * as T from 'three';
import { angleToRadians } from '../../lib/angleToRadians';
import { useRef } from 'react';
import { Box, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import {
  WorkerApi,
  Debug,
  Physics,
  useBox,
  usePlane,
} from '@react-three/cannon';
import { createContext } from 'vm';
import { useDragConstraint, Cursor } from '../../helpers/drag';
import Block from './block';
// import OptionsList from './text3d';

// set up CameraAndLights
// @cam
const CameraAndLights = () => {
  const cameraRef = useRef<T.Camera>(null);
  const orbitControlsRef = useRef<any>(null);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[2.0, 3.5, 10]}
      />
      {/* <OrbitControls */}
      {/*   position={[-2, 4.5, 15]} */}
      {/*   ref={orbitControlsRef} */}
      {/*   maxPolarAngle={angleToRadians(90)} */}
      {/* /> */}
      <ambientLight intensity={0.5} />
      <pointLight
        args={['white', 0.8]}
        // position={[-3, 5, 5]}
        position={[0, 5, 0]}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
    </>
  );
};

// set up plane
// @plane
const PlaneSetup = (props: any) => {
  const [planeRef]: any = usePlane(() => ({
    mass: 10,
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static',
    collisionResponse: true,
    material: { friction: 10, restitution: 10 },
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color={'gray'} />
      {/* <shadowMaterial color={'grey'} /> */}
    </mesh>
  );
};

// @drag
const DaycareBlock = (...props: any) => {
  // const parent = useContext(context);

  const [ref] = useBox(() => ({
    mass: 10,
    castShadow: true,
    args: [3, 3, 3],
    position: [0, 15, 0],
    rotation: [-angleToRadians(42), 0, 0],
    linearDamping: 0.99,
    ...props,
  }));

  const bind = useDragConstraint(ref);
  useFrame((state) => {
    // if (!!ref.current) {
    //   state.camera.lookAt(
    //     ref.current.position.x,
    //     ref.current.position.z,
    //     ref.current.position.z
    //   );
    // }
  });

  return <Block castShadow receiveShadow ref={ref} {...props} {...bind} />;
};

// set up cubes
// @cube
// const Cube = (props: any) => {
//   const [hovered, hover] = useState<Boolean>(false);
//   const pos = useRef({ x: 0, y: 0, z: 0 });

//   useEffect(
//     () =>
//       api.position.subscribe((subscriptionData) => {
//         // console.log(subscriptionData);
//         pos.current.x = subscriptionData[0];
//         pos.current.y = subscriptionData[1];
//         pos.current.z = subscriptionData[2];
//       }),
//     []
//   );

//   // set args here as well as through props down below
//   // api is of type WorkerApi ref is of type RefObject<T.Object3D>
//   // api is for physics stuff while ref is for position and camera and stuff
//   const [cubeRef, api]: [cubeRef: RefObject<T.Mesh>, api: WorkerApi] = useBox(
//     () => ({
//       mass: 10,
//       castShadow: true,
//       args: [2, 2, 2],
//       ...props,
//     })
//   );

//   useFrame((props: RootState) => {
//     if (!!hovered) {
//       console.log(hovered);

//       // api.position.set(0, 2, 0)
//       api.position.set(pos.current.x, 0.2, pos.current.z);

//       // if (!!cubeRef.current) {
//       //   cubeRef.current.position.y += 5
//       // }
//     }
//   });

//   return (
//     //also set args here
//     // we could use mesh and boxGeometry but <Box /> from drei is better
//     <group>
//       <Box
//         receiveShadow
//         castShadow
//         args={[2, 2, 2]}
//         ref={cubeRef}
//         onPointerOver={(e) => {
//           hover(true);
//           e.stopPropagation();
//         }}
//         onPointerOut={() => hover(false)}
//       >
//         <meshStandardMaterial
//           metalness={1.0}
//           color='pink'
//           transparent={true}
//           opacity={1}
//         />
//       </Box>
//     </group>
//   );
// };

const BlocksScene = (props: any) => {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [-6, 12, 30], fov: 25, near: 1, far: 100 }}
      >
        {/* <CameraAndLights /> */}
        {/* <fog attach="fog" args={["#171720", 60, 90]} /> */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 25, 15]} args={['white']} />
        <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
          {/* third */}
          {/* <Cube */}
          {/*   position={[-2.0, 20.5, -0.5]} */}
          {/*   castShadow */}
          {/*   rotation={[0, 0, angleToRadians(15)]} */}
          {/* /> */}
          {/* second */}
          {/* <Cube */}
          {/*   position={[-0.5, 15.5, 1.5]} */}
          {/*   castShadow */}
          {/*   rotation={[0, 0, angleToRadians(15)]} */}
          {/* /> */}
          {/* first */}
          {/* <Cube */}
          {/*   position={[0.0, 10.5, 0.0]} */}
          {/*   rotation={[-angleToRadians(25), 0, 0]} */}
          {/* /> */}
          {/* x plane (actual floor) */}

          <PlaneSetup
            rotation={[-angleToRadians(90), 0, 0]}
            position={[0, -1, 0]}
          />
          <Cursor />
          <DaycareBlock {...props} />
        </Physics>
      </Canvas>
    </>
  );
};

export default BlocksScene;
