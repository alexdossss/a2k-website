import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Workflow3D.css";

interface Workflow3DProps {
  activeIndex: number;
  hoveredIndex: number;
  onLayerClick: (index: number) => void;
  onLayerHover: (index: number) => void;
}

const TOTAL_LAYERS = 5;

export default function WorkflowCanvas({ activeIndex, hoveredIndex, onLayerClick, onLayerHover }: Workflow3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ activeIndex, hoveredIndex });

  useEffect(() => {
    stateRef.current = { activeIndex, hoveredIndex };
  }, [activeIndex, hoveredIndex]);

  // Track last hover index reported TO parent so we only call onLayerHover when value changes
  const lastReportedHover = useRef(-1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null;
    
    const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const d = 4.7; 
    const camera = new THREE.OrthographicCamera(-d, d, d / aspect, -d / aspect, 1, 1000);
    camera.position.set(10, 5.5, 10); 
    camera.lookAt(0, -2.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // CHANGE LIGHTNESS HERE
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0); // CHANGE LIGHTNESS HERE
    dirLight.position.set(0, 10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.bias = -0.0012;
    scene.add(dirLight);

    const layers: THREE.Mesh[] = [];
    const baseYPositions: number[] = [];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // HERE — gradient direction: (512,0) to (0,512) = light from top-right, shadow bottom-left
      const grd = ctx.createLinearGradient(0, 512, 512, 0); // HERE — change coords to shift light direction
      grd.addColorStop(0, '#808080');   // HERE — bottom-left: darkest shadow (+30% darker)
      grd.addColorStop(0.35, '#aaaaaa'); // HERE — deeper shadow
      grd.addColorStop(0.2, '#7a7a7a'); // HERE — midpoint fade (+30% darker)
      grd.addColorStop(1, '#f0f0f0');   // HERE — top-right: bright highlight
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add extremely subtle noise for a slightly brushed texture
      ctx.fillStyle = 'rgba(0,0,0,0.015)';
      for (let i = 0; i < 5000; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
      }
    }
    const topTex = new THREE.CanvasTexture(canvas);
    topTex.flipY = false;

    // Matte finish (high roughness, low metalness)
    const baseMatProps = { roughness: 0.9, metalness: 0.05 };

    // CHANGE LIGHTNESS HERE: Adjust the hex colors below for lighter/darker base materials
    const sideRight = new THREE.MeshStandardMaterial({ color: '#f5f5f5', ...baseMatProps });
    const sideLeft = new THREE.MeshStandardMaterial({ color: '#ebebeb', ...baseMatProps });
    const sideTop = new THREE.MeshStandardMaterial({ map: topTex, color: '#ffffff', ...baseMatProps });
    const sideBottom = new THREE.MeshStandardMaterial({ color: '#e0e0e0', ...baseMatProps });
    
    const materials = [
      sideRight,
      sideBottom,
      sideTop,
      sideBottom,
      sideLeft,
      sideBottom,
    ];

    const boxGeo = new THREE.BoxGeometry(5.2, 0.45, 5.2);
    
    const baseColors = [
      new THREE.Color('#f5f5f5'), new THREE.Color('#e0e0e0'), new THREE.Color('#ffffff'), 
      new THREE.Color('#e0e0e0'), new THREE.Color('#ebebeb'), new THREE.Color('#e0e0e0')
    ];
    const hoverColors = [
      new THREE.Color('#f7cd85'), new THREE.Color('#d4a043'), new THREE.Color('#f7cd85'),
      new THREE.Color('#d4a043'), new THREE.Color('#f0bb60'), new THREE.Color('#d4a043')
    ];
    const activeColors = [
      new THREE.Color('#f7c87c'), new THREE.Color('#d19b3d'), new THREE.Color('#F4B34A'), 
      new THREE.Color('#d19b3d'), new THREE.Color('#e0ac53'), new THREE.Color('#d19b3d')
    ];
    const originalMaterials: THREE.MeshStandardMaterial[][] = [];

    for (let i = 0; i < TOTAL_LAYERS; i++) {
      const layerMats = materials.map(m => m.clone());
      originalMaterials.push(layerMats);
      
      const layer = new THREE.Mesh(boxGeo, layerMats);
      const y = -i * 1.7;
      layer.position.set(0, y, 0);
      layer.castShadow = true; 
      layer.receiveShadow = true;
      scene.add(layer); 
      layers.push(layer); 
      baseYPositions.push(y);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // Direct ref for current canvas hover — written in animate(), read in onMouseClick()
    // Does NOT go through React state so it's always fresh at click time
    const canvasHoverRef = { current: -1 };

    function getLayerIdx(obj: THREE.Object3D): number {
      const i = layers.indexOf(obj as THREE.Mesh); 
      return i !== -1 ? i : -1;
    }

    const onMouseClick = () => {
      // Use canvasHoverRef — written directly by animate() every frame, never stale.
      // stateRef.current.hoveredIndex is NOT used here because it goes through React
      // state → re-render → useEffect, so it lags behind and is stale at click time.
      const hoverIdx = canvasHoverRef.current;

      if (hoverIdx !== -1) {
        // Toggle off if clicking the already-active layer (same as clicking active text)
        if (hoverIdx === stateRef.current.activeIndex) {
          onLayerClick(-1);
        } else {
          onLayerClick(hoverIdx);
        }
      } else {
        onLayerClick(-1);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = canvasRef.current!.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };

    const onResize = () => {
      if (!containerRef.current) return;
      const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.left = -d;
      camera.right = d;
      camera.top = d / aspect;
      camera.bottom = -d / aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    canvasRef.current.addEventListener("click", onMouseClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(layers, false);
      const layerHoverIndex = hits.length > 0 ? getLayerIdx(hits[0].object) : -1;
      
      const textHoverIndex = stateRef.current.hoveredIndex;
      const clickedIndex = stateRef.current.activeIndex;
      
      const effectiveHoverIndex = layerHoverIndex !== -1 ? layerHoverIndex : textHoverIndex;
      const ei = clickedIndex !== -1 ? clickedIndex : effectiveHoverIndex;

      canvasHoverRef.current = layerHoverIndex;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = layerHoverIndex !== -1 ? "pointer" : "default";
        // Only call onLayerHover when the value actually changes — prevents React re-render spam
        if (layerHoverIndex !== lastReportedHover.current) {
          lastReportedHover.current = layerHoverIndex;
          onLayerHover(layerHoverIndex);
        }
      }

      layers.forEach((layer, i) => {
        let targetY = baseYPositions[i];
        let targetColors = baseColors;
        
        let isClicked = (clickedIndex !== -1 && i === clickedIndex);
        // Hover highlight works even when another layer is active
        let isHovered = (!isClicked && effectiveHoverIndex !== -1 && i === effectiveHoverIndex);
        
        if (ei !== -1) {
          if (i === ei) {
            if (i !== 0 && i !== TOTAL_LAYERS - 1) {
              targetY += 0.3; 
            }
          } else if (i < ei) {
            targetY += 1.8; 
          }
        }
        
        if (isClicked) {
          targetColors = activeColors;
        } else if (isHovered) {
          targetColors = hoverColors;
        }
        
        layer.position.y += (targetY - layer.position.y) * 0.1;
        
        const mats = layer.material as THREE.MeshStandardMaterial[];
        for (let matIdx = 0; matIdx < mats.length; matIdx++) {
           mats[matIdx].color.lerp(targetColors[matIdx], 0.1);
        }
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", onMouseClick);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.clear();
    };
  }, []); 

  return (
    <div id="canvas-container" ref={containerRef} className="workflow-canvas-wrapper font-urbanist">
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
}
