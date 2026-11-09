"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../lib/theme";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type Props = { paused: boolean; onStatus: (status: "ready" | "fallback") => void };

export default function GlobeCanvas({ paused, onStatus }: Props) {
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  const recolorRef = useRef<(() => void) | null>(null);
  useEffect(() => { themeRef.current = resolvedTheme; recolorRef.current?.(); }, [resolvedTheme]);
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const wakeRef = useRef<(() => void) | null>(null);
  const rotateRef = useRef<((direction: number) => void) | null>(null);

  useEffect(() => { pausedRef.current = paused; wakeRef.current?.(); }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch { onStatus("fallback"); return; }

    let disposed = false;
    let visible = false;
    let ready = false;
    let failed = false;
    let previousTime = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0.3, 4.65);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.minPolarAngle = Math.PI * 0.24;
    controls.maxPolarAngle = Math.PI * 0.76;
    controls.rotateSpeed = 0.55;
    canvas.style.touchAction = "pan-y";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const globe = new THREE.Group();
    globe.rotation.y = -Math.PI / 2 - 0.25;
    scene.add(globe);
    const texture = new THREE.TextureLoader().load("/textures/earth-blue-marble.jpg", () => {
      if (disposed) { texture.dispose(); return; }
      ready = true;
      onStatus("ready");
      updateLoop();
    }, undefined, () => { failed = true; renderer.setAnimationLoop(null); onStatus("fallback"); });
    texture.colorSpace = THREE.SRGBColorSpace;

    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: { earthMap: { value: texture }, ocean: { value: new THREE.Color("#004aad") }, land: { value: new THREE.Color("#a6caff") } },
      vertexShader: `varying vec2 vUv; varying vec3 vNormal;
        void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform sampler2D earthMap; uniform vec3 ocean; uniform vec3 land; varying vec2 vUv; varying vec3 vNormal;
        void main() {
          vec3 earth = texture2D(earthMap, vUv).rgb;
          float water = 1.0 - smoothstep(0.003, 0.018, max(earth.r, earth.g));
          vec3 color = mix(land, ocean, water);
          float light = 0.6 + 0.4 * max(dot(normalize(vNormal), normalize(vec3(-0.6, 0.8, 1.0))), 0.0);
          gl_FragColor = vec4(color * light, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), earthMaterial));

    function point(latitude: number, longitude: number, radius = 1.015) {
      const phi = (90 - latitude) * Math.PI / 180;
      const theta = (longitude + 180) * Math.PI / 180;
      return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
    }
    const origin = point(6.52, 3.38);
    const destinations = [[51.5, -0.12], [40.7, -74], [-1.29, 36.82], [25.2, 55.27], [-26.2, 28.04]];
    const curves: THREE.CatmullRomCurve3[] = [];
    const pings: THREE.Mesh[] = [];
    const arcMaterial = new THREE.MeshBasicMaterial({ color: "#4c98ff", transparent: true, opacity: 0.8 });
    const pointMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });
    const markerMaterial = new THREE.MeshBasicMaterial({ color: "#004aad" });
    for (const [latitude, longitude] of destinations) {
      const end = point(latitude, longitude);
      const points = Array.from({ length: 41 }, (_, i) => {
        const t = i / 40;
        return origin.clone().lerp(end, t).normalize().multiplyScalar(1.018 + Math.sin(Math.PI * t) * 0.22);
      });
      const curve = new THREE.CatmullRomCurve3(points);
      curves.push(curve);
      globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.003, 5, false), arcMaterial));
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.017, 10, 8), markerMaterial);
      marker.position.copy(end); globe.add(marker);
      const ping = new THREE.Mesh(new THREE.SphereGeometry(0.013, 10, 8), pointMaterial);
      pings.push(ping); globe.add(ping);
    }
    const originMarker = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 10), pointMaterial);
    originMarker.position.copy(origin); globe.add(originMarker);

    const draw = () => { if (!disposed && ready && !failed) renderer.render(scene, camera); };
    let elapsed = 0;
    function tick(time: number) {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      elapsed += delta;
      globe.rotation.y += delta * 0.075;
      pings.forEach((ping, index) => ping.position.copy(curves[index].getPoint((elapsed * 0.13 + index * 0.19) % 1)));
      draw();
    }
    function updateLoop() {
      previousTime = 0;
      renderer.setAnimationLoop(ready && visible && !failed && !pausedRef.current && !document.hidden ? tick : null);
      draw();
    }
    pings.forEach((ping, index) => ping.position.copy(curves[index].getPoint(index * 0.19)));
    const recolor = () => {
      const dark = themeRef.current === "dark";
      earthMaterial.uniforms.ocean.value.set(dark ? "#0c4a94" : "#004aad");
      earthMaterial.uniforms.land.value.set(dark ? "#9bc4fa" : "#a6caff");
      arcMaterial.color.set(dark ? "#85bdff" : "#4c98ff");
      markerMaterial.color.set(dark ? "#ffffff" : "#004aad");
      draw();
    };
    recolorRef.current = recolor;
    recolor();
    wakeRef.current = updateLoop;
    rotateRef.current = (direction) => { globe.rotation.y += direction * 0.18; draw(); };
    controls.addEventListener("change", draw);
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix(); draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host); resize();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateLoop(); });
    observer.observe(host);
    document.addEventListener("visibilitychange", updateLoop);
    const contextLost = (event: Event) => { event.preventDefault(); failed = true; renderer.setAnimationLoop(null); onStatus("fallback"); };
    canvas.addEventListener("webglcontextlost", contextLost);

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect(); resizeObserver.disconnect(); controls.dispose();
      document.removeEventListener("visibilitychange", updateLoop);
      canvas.removeEventListener("webglcontextlost", contextLost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material)); } });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose()); texture.dispose();
      renderer.dispose(); canvas.remove(); wakeRef.current = null; rotateRef.current = null; recolorRef.current = null;
    };
  }, [onStatus]);

  return <div ref={hostRef} tabIndex={0} role="img" aria-label="Interactive blue Earth with illustrative messaging connections. Drag or use left and right arrow keys to rotate." onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); rotateRef.current?.(event.key === "ArrowLeft" ? -1 : 1); } }} className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-offset-[-8px]" />;
}
