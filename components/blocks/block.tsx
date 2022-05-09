import * as T from 'three';
import { useRef, useState, useEffect } from 'react';

const Block = (props: JSX.IntrinsicElements['mesh']) => {
  const blockRef = useRef<T.Mesh>(null);

  return (
    <>
      <mesh {...props} ref={blockRef} receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={'yellow'} />
      </mesh>
    </>
  );
};

export default Block;
