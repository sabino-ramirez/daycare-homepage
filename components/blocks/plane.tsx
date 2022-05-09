import * as T from 'three';
import { useRef, useState, useEffect } from 'react';

const Plane = (props: JSX.IntrinsicElements['mesh']) => {
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
      <mesh {...props} ref={planeRef} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={'lightblue'} />
      </mesh>
    </>
  );
};

export default Plane;
