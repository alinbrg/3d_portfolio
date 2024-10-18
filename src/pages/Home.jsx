import {Canvas} from "@react-three/fiber";
import {Suspense, useState} from "react";
import Loader from "../components/Loader.jsx";
import Island from "../modals/Island.jsx";
import Sky from "../modals/Sky.jsx";
import Bird from "../modals/Bird.jsx";
import Plane from "../modals/Plane.jsx";
import HomeInfo from "../components/HomeInfo.jsx";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
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

  const adjustPlaneForScreenSize = () => {
    // Adjust the island for the screen size
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className={'w-full h-screen relative'}>
      <div className={'absolute top-28 left-0 right-0 z-10 flex items-center justify-center'}>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-100 h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={2} position={[1,1,1]} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.2} skyColor="#b1e1ff" groundColor="#000" />

          <Bird />

          <Sky isRotating={isRotating} />
          <Island position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20.1, 0]}
          />


        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home