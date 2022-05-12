import { RefObject, useEffect, useState } from 'react';
import {
  Canvas,
  RootState,
  extend,
  useFrame,
  useThree,
} from '@react-three/fiber';
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
// import { extend } from '@react-three/fiber';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import lato from '../../public/Lato_Black_Regular.json';
import OptionsList from './text3d';
import { useDrag } from '@use-gesture/react';
import { DragControls } from '../../lib/DragControls';
import { AspectRatio } from '@chakra-ui/react';
// import { DragControls } from 'three/examples/jsm/controls/DragControls';

extend({ DragControls });

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
    // if (!!cameraRef.current) {
    //   cameraRef.current.lookAt(1.5, 0.5, 0);
    // }
    // console.log(state.scene.children.at(0)); //scene has 0 children
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[-2.0, 4.5, 18.5]}
      />
      <OrbitControls
        position={[-2, 4.5, 15]}
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

  const [isDragging, setIsDragging] = useState(false);

  const pos = useRef({ x: 0, y: 0, z: 0 });
  // const pos = useRef<T.Mesh>();
  // const ex = new T.Mesh(
  //   new T.BoxGeometry(1, 1, Math.random() - 10),
  //   new T.MeshBasicMaterial({ color: 0xff00ff })
  // );

  // const handleCollision = () => {
  //   console.log('cube colliding');
  // };

  // set args here as well as through props down below
  // api is of type WorkerApi ref is of type RefObject<T.Object3D>
  // api is for physics stuff while ref is for position and camera and stuff
  const [cubeRef, api]: [cubeRef: RefObject<T.Mesh>, api: WorkerApi] = useBox(
    () => ({
      mass: 10,
      castShadow: true,
      args: [2, 2, 2],
      // onCollide: () => {
      //   handleCollision();
      // },
      ...props,
    })
  );

  const check = useThree();
  const aspect = check.size.width / check.viewport.width;

  const bind = useDrag((gestureInfo) => {
    gestureInfo.event.stopPropagation();
    console.log('gestureInfo', gestureInfo.active);
    console.log('xy', gestureInfo.xy);
    console.log('movement', gestureInfo.movement);
    console.log('box ref', pos.current);
    console.log('mouse width', check.mouse.width);
    console.log('useThree cam', check.camera);

    gestureInfo.xy[0] = (gestureInfo.movement[0] / check.size.width) * 2 - 1;
    gestureInfo.xy[1] = (gestureInfo.movement[1] / check.size.height) * 2 + 1;

    api.position.set(
      (gestureInfo.xy[0] - check.size.width / 2) / aspect,
      -(gestureInfo.xy[1] - check.size.height / 2) / aspect,
      10
    );
    // pos.current.x + gestureInfo.movement[0] / aspect,
    //   pos.current.y + gestureInfo.movement[1] / aspect,
    //   0;
  });

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
    if (!!active) {
      // console.log(pos.current);
      props.camera.lookAt(pos.current.x, pos.current.y, pos.current.z);
      // THIS FOLLOWING METHOD will not work because it will only use the initial position.
      // ...to get the api position of physics object we subscribe to it in useEffect
      // if (!!cubeRef.current) {
      //   console.log(cubeRef.current.position);
      //   props.camera.lookAt(
      //     cubeRef.current.position.x,
      //     cubeRef.current.position.y,
      //     cubeRef.current.position.z
      //   );
      // }
    }
  });

  return (
    //also set args here
    // we could use mesh and boxGeometry but <Box /> from drei is better
    <group>
      <Box
        {...bind()}
        receiveShadow
        castShadow
        args={[2, 2, 2]}
        ref={cubeRef}
        // onClick={() => click(!clicked)}
        // onPointerDown={(e) => {
        //   setActive(!active);
        //   e.stopPropagation();
        // }}
        // onPointerOver={(e) => {
        //   hover(true);
        //   e.stopPropagation();
        // }}
        // onPointerOut={() => hover(false)}
        // onPointerOut={() => setActive(!active)}
      >
        <meshStandardMaterial
          metalness={1.0}
          color='darkorange'
          transparent={true}
          opacity={0.8}
        />
      </Box>
      {/* <primitive object={ex} /> */}
      {/* <dragControls args={[[pos], check.camera, check.gl.domElement]} /> */}
    </group>
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
            {/* <OptionsList /> */}
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
};

export default BlocksScene;
