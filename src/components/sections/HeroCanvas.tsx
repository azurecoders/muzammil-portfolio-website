"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import dynamic from "next/dynamic";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uOpacity;
  uniform vec3 uAccent;
  uniform vec3 uBg;

  varying vec2 vUv;

  // Simplex 2D noise (Ashima)
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
       + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 m = uMouse / uResolution;
    float t = uTime * 0.04;
    vec2 p = uv * 2.5 + m * 0.3;
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(1.0)));
    vec2 r = vec2(fbm(p + 1.5 * q + vec2(t * 1.2, 0.0)), fbm(p + 1.5 * q + vec2(0.0, t * 1.1)));
    float n = fbm(p + 2.0 * r);
    n = smoothstep(-0.3, 0.6, n);
    vec3 col = mix(uBg, uAccent, n * 0.35);
    float d = distance(uv, m);
    col += smoothstep(0.55, 0.0, d) * 0.18 * uAccent;
    col *= uOpacity;
    gl_FragColor = vec4(col, uOpacity);
  }
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport, size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouseRef.current.set(
        (e.clientX / size.width) * viewport.width,
        (1 - e.clientY / size.height) * viewport.height
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [size.width, size.height, viewport.width, viewport.height]);

  useFrame((state) => {
    if (!matRef.current) return;
    mouseRef.current.lerp(targetMouseRef.current, 0.05);
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uMouse.value = mouseRef.current;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uOpacity: { value: 1 },
      uAccent: { value: new THREE.Color("#C6FF3D") },
      uBg: { value: new THREE.Color("#0A0A0B") },
    }),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function HeroCanvas({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

function Fallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(198,255,61,0.12) 0%, rgba(10,10,11,0) 60%), linear-gradient(180deg, #0A0A0B 0%, #0A0A0B 100%)",
      }}
    />
  );
}

const HeroCanvasInner = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <Fallback /> }
);

export function HeroCanvasClient({ className }: { className?: string }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!mounted) return <Fallback />;
  if (supported === false) return <Fallback />;
  if (supported === null) return <Fallback />;
  return <HeroCanvasInner className={className} />;
}

export default HeroCanvasClient;
