import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCw, Maximize2, Layers } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

/*
  =============================================================================
  HOW TO SWAP IN YOUR OWN 3D MODEL (.gltf / .glb) OR FRAME SEQUENCE:
  -----------------------------------------------------------------------------
  1. Drop your Draco-compressed GLTF file into `public/models/mini_truck.glb`.
  2. Replace `<Truck3DModel />` below with `const { scene } = useGLTF('/models/mini_truck.glb');`
  3. Or to use Canvas-scrubbed image frames:
     - Place your 4K frame sequence in `public/frames/frame_0001.webp` ... `frame_0120.webp`
     - Bind `window.scrollY` ratio to render `context.drawImage(images[frameIndex], 0, 0)`.
  =============================================================================
*/

interface TruckModelProps {
  exploded: boolean;
  activePartId?: string | null;
  cameraRotY?: number;
}

const Truck3DModel: React.FC<TruckModelProps> = ({ exploded, activePartId, cameraRotY = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cabinRef = useRef<THREE.Group>(null);
  const cargoRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);
  const grilleRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        cameraRotY,
        0.05
      );
    }

    // Exploded offsets lerp
    const explodedTargetX = exploded ? 1.5 : 0;
    const explodedTargetY = exploded ? 1.2 : 0;
    const explodedTargetZ = exploded ? 1.8 : 0;

    if (cabinRef.current) {
      cabinRef.current.position.z = THREE.MathUtils.lerp(
        cabinRef.current.position.z,
        exploded ? -explodedTargetZ : 0,
        0.08
      );
    }

    if (cargoRef.current) {
      cargoRef.current.position.z = THREE.MathUtils.lerp(
        cargoRef.current.position.z,
        exploded ? explodedTargetZ : 0,
        0.08
      );
    }

    if (wheelsRef.current) {
      wheelsRef.current.position.y = THREE.MathUtils.lerp(
        wheelsRef.current.position.y,
        exploded ? -explodedTargetY : 0,
        0.08
      );
    }

    if (grilleRef.current) {
      grilleRef.current.position.x = THREE.MathUtils.lerp(
        grilleRef.current.position.x,
        exploded ? -explodedTargetX : 0,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={0.95}>
      {/* 1. DRIVER CABIN (White Body matching reference image) */}
      <group ref={cabinRef} position={[0, 0, -0.4]}>
        {/* Main Cabin Mesh */}
        <mesh position={[0, 0.9, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.4, 1.4]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Roof Curve / Cap */}
        <mesh position={[0, 1.65, -0.5]}>
          <boxGeometry args={[1.58, 0.15, 1.35]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
        </mesh>

        {/* Front Windshield */}
        <mesh position={[0, 1.15, -1.21]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[1.4, 0.7]} />
          <meshPhysicalMaterial
            color="#1E2732"
            transmission={0.6}
            opacity={0.85}
            transparent
            roughness={0.05}
          />
        </mesh>

        {/* Side Windows */}
        <mesh position={[0.81, 1.15, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshStandardMaterial color="#1E2732" roughness={0.1} />
        </mesh>
        <mesh position={[-0.81, 1.15, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshStandardMaterial color="#1E2732" roughness={0.1} />
        </mesh>

        {/* Part Label when exploded */}
        {exploded && (
          <Html position={[0, 2.0, -0.5]} center distanceFactor={8}>
            <div className="bg-[#141210] text-[#FAF7F2] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap border border-[#C9A96E]">
              1. White Driver Cabin
            </div>
          </Html>
        )}
      </group>

      {/* 2. OPEN CARGO BED (Back Bed matching reference image) */}
      <group ref={cargoRef} position={[0, 0, 1.2]}>
        {/* Bed Floor */}
        <mesh position={[0, 0.5, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.15, 2.2]} />
          <meshStandardMaterial color="#E8E4DF" roughness={0.4} />
        </mesh>

        {/* Bed Side Walls */}
        <mesh position={[0.82, 0.9, 0.4]}>
          <boxGeometry args={[0.06, 0.7, 2.2]} />
          <meshStandardMaterial color="#F4EFE6" roughness={0.3} />
        </mesh>
        <mesh position={[-0.82, 0.9, 0.4]}>
          <boxGeometry args={[0.06, 0.7, 2.2]} />
          <meshStandardMaterial color="#F4EFE6" roughness={0.3} />
        </mesh>
        {/* Tailgate */}
        <mesh position={[0, 0.9, 1.48]}>
          <boxGeometry args={[1.65, 0.7, 0.06]} />
          <meshStandardMaterial color="#E0DAD0" roughness={0.3} />
        </mesh>

        {/* Part Label when exploded */}
        {exploded && (
          <Html position={[0, 1.5, 0.4]} center distanceFactor={8}>
            <div className="bg-[#141210] text-[#FAF7F2] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap border border-[#C9A96E]">
              2. Open Cargo Bed
            </div>
          </Html>
        )}
      </group>

      {/* 3. FRONT GRILLE & BLACK BUMPER (Front Detail matching reference image) */}
      <group ref={grilleRef} position={[0, 0, -1.2]}>
        {/* Black Front Bumper */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.75, 0.4, 0.3]} />
          <meshStandardMaterial color="#111111" roughness={0.6} />
        </mesh>

        {/* Headlamps */}
        <mesh position={[0.6, 0.7, 0.02]}>
          <boxGeometry args={[0.3, 0.25, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFDD0" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.6, 0.7, 0.02]}>
          <boxGeometry args={[0.3, 0.25, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFDD0" emissiveIntensity={0.8} />
        </mesh>

        {/* Grille Bars */}
        <mesh position={[0, 0.7, 0.02]}>
          <boxGeometry args={[0.7, 0.2, 0.05]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>

        {/* Part Label when exploded */}
        {exploded && (
          <Html position={[-1.2, 0.5, 0]} center distanceFactor={8}>
            <div className="bg-[#141210] text-[#FAF7F2] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap border border-[#C9A96E]">
              4. Grille & Bumper
            </div>
          </Html>
        )}
      </group>

      {/* 4. WHEELS & TYRES (Silver Wheels + Black Tyres) */}
      <group ref={wheelsRef} position={[0, 0, 0]}>
        {/* Front Left */}
        <group position={[0.85, 0.2, -0.8]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color="#1A1918" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.02, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.31, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[-0.85, 0.2, -0.8]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color="#1A1918" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.02, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.31, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[0.85, 0.2, 1.2]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color="#1A1918" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.02, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.31, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[-0.85, 0.2, 1.2]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color="#1A1918" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.02, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.31, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Part Label when exploded */}
        {exploded && (
          <Html position={[0, -0.8, 0.2]} center distanceFactor={8}>
            <div className="bg-[#141210] text-[#FAF7F2] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap border border-[#C9A96E]">
              3. Silver Wheels & Tyres
            </div>
          </Html>
        )}
      </group>

      {/* Heavy Steel Frame Chassis */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.4, 0.15, 3.4]} />
        <meshStandardMaterial color="#141210" roughness={0.9} />
      </mesh>
    </group>
  );
};

interface CanvasProps {
  exploded?: boolean;
  onExplodeToggle?: () => void;
}

export const TruckCanvas3D: React.FC<CanvasProps> = ({
  exploded: externalExploded,
  onExplodeToggle,
}) => {
  const [internalExploded, setInternalExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraRotY, setCameraRotY] = useState(0.6);
  const { language } = useStore();
  const t = TRANSLATIONS[language];

  const isExploded = externalExploded !== undefined ? externalExploded : internalExploded;

  const handleToggle = () => {
    if (onExplodeToggle) {
      onExplodeToggle();
    } else {
      setInternalExploded((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setCameraRotY(0.6 + (scrollY % 1000) * 0.003);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#F4EFE6] to-[#E6DFD2] dark:from-[#181613] dark:to-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[4, 2.5, 5]} fov={45} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 8]} intensity={1.5} castShadow />
        <directionalLight position={[-8, 10, -5]} intensity={0.5} color="#C9A96E" />
        <pointLight position={[0, -2, 0]} intensity={0.3} />

        <Float speed={autoRotate ? 1.5 : 0} rotationIntensity={0.2} floatIntensity={0.2}>
          <Truck3DModel exploded={isExploded} cameraRotY={cameraRotY} />
        </Float>

        {/* Soft Floor Grid Shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={1.2} />
      </Canvas>

      {/* Interactive Floating Control Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141210] dark:bg-[#F4EFE6] text-[#FAF7F2] dark:text-[#100F0D] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#C9A96E] transition-colors"
            data-testid="toggle-exploded-view"
          >
            <Layers className="w-4 h-4 text-[#C9A96E]" />
            <span>{isExploded ? t.exploded.reassembleBtn : t.exploded.explodeBtn}</span>
          </button>

          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className="p-2.5 rounded-full bg-white/80 dark:bg-black/80 text-[#141210] dark:text-[#F4EFE6] border border-[#E6DFD2] dark:border-[#2D2921] shadow-md hover:border-[#C9A96E] transition-colors"
            title="Toggle Auto Rotation"
            data-testid="toggle-3d-autorotate"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'text-[#C9A96E]' : ''}`} />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6B6458] dark:text-[#A39B8B] bg-white/70 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C9A96E]/20">
          <span>Drag to Orbit 360°</span>
        </div>
      </div>
    </div>
  );
};
