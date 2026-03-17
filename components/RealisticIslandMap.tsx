'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  TilesRenderer as TilesRendererImpl,
  GlobeControls as GlobeControlsImpl,
  WGS84_ELLIPSOID,
} from '3d-tiles-renderer';
import {
  GoogleCloudAuthPlugin,
  TilesFadePlugin,
} from '3d-tiles-renderer/plugins';
import { Sky, Environment } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Sømliøya, Norway · 65°03'50"N  11°55'51.5"E */
const TARGET_LAT_DEG = 65 + 3 / 60 + 50.0 / 3600;
const TARGET_LON_DEG = 11 + 55 / 60 + 51.5 / 3600;
const TARGET_LAT_RAD = THREE.MathUtils.degToRad(TARGET_LAT_DEG);
const TARGET_LON_RAD = THREE.MathUtils.degToRad(TARGET_LON_DEG);
const INITIAL_ALTITUDE_M = 5_000;

const SUN_POSITION = new THREE.Vector3(-0.65, 0.14, 0.75).normalize();
const HAZE_COLOR_V3 = new THREE.Vector3(0.54, 0.67, 0.77);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface RealisticIslandMapProps {
  apiKey: string;
  className?: string;
}

interface HUDState {
  lat: number;
  lon: number;
  alt: number;
  hdg: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function latLonToECEF(latRad: number, lonRad: number, heightM: number): THREE.Vector3 {
  const p = new THREE.Vector3();
  WGS84_ELLIPSOID.getCartographicToPosition(latRad, lonRad, heightM, p);
  return p;
}

function formatDMS(deg: number, pos: string, neg: string): string {
  const dir = deg >= 0 ? pos : neg;
  const a   = Math.abs(deg);
  const d   = Math.floor(a);
  const mf  = (a - d) * 60;
  const m   = Math.floor(mf);
  const s   = Math.round((mf - m) * 60);
  return `${d}°${String(m).padStart(2, '0')}'${String(s).padStart(2, '0')}"${dir}`;
}

function formatAlt(m: number): string {
  if (m > 100_000) return `FL${Math.round(m / 304.8 / 100)}`;
  if (m > 1_000)   return `${(m / 1000).toFixed(1)} km`;
  return `${Math.round(m)} m`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GlobeSky – drei <Sky> that follows the camera so it works at ECEF scale
// ─────────────────────────────────────────────────────────────────────────────

function GlobeSky() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    groupRef.current?.position.copy(camera.position);
  });

  return (
    <group ref={groupRef}>
      <Sky
        distance={600_000}
        sunPosition={SUN_POSITION}
        turbidity={5}
        rayleigh={0.35}
        mieCoefficient={0.004}
        mieDirectionalG={0.84}
        inclination={0.49}
        azimuth={0.22}
      />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lights
// ─────────────────────────────────────────────────────────────────────────────

function GoldenHourLights() {
  const sunArr = SUN_POSITION.toArray() as [number, number, number];
  return (
    <>
      <directionalLight position={sunArr}           intensity={3.2}  color="#ffbf50" />
      <directionalLight position={[0, 1, 0]}        intensity={0.55} color="#b8d4ec" />
      <directionalLight position={[0.6, 0.25, -0.7]} intensity={0.22} color="#8faac4" />
      <ambientLight intensity={0.30} color="#c0cedd" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneMist – very subtle, only affects extreme distances
// ─────────────────────────────────────────────────────────────────────────────

function SceneMist() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(
      new THREE.Color(HAZE_COLOR_V3.x, HAZE_COLOR_V3.y, HAZE_COLOR_V3.z).getHex(),
      0.000003  // very low — only kicks in past ~100 km
    );
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// IslandMarker – pulsing diamond at the island ECEF position
// ─────────────────────────────────────────────────────────────────────────────

function IslandMarker() {
  const groupRef = useRef<THREE.Group>(null);
  const coneRef  = useRef<THREE.Mesh>(null);
  const ringRef  = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const pos = latLonToECEF(TARGET_LAT_RAD, TARGET_LON_RAD, 0);
    group.position.copy(pos);

    const up    = pos.clone().normalize();
    const north = new THREE.Vector3(0, 1, 0).sub(up.clone().multiplyScalar(up.y)).normalize();
    const east  = new THREE.Vector3().crossVectors(north, up).normalize();
    group.matrix.makeBasis(east, north, up);
    group.matrix.decompose(group.position, group.quaternion, group.scale);
    group.position.copy(pos);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coneRef.current) {
      coneRef.current.position.z = 70 + Math.sin(t * 1.9) * 28;
      coneRef.current.scale.setScalar(48 + Math.sin(t * 2.4) * 6);
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(36 + Math.sin(t * 1.3 + 1) * 4);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 + Math.sin(t * 1.3) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coneRef} rotation-x={-Math.PI / 2}>
        <coneGeometry args={[0.5, 1.7, 4]} />
        <meshStandardMaterial color="#ff4433" emissive="#ff2010" emissiveIntensity={0.75} transparent opacity={0.92} />
      </mesh>
      <mesh ref={ringRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.65, 1.05, 48]} />
        <meshBasicMaterial color="#ff5533" transparent opacity={0.30} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TilesScene – imperative TilesRenderer + GlobeControls
// ─────────────────────────────────────────────────────────────────────────────

function TilesScene({ apiKey, ortho }: { apiKey: string; ortho: boolean }) {
  const { scene, camera, gl } = useThree();
  const tilesRef    = useRef<TilesRendererImpl | null>(null);
  const controlsRef = useRef<GlobeControlsImpl | null>(null);

  useEffect(() => {
    const tiles = new TilesRendererImpl();
    tiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: apiKey }));
    tiles.registerPlugin(new TilesFadePlugin());
    tiles.setCamera(camera);
    tiles.setResolutionFromRenderer(camera, gl);
    scene.add(tiles.group);
    tilesRef.current = tiles;

    const controls = new GlobeControlsImpl(scene, camera, gl.domElement, tiles);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.08;
    controls.zoomSpeed      = 5;      // much faster scroll zoom
    controls.rotationSpeed  = 1.5;
    controls.minAltitude    = 0;
    controls.maxAltitude    = Math.PI / 2;  // full tilt range: horizontal → overhead
    controlsRef.current = controls;

    return () => {
      controlsRef.current?.dispose();
      controlsRef.current = null;
      tilesRef.current?.dispose();
      scene.remove(tiles.group);
      tilesRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // Lock/unlock tilt when mode changes
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (ortho) {
      // 2D chart: clamp to near-overhead only
      controls.minAltitude = 0.40 * Math.PI;
      controls.maxAltitude = Math.PI / 2;
      // Push camera directly overhead the island
      const surf = latLonToECEF(TARGET_LAT_RAD, TARGET_LON_RAD, 0);
      const up   = surf.clone().normalize();
      const dist = Math.max(camera.position.length() - surf.length(), INITIAL_ALTITUDE_M);
      camera.position.copy(surf.clone().add(up.multiplyScalar(dist)));
      camera.lookAt(surf);
    } else {
      // 3D free: full tilt
      controls.minAltitude = 0;
      controls.maxAltitude = Math.PI / 2;
    }
  }, [ortho, camera]);

  useFrame(({ camera: cam, gl: renderer }) => {
    const controls = controlsRef.current;
    const tiles    = tilesRef.current;
    if (!controls || !tiles) return;

    controls.update();
    tiles.setCamera(cam);
    tiles.setResolutionFromRenderer(cam, renderer);
    tiles.update();
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CameraTracker
// ─────────────────────────────────────────────────────────────────────────────

function CameraTracker({ onUpdate }: { onUpdate: (s: HUDState) => void }) {
  const { camera } = useThree();
  const carto  = useRef({ lat: 0, lon: 0, height: 0 });
  const pos    = useMemo(() => new THREE.Vector3(), []);
  const fwd    = useMemo(() => new THREE.Vector3(), []);
  const nPos   = useMemo(() => new THREE.Vector3(), []);
  const cSurf  = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    camera.getWorldPosition(pos);
    if (pos.lengthSq() < 1e6) return;

    WGS84_ELLIPSOID.getPositionToCartographic(pos, carto.current);

    const latDeg = THREE.MathUtils.radToDeg(carto.current.lat);
    const lonDeg = THREE.MathUtils.radToDeg(carto.current.lon);
    const altM   = Math.max(0, carto.current.height);

    camera.getWorldDirection(fwd);
    const surfNorm = pos.clone().normalize();
    const horiz = fwd.clone()
      .sub(surfNorm.clone().multiplyScalar(fwd.dot(surfNorm)))
      .normalize();

    WGS84_ELLIPSOID.getCartographicToPosition(carto.current.lat + 0.0001, carto.current.lon, 0, nPos);
    WGS84_ELLIPSOID.getCartographicToPosition(carto.current.lat, carto.current.lon, 0, cSurf);
    const northHoriz = nPos.clone().sub(cSurf).normalize();
    northHoriz.sub(surfNorm.clone().multiplyScalar(northHoriz.dot(surfNorm))).normalize();

    let hdg = THREE.MathUtils.radToDeg(
      Math.atan2(horiz.clone().cross(northHoriz).dot(surfNorm), horiz.dot(northHoriz))
    );
    hdg = ((hdg % 360) + 360) % 360;

    onUpdate({ lat: latDeg, lon: lonDeg, alt: altM, hdg });
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────

function Scene({
  apiKey,
  ortho,
  onHUDUpdate,
}: {
  apiKey: string;
  ortho: boolean;
  onHUDUpdate: (s: HUDState) => void;
}) {
  return (
    <>
      <SceneMist />
      <GoldenHourLights />
      <GlobeSky />
      <Environment preset="dawn" background={false} />

      <TilesScene apiKey={apiKey} ortho={ortho} />
      <IslandMarker />
      <CameraTracker onUpdate={onHUDUpdate} />

      <EffectComposer depthBuffer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.92} luminanceSmoothing={0.5} mipmapBlur />
        <Vignette eskil={false} offset={0.20} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HUD Overlay
// ─────────────────────────────────────────────────────────────────────────────

function HUDOverlay({ hud, ortho, onToggle }: { hud: HUDState; ortho: boolean; onToggle: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 font-mono select-none">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-xl shadow-xl">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/35">Position</p>
          <div className="flex gap-5 text-[13px] text-white/85 tabular-nums">
            <span>{formatDMS(hud.lat, 'N', 'S')}</span>
            <span>{formatDMS(hud.lon, 'E', 'W')}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-xl shadow-xl">
          <div className="flex gap-8">
            <div>
              <p className="mb-1.5 text-[9px] uppercase tracking-[0.28em] text-white/35">ALT</p>
              <p className="text-[22px] leading-none tabular-nums text-emerald-400">{formatAlt(hud.alt)}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[9px] uppercase tracking-[0.28em] text-white/35">HDG</p>
              <p className="text-[22px] leading-none tabular-nums text-amber-400">{String(Math.round(hud.hdg)).padStart(3, '0')}°</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto flex items-end justify-between gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-xl shadow-xl">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/35">Target</p>
          <p className="mt-1.5 text-[13px] font-semibold text-white/90">Sømliøya · Brønnøy</p>
          <p className="mt-0.5 text-[11px] text-white/45">Nordland, Norway</p>
          {!ortho && (
            <p className="mt-2 text-[10px] text-white/25">
              Left-drag pan · Right-drag orbit · Scroll zoom
            </p>
          )}
        </div>
        <button
          onClick={onToggle}
          aria-label="Toggle view mode"
          className={[
            'rounded-2xl border px-5 py-4 text-xs uppercase tracking-widest',
            'backdrop-blur-xl shadow-xl transition-all duration-300 focus:outline-none',
            ortho
              ? 'border-sky-400/30 bg-sky-500/20 text-sky-300 hover:bg-sky-500/30'
              : 'border-white/10 bg-black/50 text-white/55 hover:bg-white/10 hover:text-white',
          ].join(' ')}
        >
          <p className="text-[9px] tracking-[0.28em] text-white/35 mb-1.5">View Mode</p>
          <p className="text-[13px] font-semibold">{ortho ? 'Top Down' : '3D Free'}</p>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading screen
// ─────────────────────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070c14]">
      <div className="h-10 w-10 rounded-full border-2 border-white/15 border-t-white/70 animate-spin mb-5" />
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">Streaming 3D Tiles</p>
      <p className="mt-1.5 font-mono text-[10px] text-white/20">
        {TARGET_LAT_DEG.toFixed(5)}°N · {TARGET_LON_DEG.toFixed(5)}°E
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────────────

export default function RealisticIslandMap({ apiKey, className }: RealisticIslandMapProps) {
  const [hud, setHud] = useState<HUDState>({
    lat: TARGET_LAT_DEG,
    lon: TARGET_LON_DEG,
    alt: INITIAL_ALTITUDE_M,
    hdg: 0,
  });
  const [ortho, setOrtho]     = useState(false);
  const [loading, setLoading] = useState(true);

  const onHUDUpdate = useCallback((s: HUDState) => {
    setHud(s);
    if (s.alt > 0) setLoading(false);
  }, []);

  // Start camera NW of the island at altitude, angled down ~40°
  const initialCameraPos = useMemo<[number, number, number]>(() => {
    const surf  = latLonToECEF(TARGET_LAT_RAD, TARGET_LON_RAD, 0);
    const up    = surf.clone().normalize();
    const north = new THREE.Vector3(0, 1, 0).sub(up.clone().multiplyScalar(up.y)).normalize();
    const east  = new THREE.Vector3().crossVectors(north, up).normalize();
    // 5 km up, 4 km north, 2 km west — gives a ~40° tilt from SE perspective
    return surf
      .clone()
      .add(up.clone().multiplyScalar(INITIAL_ALTITUDE_M))
      .add(north.clone().multiplyScalar(4_000))
      .add(east.clone().multiplyScalar(-2_000))
      .toArray() as [number, number, number];
  }, []);

  // Surface point to look at on first render
  const islandSurface = useMemo(
    () => latLonToECEF(TARGET_LAT_RAD, TARGET_LON_RAD, 0),
    []
  );

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#070c14] ${className ?? ''}`}>
      {loading && <LoadingScreen />}
      <HUDOverlay hud={hud} ortho={ortho} onToggle={() => setOrtho(v => !v)} />

      <Canvas
        camera={{ position: initialCameraPos, fov: 60, near: 1, far: 1e10 }}
        gl={{ antialias: true, logarithmicDepthBuffer: true, powerPreference: 'high-performance', alpha: false }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
        onCreated={({ camera }) => {
          // Point camera at the island surface, not the Earth center
          camera.lookAt(islandSurface);
        }}
      >
        <Scene apiKey={apiKey} ortho={ortho} onHUDUpdate={onHUDUpdate} />
      </Canvas>
    </div>
  );
}
