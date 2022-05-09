import * as T from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import Block from './block';
import Plane from './plane';
import { angleToRadians } from '../../lib/angleToRadians';

const Blocks = () => {
  const orbitControlsRef = useRef<any>(null);

  // useFrame((state) => {
  //   if (!!orbitControlsRef.current) {
  //     const { x, y } = state.mouse;
  //     orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(180));
  //     orbitControlsRef.current.setPolarAngle((y + 1.5) * angleToRadians(45));
  //     orbitControlsRef.current.update();
  //   }
  //   // ref.current.position.y = elapsed;
  //   // ref.current.position.y = Math.sin(elapsed * 1.5) + 1.5;
  //   // console.log(cameraRef.current.position);
  //   // cameraRef.current.position.y = Math.sin(elapsed * 2) + 1.5;
  //   // cameraRef.current.lookAt(blockRef.current.position);
  //   // cameraRef.current.lookAt(0, 4, 0);
  // });

  return (
    <Canvas shadows>
      <ambientLight intensity={0.25} />
      <pointLight args={['white', 0.8]} position={[-3, 5, 3]} castShadow />
      {/* <Environment background> */}
      {/*   <mesh> */}
      {/*     <sphereGeometry args={[50, 100, 100]} /> */}
      {/*     <meshBasicMaterial side={T.BackSide} color={'gray'} /> */}
      {/*   </mesh> */}
      {/* </Environment> */}
      {/* <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 1, 14]} /> */}
      <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={angleToRadians(90)}
      />
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
      <Plane position={[0, 0, -0.5]} rotation={[-angleToRadians(90), 0, 0]} />
    </Canvas>
  );
};

export default Blocks;
