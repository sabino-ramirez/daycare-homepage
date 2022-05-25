import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const CameraAndLights = () => {
  // const ocRef = useRef<any>()

  // useFrame(() => {
  //   if (!!ocRef.current) {
  //     ocRef.current.update()
  //   }
  // })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[-12.0, 5.5, 30]}
      />
      {/* <OrbitControls */}
      {/*   makeDefault */}
      {/*   position={[-2, 4.5, 15]} */}
      {/*   // ref={orbitControlsRef} */}
      {/*   maxPolarAngle={Math.PI / 2} */}
      {/*   panSpeed={5} */}
      {/* /> */}
      <ambientLight intensity={0.5} />
      <pointLight
        args={['white', 0.8]}
        // position={[-3, 5, 5]}
        position={[-5, 5, 8]}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
    </>
  );
};

export default CameraAndLights
