import { RefObject, useEffect, useState } from 'react';
import { Canvas, RootState } from '@react-three/fiber';
import * as T from 'three';
import { angleToRadians } from '../../lib/angleToRadians';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Box, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import {
  WorkerApi,
  Debug,
  Physics,
  useBox,
  usePlane,
} from '@react-three/cannon';
// import { extend } from '@react-three/fiber';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import lato from '../../public/Lato_Black_Regular.json';
import OptionsList from './text3d';

const CameraAndLights = () => {
  const cameraRef = useRef<T.Camera>(null);
  const orbitControlsRef = useRef<any>(null);

  useFrame((state) => {
    // if (!!orbitControlsRef.current) {
    //   const { x, y } = state.mouse;
    //   orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(180));
    //   orbitControlsRef.current.setPolarAngle((y + 1.5) * angleToRadians(45));
    //   orbitControlsRef.current.update();
    // }
    // ref.current.position.y = elapsed;
    // ref.current.position.y = Math.sin(elapsed * 1.5) + 1.5;
    // console.log(cameraRef.current.position);
    // cameraRef.current.position.y = Math.sin(elapsed * 2) + 1.5;
    // cameraRef.current.lookAt(blockRef.current.position);
    // if (!!cameraRef.current) {
    //   cameraRef.current.lookAt(1.5, 0.5, 0);
    // }
  });

  return (
    <>
      {/* <PerspectiveCamera */}
      {/*   makeDefault */}
      {/*   ref={cameraRef} */}
      {/*   position={[-2.0, 4.5, 18.5]} */}
      {/* /> */}
      <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={angleToRadians(90)}
      />
      <ambientLight intensity={0.25} />
      <pointLight
        args={['white', 0.8]}
        position={[-3, 5, 3]}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
    </>
  );
};

const Cube = (props: any) => {
  const [active, setActive] = useState<Boolean>(false);
  const [hovered, hover] = useState<Boolean>(false);
  const [clicked, click] = useState<Boolean>(false);

  const pos = useRef({ x: 0, y: 0, z: 0 });

  // const handleCollision = () => {
  //   console.log('cube colliding');
  // };

  // set args here as well as through props down below
  // api is of type WorkerApi ref is of type RefObject<T.Object3D>
  // api is for physics stuff while ref is for position and camera and stuff
  const [cubeRef, api]: [cubeRef: RefObject<T.Object3D>, api: WorkerApi] =
    useBox(() => ({
      mass: 10,
      castShadow: true,
      args: [2, 2, 2],
      // onCollide: () => {
      //   handleCollision();
      // },
      ...props,
    }));

  useEffect(
    () =>
      api.position.subscribe((subscriptionData) => {
        // console.log(subscriptionData);
        pos.current.x = subscriptionData[0];
        pos.current.y = subscriptionData[1];
        pos.current.z = subscriptionData[2];
      }),
    []
  );

  useFrame((props: RootState) => {
    // api.rotation.set(-Math.PI / 2 - props.mouse.y * 0.25, 0, 0);
    // console.log(cubeRef.current.position);
    // props.camera.position.x += 5;
    // if (!!props.controls) {
    //   props.controls.addEventListener('drag', (e) => console.log(e));
    // }
    // if (!!cubeRef.current) {
    //   cubeRef.current.addEventListener('click', (e) => {
    //     console.log(e);
    //   });
    // }
    // if (!!props.camera) {
    //   if (!!cubeRef.current) props.camera.lookAt(cubeRef.current.position);
    // }
    // if (!!clicked) {
    //   props.camera.lookAt(pos.current.x, pos.current.y, pos.current.z);
    //   // console.log(props.camera.lookAt.toString());
    // }
    // if (!!hovered) {
    //   // props.scene.rotation.x = -Math.PI;
    //   console.log(pos.current);
    //   // props.camera.lookAt(pos.current.x, pos.current.y, pos.current.z);
    //   // api.position.set(0, cubeRef.current?.position.y + 5, 0);
    // }
    if (!!active) {
      console.log(pos.current);
      props.camera.position.set(
        pos.current.x,
        pos.current.y + 8,
        pos.current.z
      );
      props.camera.lookAt(pos.current.x, pos.current.y, pos.current.z);
    }
  });

  return (
    //also set args here
    // we could use mesh and boxGeometry but <Box /> from drei is better
    <Box
      receiveShadow
      castShadow
      args={[2, 2, 2]}
      ref={cubeRef}
      // onClick={() => click(!clicked)}
      onPointerDown={(e) => {
        setActive(!active);
        e.stopPropagation();
      }}
      // onPointerOver={(e) => {
      //   hover(true);
      //   e.stopPropagation();
      // }}
      // onPointerOut={() => hover(false)}
      // onPointerOut={() => setActive(!active)}
    >
      <meshStandardMaterial metalness={1.0} color='pink' />
    </Box>
  );
};

