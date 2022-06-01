import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { useDragConstraint } from "../../helpers/drag";

const DaycareBlock = (props: any) => {
  const [ref] = useBox(() => ({
    mass: 10,
    castShadow: true,
    args: [3.5, 3.5, 3.5],
    position: [0, 10, 0],
    rotation: [Math.PI / 4, Math.PI / 4, Math.PI / 8],
    linearDamping: 0.99,
    ...props,
  }));

  const bind = useDragConstraint(ref);

  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <RoundedBox
        receiveShadow
        castShadow
        args={[3.5, 3.5, 3.5]}
        ref={ref}
        {...props}
        {...bind}
      >
        <meshStandardMaterial
          color={"lightblue"}
          transparent={true}
          opacity={1}
          metalness={1}
        />
      </RoundedBox>
    </>
  );
};

export default DaycareBlock;
