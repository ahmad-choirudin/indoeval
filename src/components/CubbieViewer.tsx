import { useEffect, useRef } from "react";
import type { Material, Mesh, MeshStandardMaterial, Object3D, Texture } from "three";

type Props = {
  src: string;
  onReady?: () => void;
  className?: string;
};

export default function CubbieViewer({ src, onReady, className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        // Skip everything (and never download three.js) if the model file is missing.
        const head = await fetch(src, { method: "HEAD" });
        const type = head.headers.get("content-type") ?? "";
        if (!head.ok || type.includes("text/html")) return;

        const [THREE, { GLTFLoader }, { OrbitControls }, { RoomEnvironment }, { MeshoptDecoder }] =
          await Promise.all([
            import("three"),
            import("three/examples/jsm/loaders/GLTFLoader.js"),
            import("three/examples/jsm/controls/OrbitControls.js"),
            import("three/examples/jsm/environments/RoomEnvironment.js"),
            // @ts-ignore -- decoder for Meshopt-compressed models
            import("three/examples/jsm/libs/meshopt_decoder.module.js"),
          ]);
        if (disposed) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.85;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;
        scene.environmentIntensity = 0.55;

        const key = new THREE.DirectionalLight(0xffffff, 1.6);
        key.position.set(2.5, 3, 3.5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xc4f56a, 2.2);
        rim.position.set(-3, 2, -3);
        scene.add(rim);

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.set(0, 0.2, 5.1);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.minPolarAngle = Math.PI / 2.15;
        controls.maxPolarAngle = Math.PI / 2.15;
        controls.autoRotate = !reduceMotion;
        controls.autoRotateSpeed = 1.4;
        controls.addEventListener("start", () => {
          controls.autoRotate = false;
        });
        // Horizontal drag rotates; vertical swipes still scroll the page on touch screens.
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y;";

        const resize = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(mount);
        resize();

        const frame = () => {
          controls.update();
          renderer.render(scene, camera);
        };
        let loaded = false;
        const io = new IntersectionObserver(([e]) => {
          if (loaded) renderer.setAnimationLoop(e.isIntersecting ? frame : null);
        });
        io.observe(mount);

        const disposeObject = (o: Object3D) => {
          const mesh = o as Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const mats: Material[] = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            Object.values(m as unknown as Record<string, unknown>).forEach((v) => {
              if (v instanceof THREE.Texture) (v as Texture).dispose();
            });
            m.dispose();
          });
        };

        let done = false;
        const teardown = () => {
          if (done) return;
          done = true;
          renderer.setAnimationLoop(null);
          io.disconnect();
          ro.disconnect();
          controls.dispose();
          scene.traverse(disposeObject);
          envTex.dispose();
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        cleanup = teardown;

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(src);
        if (disposed) {
          teardown();
          return;
        }

        const model = gltf.scene;

        // A model exported without textures comes out plain white. Give those parts a
        // dark matte material so they match the Cubbie palette. Textured parts are left alone.
        let dark: MeshStandardMaterial | null = null;
        model.traverse((o: Object3D) => {
          const mesh = o as Mesh;
          if (!mesh.isMesh) return;
          const mats: Material[] = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          const textured = mats.some((m) => {
            const sm = m as MeshStandardMaterial;
            return !!sm.map || !!sm.emissiveMap;
          });
          const hasVertexColors = !!mesh.geometry.getAttribute("color");
          if (!textured && !hasVertexColors) {
            if (!dark) {
              dark = new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.5, metalness: 0.15 });
            }
            mesh.material = dark;
          }
        });

        // Deepen the base color so the model matches the black-and-lime renders.
        const TONE = 0,61;
        const seen = new Set<Material>();
        model.traverse((o: Object3D) => {
        const mesh = o as Mesh;
        if (!mesh.isMesh) return;
        const mats: Material[] = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
        if (seen.has(m)) return;
        seen.add(m);
        const sm = m as MeshStandardMaterial;
        if (sm.color && sm.map) {
            sm.color.multiplyScalar(TONE);
            sm.roughness = Math.max(sm.roughness, 0.5);
            sm.metalness = Math.min(sm.metalness, 0.2);
          }
         });
        });

        // Fit any model to the same frame: height 2, centered, feet on y = -1.
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s = 2 / (size.y || 1);
        model.scale.setScalar(s);
        model.position.set(-center.x * s, -1 - box.min.y * s, -center.z * s);
        scene.add(model);

        loaded = true;
        renderer.setAnimationLoop(frame);
        readyRef.current?.();
      } catch (err) {
        console.warn("CubbieViewer: could not load the 3D model.", err);
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [src]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive 3D Cubbie. Drag sideways to rotate."
      className={className}
    />
  );
}
