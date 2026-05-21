import { Suspense, useRef, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import glbUrl from "../../assets/three-glb/macbook_pro_m3_16_inch_2024.glb?url";
import "./MacBook3D.css";

useGLTF.preload(glbUrl);

const FloatingMacBook = memo(function FloatingMacBook() {
  const { scene } = useGLTF(glbUrl);
  const floatGroupRef = useRef<THREE.Group>(null);
  const scaleGroupRef = useRef<THREE.Group>(null);
  const floatRef = useRef(0);

  // HERE - controls how HIGH the MacBook sits in the canvas
  const BASE_Y = 0.2;

  useEffect(() => {
    if (!scaleGroupRef.current) return;

    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 2.2 / maxDim : 1;

    scaleGroupRef.current.scale.setScalar(s);
    scaleGroupRef.current.position.set(
      -center.x * s,
      -center.y * s,
      -center.z * s
    );
  }, [scene]);

  useFrame((_, delta) => {
    if (floatGroupRef.current) {
      floatRef.current += delta * 0.8;

      // HERE - combines floating motion + manual vertical lift
      floatGroupRef.current.position.y =
        BASE_Y + Math.sin(floatRef.current) * 0.08;
    }
  });

  return (
    <group
      ref={floatGroupRef}
      rotation={[0.15, 0.4, 0.15]} // HERE - adjust tilt if needed
    >
      <group ref={scaleGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
});

export default memo(function MacBook3D() {
  return (
    <div className="macbook3d-wrapper">
      <Canvas
        camera={{
          position: [0, 1.5, 5.8], // HERE - camera height & zoom framing
          fov: 26.5, // HERE - lower = zoom in, higher = zoom out
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows={false}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[6, 10, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-4, 4, -2]} intensity={0.5} color="#cce0ff" />
        <Environment preset="city" environmentIntensity={0.5} />

        <Suspense fallback={null}>
          <FloatingMacBook />

          <ContactShadows
            opacity={0.25}
            blur={3.5}
            width={8}
            height={8}
            color="#2a1f15"
          />
        </Suspense>
      </Canvas>
    </div>
  );
});