import { motion } from 'framer-motion';
import { Container } from '@chakra-ui/react';
import * as T from 'three';

const Model = () => {
  // Sizes
  const sizes = {
    width: 800,
    height: 600,
  };

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new T.Scene();

  // Object
  const mesh = new T.Mesh(
    new T.BoxGeometry(1, 1, 1, 5, 5, 5),
    new T.MeshBasicMaterial({ color: 0xff0000 })
  );
  scene.add(mesh);

  // Camera
  const camera = new T.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(mesh.position);
  scene.add(camera);

  // Renderer
  // const renderer = new T.WebGLRenderer({
  //   canvas,
  // });
  // renderer.setSize(sizes.width, sizes.height);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Container
        position='relative'
        maxW={{ base: 'sm', md: 'xl' }}
        h='md'
        color='white'
        outline='solid'
        outlineColor='white'
      ></Container>
    </motion.div>
  );
};

export default Model;
