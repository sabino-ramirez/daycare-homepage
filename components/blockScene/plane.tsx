import { usePlane } from "@react-three/cannon";

const PlaneSetup = (props: any) => {
  const [planeRef]: any = usePlane(() => ({
    mass: 10,
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static',
    collisionResponse: true,
    material: { friction: 10, restitution: 10 },
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={'gray'} />
      {/* <shadowMaterial color={'grey'} /> */}
    </mesh>
  );
};

export default PlaneSetup;
