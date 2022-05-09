import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import lato from '../../public/Lato_Black_Regular.json';
import { useSpring } from '@react-spring/three';
import { useState, useRef } from 'react';
import * as T from 'three';

extend({ TextGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const OptionsList = () => {
  const font = new FontLoader().parse(lato);
  const [clicked, click] = useState(false);

  console.log(clicked);

  return (
    <>
      <mesh
        position={[1.5, 2.0, 0]}
        onClick={() => {
          click(!clicked);
        }}
        scale={clicked ? 1.5 : 1.0}
      >
        <textGeometry args={['-> test', { font, size: 0.3, height: 0.1 }]} />
        <meshPhysicalMaterial attach='material' color={'purple'} />
      </mesh>
    </>
  );
};

export default OptionsList;
