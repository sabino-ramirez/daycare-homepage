import { extend, useThree } from "@react-three/fiber";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Text } from "@react-three/drei";

// extend({ TextGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const OptionsList = ({ children }: { children: string }) => {
  // const font = new FontLoader().parse(lato);
  // const [clicked, click] = useState(false);

  // console.log(clicked);
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Text
        position={[14, 9, -5]}
        rotation={[0, -Math.PI/10, 0]}
        lineHeight={0.5}
        // font="/Ki-Medium.ttf"
        fontSize={width / 10}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
        onClick={() => console.log('clicked')}
      >
        {children}
      </Text>
      {/* <mesh */}
      {/*   position={[3.5, 4.5, 0]} */}
      {/*   onClick={() => { */}
      {/*     click(!clicked); */}
      {/*   }} */}
      {/*   scale={clicked ? 1.5 : 1.0} */}
      {/* > */}
      {/*   <textGeometry args={["-> test", { font, size: 0.8, height: 0.1 }]} /> */}
      {/*   <meshPhysicalMaterial attach="material" color={"white"} /> */}
      {/* </mesh> */}
    </>
  );
};

export default OptionsList;
