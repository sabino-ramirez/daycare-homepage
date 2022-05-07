import * as T from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { angleToRadians } from '../../lib/angleToRadians';
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import gsap from 'gsap';

const SphereSetup = (props: JSX.IntrinsicElements['mesh']) => {
  // this reference gives direct access to the THREE.Mesh object
  const ref = useRef<T.Mesh>(null!);
  const cameraRef = useRef<T.Camera>(null!);
  const orbitControlsRef = useRef<any>(null!);

  // set some state for hover and click events
  // const [hovered, hover] = useState(false);
  // const [clicked, click] = useState(false);

  const clock = new T.Clock();

  // rotate mesh every frame, this is a react/three feature
  useFrame((state) => {
    const elapsed = clock.getElapsedTime();

    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(180));
      orbitControlsRef.current.setPolarAngle((y + 1.5) * angleToRadians(45));
      orbitControlsRef.current.update();
    }

    // ref.current.position.y = elapsed;
    // ref.current.position.y = Math.sin(elapsed * 1.5) + 1.5;
    // console.log(cameraRef.current.position);
    // cameraRef.current.position.y = Math.sin(elapsed * 2) + 1.5;
    // cameraRef.current.lookAt(0, 1, 5);
  });

  useEffect(() => {
    if (!!ref.current) {
      // console.log(ref.current);

      gsap.to(ref.current.position, {
        x: 4.5,
        duration: 2,
      });
    }
  }, [ref.current]);

  // useEffect(() => {
  //   if (!!orbitControlsRef.current) {
  //     console.log(orbitControlsRef.current);
  //   }
  // });

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 1, 8]} />
      <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={angleToRadians(89)}
      />
      <mesh
        {...props}
        ref={ref}
        // scale={clicked ? 1.5 : 1}
        // onClick={() => click(!clicked)}
        // onPointerOver={() => hover(true)}
        // onPointerOut={() => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'yellow'} metalness={1} />
      </mesh>
      {/* <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow> */}
      {/*   <planeGeometry args={[10, 10]} /> */}
      {/*   <meshStandardMaterial color={hovered ? 'blue' : 'green'} /> */}
      {/* </mesh> */}
    </>
  );
};

export const MySphere = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.25} />
      <pointLight args={['white', 0.8]} position={[-3, 5, 3]} castShadow />
      {/* <pointLight args={['white', 1]} position={[-5, 5, 3]} /> */}
      {/* <spotLight args={['white', 1]} position={[-5, 5, 3]} /> */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={T.BackSide} color={'gray'} />
        </mesh>
      </Environment>
      <SphereSetup position={[0, 0.5, 0]} castShadow />
      {/* <SphereSetup position={[-1.5, 0.5, 0]} castShadow /> */}
      {/* <SphereSetup position={[1.5, 0.5, 0]} castShadow /> */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={'green'} />
      </mesh>
    </Canvas>
  );
};
