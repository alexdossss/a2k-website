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
      floatGroupRef.current.position.y = Math.sin(floatRef.current) * 0.08;
    }
  });

  return (
    <group ref={floatGroupRef} rotation={[0.15, -0.55, -0.15]}>
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
        camera={{ position: [0, 0.3, 6.0], fov: 38 }}
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
            position={[0, -1.2, 0]}
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
