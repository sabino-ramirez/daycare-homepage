// import { RefObject, useContext, useEffect, useState, useRef } from 'react';
import { Canvas /*useThree*/ } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import { Cursor } from "../../helpers/drag";
import OptionsList from "./text3d";
import DaycareBlock from "./block";
import PlaneSetup from "./plane";
import CameraAndLights from "./camAndLight";

const BlocksScene = () => {
  return (
    <>
      <Canvas dpr={[1, 2]} shadows>
        <CameraAndLights />
        <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
          <Cursor />
          <PlaneSetup rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} />
          <DaycareBlock position={[0, 20, 0]} />
          <DaycareBlock position={[-1.5, 30, 1]} />
        </Physics>
        <OptionsList position={[14, 11, -5]}>{`Introduction`}</OptionsList>
        <OptionsList position={[14, 8, -5]}>{`Age Groups`}</OptionsList>
        <OptionsList position={[14, 5, -5]}>{`Contact`}</OptionsList>
      </Canvas>
    </>
  );
};

export default BlocksScene;
