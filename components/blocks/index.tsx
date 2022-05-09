import { Canvas } from '@react-three/fiber';
import * as T from 'three';
import { angleToRadians } from '../../lib/angleToRadians';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import lato from '../../public/Lato_Black_Regular.json';
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
    if (!!cameraRef.current) {
      cameraRef.current.lookAt(1.5, 0.5, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[1.0, 1.0, 9.5]}
      />
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
  const [cubeRef]: any = useBox(() => ({
    mass: 2,
    castShadow: true,
    // args: [2, 2, 2],
    ...props,
  }));

  // useFrame(({ clock }) =>
  //   api.position.set(Math.sin(clock.getElapsedTime()) * 5, 0, 0)
  // );

  return (
    <mesh receiveShadow castShadow ref={cubeRef}>
      <boxGeometry />
      <meshStandardMaterial color='yellow' />
    </mesh>
  );
};

const PlaneSetup = (props: any) => {
  const [planeRef]: any = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={'lightgray'} />
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
          {/* top */}
          <Cube
            position={[-1.0, 16.5, -0.5]}
            castShadow
            rotation={[0, 0, angleToRadians(15)]}
          />
          {/* bottom left */}
          <Cube position={[-1.5, 8.0, 0.0]} rotation={[0, 0, 0]} />
          <Cube position={[-0.7, 13.0, -0.2]} rotation={[0, 0, 0]} />
          {/* bottom right */}
          <Cube
            position={[0.0, 8.5, 0.0]}
            rotation={[-angleToRadians(25), 0, 0]}
          />
          <PlaneSetup
            rotation={[-angleToRadians(90), 0, 0]}
            position={[0, -1, 0]}
          />
          <OptionsList />
        </Physics>
      </Canvas>
    </>
  );
};

export default BlocksScene;
