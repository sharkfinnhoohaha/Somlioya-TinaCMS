'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
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
        <meshStandardMaterial color="#C8A96E" emissive="#E4C78C" emissiveIntensity={0.6} transparent opacity={0.92} />
      </mesh>
      <mesh ref={ringRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.65, 1.05, 48]} />
        <meshBasicMaterial color="#D6BC84" transparent opacity={0.30} side={THREE.DoubleSide} />
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
    controls.zoomSpeed      = 2;      // calm, controlled scroll zoom
    controls.rotationSpeed  = 1.0;
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

// Narrative points of interest — surfaced as a calm story panel over the map.
const POINTS = [
  {
    title: 'The Main House',
    text: 'The yellow house is the heart of the island — a shared kitchen, a living room with a fireplace, and quiet bedrooms upstairs.',
  },
  {
    title: 'The Shoreline',
    text: 'The irregular shoreline was carved by the last Ice Age. The sea moves quietly between skerries and narrow inlets.',
  },
  {
    title: 'Heilhornet & the Peaks',
    text: 'Across the fjord, the distinctive peak of Heilhornet rises alongside Breivasstinden and Hestmannen — a dramatic horizon.',
  },
  {
    title: 'The Fjord Waters',
    text: 'Årsetfjorden is home to cod, pollock and mackerel. Fishing has been part of life here for generations.',
  },
  {
    title: 'The Northern Sky',
    text: 'In summer the midnight sun keeps the sky pale all night. In winter the aurora fills clear nights with light.',
  },
];

function HUDOverlay({ hud, ortho, onToggle }: { hud: HUDState; ortho: boolean; onToggle: () => void }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between select-none">
      {/* ── Top bar: escape link + quiet position readout ── */}
      <div className="flex items-start justify-between gap-3 p-4 md:p-6">
        <Link
          href="/"
          className="focus-ring-light pointer-events-auto group flex items-center gap-2.5 rounded-full border border-white/12 bg-[#0d1622]/75 px-4 py-2.5 backdrop-blur-md transition-colors hover:bg-[#0d1622]/95"
        >
          <span aria-hidden="true" className="text-gold transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="font-heading text-sm uppercase tracking-[0.16em] text-white/90">
            Sømliøya
          </span>
        </Link>

        <div className="rounded-full border border-white/12 bg-[#0d1622]/75 px-4 py-2.5 backdrop-blur-md">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-white/55 tabular-nums">
            {formatDMS(hud.lat, 'N', 'S')} · {formatDMS(hud.lon, 'E', 'W')}
            <span className="text-white/30"> · </span>
            {formatAlt(hud.alt)}
          </p>
        </div>
      </div>

      {/* ── Bottom: story card + points of interest + controls ── */}
      <div className="flex flex-col gap-3 p-4 md:p-6">
        {active !== null && (
          <div className="pointer-events-auto max-w-sm rounded-2xl border border-white/12 bg-[#0d1622]/90 p-5 backdrop-blur-xl">
            <h2 className="font-heading text-h4 font-normal text-white">{POINTS[active].title}</h2>
            <div className="mt-2 mb-3 h-px w-10 bg-gold" />
            <p className="font-sans text-caption leading-relaxed text-white/75">
              {POINTS[active].text}
            </p>
          </div>
        )}

        <div className="pointer-events-auto rounded-2xl border border-white/12 bg-[#0d1622]/80 p-4 backdrop-blur-md">
          <p className="mb-2.5 font-sans text-eyebrow uppercase tracking-[0.28em] text-white/50">
            Points of interest
          </p>
          <div className="flex flex-wrap gap-2">
            {POINTS.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(active === i ? null : i)}
                aria-pressed={active === i}
                className={`focus-ring-light rounded-full border px-3.5 py-1.5 font-sans text-[0.72rem] tracking-wide transition-colors ${
                  active === i
                    ? 'border-gold/70 bg-gold/15 text-gold'
                    : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="max-w-[15rem] font-sans text-[0.66rem] leading-relaxed text-white/60">
            Drag to explore · Pinch or scroll to zoom · Two fingers or right-drag to tilt
          </p>
          <button
            onClick={onToggle}
            aria-label={`Switch to ${ortho ? '3D' : 'top-down'} view`}
            className="focus-ring-light pointer-events-auto rounded-full border border-white/15 bg-[#0d1622]/80 px-5 py-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-white/85 backdrop-blur-md transition-colors hover:bg-[#0d1622]/95 hover:text-white"
          >
            {ortho ? 'Top-down view' : '3D view'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading screen
// ─────────────────────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d1622]">
      <div className="mb-5 h-9 w-9 rounded-full border-2 border-white/15 border-t-gold animate-spin" />
      <p className="font-heading text-lead font-light italic text-white/75">
        Bringing the island into view…
      </p>
      <p className="mt-2 font-sans text-eyebrow uppercase tracking-[0.28em] text-white/40">
        Sømliøya · Nærøysund
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
