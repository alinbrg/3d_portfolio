import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import Loader from "../components/Loader.jsx";
import Island from "../modals/Island.jsx";

const Home = () => {
  const adjustIslandForScreenSize = () => {
    // Adjust the island for the screen size
    let screenScale = null;
    let screenPosition =  [0, -6.5, -43.4];
    let rotation = [0.1, 4.7077, 0];
    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    }else{
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();


  return (
    <section className={'w-full h-screen relative'}>
      {/*<div className={'absolute top-28 left-0 right-0 z-10 flex items-center justify-center'}>*/}
      {/*  POPUP*/}
      {/*</div>*/}

      <Canvas
        className={'w-100 h-screen bg-transparent'}
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={2} position={[1,1,1]} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.2} skyColor="#b1e1ff" groundColor="#000" />




          <Island position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
          />
        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home