const PlaneSetup = (props: any) => {
  const [planeRef]: any = usePlane(() => ({
    mass: 10,
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static',
    collisionResponse: props.shouldCollide ? true : false,
    material: { friction: 10, restitution: 10 },
    // onCollide: () => {
    //   console.log('collided');
    // },
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      {/* <planeGeometry args={[40, 40]} /> */}
      {/* <meshStandardMaterial color={'lightgray'} /> */}
      {/* <shadowMaterial color={'grey'} /> */}
    </mesh>
  );
};

// const OptionsList = () => {
//   const font = new FontLoader().parse(lato);
//
//   const handleClick = () => {
//     console.log('clicked');
//   };
//
//   return (
//     <>
//       <mesh position={[1.0, 1.0, 0]} onClick={() => handleClick()}>
//         <textGeometry args={['test', { font, size: 1, height: 1 }]} />
//         <meshPhysicalMaterial attach='material' color={'white'} />
//       </mesh>
//     </>
//   );
// };

const BlocksScene = () => {
  const bgColor = new T.Color(0x1a202c);
  return (
    <>
      <Canvas shadows>
        {/* <color attach='background' args={[bgColor]} /> */}
        <CameraAndLights />
        <Physics>
          <Debug color={'white'}>
            {/* fifth */}
            <Cube
              position={[-0.6, 48.5, 1.0]}
              castShadow
              rotation={[0, 0, angleToRadians(15)]}
            />
            {/* fourth */}
            <Cube
              position={[-2.0, 23.5, 0.0]}
              castShadow
              rotation={[0, 0, angleToRadians(15)]}
            />
            {/* third */}
            <Cube
              position={[-2.0, 20.5, -0.5]}
              castShadow
              rotation={[0, 0, angleToRadians(15)]}
            />
            {/* second */}
            <Cube
              position={[-0.5, 15.5, 1.5]}
              castShadow
              rotation={[0, 0, angleToRadians(15)]}
            />
            {/* first */}
            <Cube
              position={[0.0, 10.5, 0.0]}
              rotation={[-angleToRadians(25), 0, 0]}
            />
            {/* x plane (actual floor) */}
            <PlaneSetup
              shouldCollide={true}
              rotation={[-angleToRadians(90), 0, 0]}
              position={[0, -1, 0]}
            />
            {/* y plane */}
            {/* <PlaneSetup */}
            {/*   shouldCollide={false} */}
            {/*   rotation={[0, -angleToRadians(90), 0]} */}
            {/*   position={[0, 0, 0]} */}
            {/* /> */}
            {/* z plane */}
            {/* <PlaneSetup */}
            {/*   shouldCollide={false} */}
            {/*   rotation={[0, 0, -angleToRadians(90)]} */}
            {/*   position={[0, 0, 0]} */}
            {/* /> */}
            <OptionsList />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
};

export default BlocksScene;
