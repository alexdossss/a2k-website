import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import "./Workflow3D.css";

interface Workflow3DProps {
  activeIndex: number;
  hoveredIndex: number;
  onLayerClick: (index: number) => void;
  onLayerHover: (index: number) => void;
}

const TOTAL_LAYERS = 5;
const LERP_SPEED = 0.1;
const BOX_GEO_ARGS: [number, number, number] = [5.2, 0.45, 5.2];
const LAYER_GAP = 1.7;
const ACTIVE_LIFT = 0.3;
const SPREAD_LIFT = 1.8;

const BASE_COLORS = [
  new THREE.Color("#f5f5f5"), new THREE.Color("#e0e0e0"), new THREE.Color("#ffffff"),
  new THREE.Color("#e0e0e0"), new THREE.Color("#ebebeb"), new THREE.Color("#e0e0e0"),
];
const HOVER_COLORS = [
  new THREE.Color("#f7cd85"), new THREE.Color("#d4a043"), new THREE.Color("#f7cd85"),
  new THREE.Color("#d4a043"), new THREE.Color("#f0bb60"), new THREE.Color("#d4a043"),
];
const ACTIVE_COLORS = [
  new THREE.Color("#f7c87c"), new THREE.Color("#d19b3d"), new THREE.Color("#F4B34A"),
  new THREE.Color("#d19b3d"), new THREE.Color("#e0ac53"), new THREE.Color("#d19b3d"),
];

function buildTopTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const grd = ctx.createLinearGradient(256, 0, 0, 256);
  grd.addColorStop(0, "#f0f0f0");
  grd.addColorStop(0.65, "#aaaaaa");
  grd.addColorStop(0.8, "#7a7a7a");
  grd.addColorStop(1, "#808080");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "rgba(0,0,0,0.015)";
  for (let i = 0; i < 2000; i++) {
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function WorkflowCanvas({ activeIndex, hoveredIndex, onLayerClick, onLayerHover }: Workflow3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ activeIndex, hoveredIndex });
  const lastReportedHover = useRef(-1);

  useEffect(() => {
    stateRef.current = { activeIndex, hoveredIndex };
  }, [activeIndex, hoveredIndex]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    scene.background = null;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const aspect = w / h;
    const d = 4.7;
    const camera = new THREE.OrthographicCamera(-d, d, d / aspect, -d / aspect, 1, 1000);
    camera.position.set(10, 5.5, 10);
    camera.lookAt(0, -2.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const topTex = buildTopTexture();
    const baseMatProps = { roughness: 0.9, metalness: 0.05 };

    const sharedMaterials = [
      new THREE.MeshStandardMaterial({ color: "#f5f5f5", ...baseMatProps }),
      new THREE.MeshStandardMaterial({ color: "#e0e0e0", ...baseMatProps }),
      new THREE.MeshStandardMaterial({ map: topTex, color: "#ffffff", ...baseMatProps }),
      new THREE.MeshStandardMaterial({ color: "#e0e0e0", ...baseMatProps }),
      new THREE.MeshStandardMaterial({ color: "#ebebeb", ...baseMatProps }),
      new THREE.MeshStandardMaterial({ color: "#e0e0e0", ...baseMatProps }),
    ];

    const boxGeo = new THREE.BoxGeometry(...BOX_GEO_ARGS);
    const layers: THREE.Mesh[] = [];
    const baseYPositions: number[] = [];
    const layerMaterials: THREE.MeshStandardMaterial[][] = [];

    for (let i = 0; i < TOTAL_LAYERS; i++) {
      const mats = sharedMaterials.map((m) => m.clone());
      layerMaterials.push(mats);
      const mesh = new THREE.Mesh(boxGeo, mats);
      const y = -i * LAYER_GAP;
      mesh.position.set(0, y, 0);
      scene.add(mesh);
      layers.push(mesh);
      baseYPositions.push(y);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const canvasHoverRef = { current: -1 };

    const onMouseClick = () => {
      const hoverIdx = canvasHoverRef.current;
      if (hoverIdx !== -1) {
        onLayerClick(hoverIdx === stateRef.current.activeIndex ? -1 : hoverIdx);
      } else {
        onLayerClick(-1);
      }
    };

    let pendingMouseX = -9999;
    let pendingMouseY = -9999;
    let mousePending = false;

    const onMouseMove = (e: MouseEvent) => {
      pendingMouseX = e.clientX;
      pendingMouseY = e.clientY;
      mousePending = true;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        const na = nw / nh;
        camera.top = d / na;
        camera.bottom = -d / na;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }, 100);
    };

    canvas.addEventListener("click", onMouseClick);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (mousePending) {
        const r = canvas.getBoundingClientRect();
        mouse.x = ((pendingMouseX - r.left) / r.width) * 2 - 1;
        mouse.y = -((pendingMouseY - r.top) / r.height) * 2 + 1;
        mousePending = false;
      }

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(layers, false);
      const layerHoverIndex = hits.length > 0 ? layers.indexOf(hits[0].object as THREE.Mesh) : -1;

      const { activeIndex: clickedIndex, hoveredIndex: textHoverIndex } = stateRef.current;
      const effectiveHoverIndex = layerHoverIndex !== -1 ? layerHoverIndex : textHoverIndex;
      const ei = clickedIndex !== -1 ? clickedIndex : effectiveHoverIndex;

      canvasHoverRef.current = layerHoverIndex;
      canvas.style.cursor = layerHoverIndex !== -1 ? "pointer" : "default";

      if (layerHoverIndex !== lastReportedHover.current) {
        lastReportedHover.current = layerHoverIndex;
        onLayerHover(layerHoverIndex);
      }

      for (let i = 0; i < TOTAL_LAYERS; i++) {
        const layer = layers[i];
        let targetY = baseYPositions[i];

        if (ei !== -1) {
          if (i === ei) {
            if (i !== 0 && i !== TOTAL_LAYERS - 1) targetY += ACTIVE_LIFT;
          } else if (i < ei) {
            targetY += SPREAD_LIFT;
          }
        }

        layer.position.y += (targetY - layer.position.y) * LERP_SPEED;

        const isClicked = clickedIndex !== -1 && i === clickedIndex;
        const isHovered = !isClicked && effectiveHoverIndex !== -1 && i === effectiveHoverIndex;
        const targetColors = isClicked ? ACTIVE_COLORS : isHovered ? HOVER_COLORS : BASE_COLORS;

        const mats = layerMaterials[i];
        for (let m = 0; m < mats.length; m++) {
          mats[m].color.lerp(targetColors[m], LERP_SPEED);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      canvas.removeEventListener("click", onMouseClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      for (const mats of layerMaterials) {
        for (const m of mats) m.dispose();
      }
      for (const m of sharedMaterials) m.dispose();
      boxGeo.dispose();
      topTex.dispose();
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

export default memo(WorkflowCanvas);
