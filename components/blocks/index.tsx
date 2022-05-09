import { Canvas } from '@react-three/fiber';
import Block from './block';
import * as T from 'three';
import Plane from './plane';
import { angleToRadians } from '../../lib/angleToRadians';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';

// const Spin = ({ children }: any) => {
//   const blockRef = useRef<T.Group>(null);
//
//   useFrame(() => {
//     if (!!blockRef.current) {
//       blockRef.current.rotation.x += 0.01;
//     }
//   });
//
//   return <group ref={blockRef}>{children}</group>;
// };

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
      cameraRef.current.lookAt(1.5, 1.5, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 2, 8.0]} />
      <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={angleToRadians(90)}
      />
      <ambientLight intensity={0.25} />
      <pointLight args={['white', 0.8]} position={[-3, 5, 3]} castShadow />
    </>
  );
};

const Blocks = () => {
  return (
    <Canvas shadows>
      <CameraAndLights />
      {/* <Environment background> */}
      {/*   <mesh> */}
      {/*     <sphereGeometry args={[50, 100, 100]} /> */}
      {/*     <meshBasicMaterial side={T.BackSide} color={'gray'} /> */}
      {/*   </mesh> */}
      {/* </Environment> */}
      {/* top */}
      <Physics>
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
      </Physics>
    </Canvas>
  );
};

export default Blocks;
