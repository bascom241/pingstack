"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { useTheme } from "../lib/theme";

type Props = { reduced: boolean; onStatus: (ready: boolean) => void };

export default function ClosingMessageCanvas({ reduced, onStatus }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  const reducedRef = useRef(reduced);
  const refreshRef = useRef<(() => void) | null>(null);
  useEffect(() => { themeRef.current = resolvedTheme; refreshRef.current?.(); }, [resolvedTheme]);
  useEffect(() => { reducedRef.current = reduced; refreshRef.current?.(); }, [reduced]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
    catch { onStatus(false); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 30);
    camera.position.set(0, 1.5, 8.6);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x596477, 2.8));
    const key = new THREE.DirectionalLight(0xffffff, 3.5);
    key.position.set(-3, 5, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0x97bfff, 1.8);
    rim.position.set(4, 1, -2); scene.add(rim);
    const assembly = new THREE.Group(); scene.add(assembly);
    const blue = new THREE.MeshStandardMaterial({ color: "#004aad", roughness: 0.32, metalness: 0.12 });
    const neutral = new THREE.MeshStandardMaterial({ color: "#eeeeef", roughness: 0.45, metalness: 0.08 });
    const ink = new THREE.MeshBasicMaterial({ color: "#004aad" });
    const routeMaterial = new THREE.MeshBasicMaterial({ color: "#8a96a7", transparent: true, opacity: 0.28 });
    const line = (points: number[][], material: THREE.Material, parent: THREE.Group, radius = 0.016) => {
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, "catmullrom", 0.01);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, radius, 8, false), material);
      parent.add(mesh); return mesh;
    };
    const envelope = new THREE.Group();
    envelope.add(new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.85, 0.2, 4, 0.09), neutral));
    line([[-0.51,0.29,0.115],[0,-0.05,0.13],[0.51,0.29,0.115]], ink, envelope, 0.022);
    line([[-0.51,-0.3,0.115],[-0.15,-0.02,0.13]], ink, envelope);
    line([[0.51,-0.3,0.115],[0.15,-0.02,0.13]], ink, envelope);
    envelope.position.set(1.65,0.28,0); envelope.rotation.set(-0.12,-0.35,0.15); assembly.add(envelope);
    const sms = new THREE.Group();
    const bubble = new THREE.Shape();
    bubble.moveTo(-0.48,0.43); bubble.lineTo(0.48,0.43); bubble.quadraticCurveTo(0.6,0.43,0.6,0.3);
    bubble.lineTo(0.6,-0.22); bubble.quadraticCurveTo(0.6,-0.34,0.47,-0.34);
    bubble.lineTo(-0.17,-0.34); bubble.lineTo(-0.43,-0.56); bubble.lineTo(-0.4,-0.34);
    bubble.lineTo(-0.48,-0.34); bubble.quadraticCurveTo(-0.6,-0.34,-0.6,-0.22);
    bubble.lineTo(-0.6,0.3); bubble.quadraticCurveTo(-0.6,0.43,-0.48,0.43);
    sms.add(new THREE.Mesh(new THREE.ExtrudeGeometry(bubble, { depth: 0.17, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 3, steps: 1 }), neutral));
    for (let i = -1; i <= 1; i++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.047,16,12), ink);
      dot.position.set(i * 0.22,0.03,0.22); sms.add(dot);
    }
    sms.position.set(-1.65,0.32,0.1); sms.rotation.set(0.04,0.32,-0.12); assembly.add(sms);
    const node = new THREE.Mesh(new RoundedBoxGeometry(0.85,0.85,0.5,5,0.15),blue);
    node.position.set(0,-0.15,0.5); node.rotation.set(0.12,-0.18,0); assembly.add(node);
    const texture = new THREE.TextureLoader().load("/brand/pingstack-logo.jpg", () => {
      if (disposed) { texture.dispose(); return; }
      draw();
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.69,0.69),new THREE.MeshBasicMaterial({ map:texture }));
    label.position.z = 0.257; node.add(label);
    const curves = [-1,1].map(side => new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 1.65,0.1,-0.1), new THREE.Vector3(side * 1.3,-0.7,0.1),
      new THREE.Vector3(side * 0.5,-0.65,0.7), new THREE.Vector3(0,-0.15,0.5),
    ]));
    const packets = curves.map(curve => {
      assembly.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,0.012,6,false),routeMaterial));
      const packet = new THREE.Mesh(new THREE.SphereGeometry(0.045,16,12),blue); assembly.add(packet); return packet;
    });
    let visible = false, disposed = false, time = 0, last = 0;
    const pointer = new THREE.Vector2();
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const draw = () => {
      if (disposed) return;
      neutral.color.set(themeRef.current === "dark" ? "#aeb7c4" : "#eeeeef");
      renderer.render(scene,camera);
    };
    const animate = (now: number) => {
      time += last ? Math.min((now-last)/1000,0.05) : 0; last = now;
      assembly.rotation.y += (pointer.x * 0.22 - assembly.rotation.y) * 0.06;
      assembly.rotation.x += (-pointer.y * 0.12 - assembly.rotation.x) * 0.06;
      sms.position.y = 0.32 + Math.sin(time * 0.9) * 0.08;
      envelope.position.y = 0.28 + Math.sin(time * 0.9 + Math.PI) * 0.08;
      packets.forEach((packet,i) => packet.position.copy(curves[i].getPoint((time * 0.16 + i * 0.5) % 1)));
      draw();
    };
    packets.forEach((packet,i) => packet.position.copy(curves[i].getPoint(0.35 + i * 0.3)));
    const update = () => {
      last = 0;
      renderer.setAnimationLoop(visible && !document.hidden && !reducedRef.current && !mobile.matches ? animate : null);
      draw();
    };
    refreshRef.current = update;
    const resize = new ResizeObserver(() => {
      const width=host.clientWidth, height=host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width,height); camera.aspect=width/height;
      camera.position.z = camera.aspect < 1.3 ? 10.2 : 8.6;
      camera.updateProjectionMatrix(); draw();
    }); resize.observe(host);
    const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; update(); }); observer.observe(host);
    const move = (event: PointerEvent) => {
      if (reducedRef.current || mobile.matches) return;
      const bounds=host.getBoundingClientRect();
      pointer.set((event.clientX-bounds.left)/bounds.width-0.5,(event.clientY-bounds.top)/bounds.height-0.5);
    };
    const leave = () => pointer.set(0,0);
    const lost = (event: Event) => { event.preventDefault(); renderer.setAnimationLoop(null); onStatus(false); };
    const restored = () => { onStatus(true); update(); };
    host.addEventListener("pointermove",move); host.addEventListener("pointerleave",leave);
    renderer.domElement.addEventListener("webglcontextlost",lost);
    renderer.domElement.addEventListener("webglcontextrestored",restored);
    document.addEventListener("visibilitychange",update); mobile.addEventListener("change",update);
    onStatus(true); draw();
    return () => {
      disposed=true; refreshRef.current=null; renderer.setAnimationLoop(null);
      observer.disconnect(); resize.disconnect();
      host.removeEventListener("pointermove",move); host.removeEventListener("pointerleave",leave);
      document.removeEventListener("visibilitychange",update); mobile.removeEventListener("change",update);
      renderer.domElement.removeEventListener("webglcontextlost",lost); renderer.domElement.removeEventListener("webglcontextrestored",restored);
      const geometries=new Set<THREE.BufferGeometry>(), materials=new Set<THREE.Material>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); const list=Array.isArray(object.material)?object.material:[object.material]; list.forEach(material=>materials.add(material)); } });
      geometries.forEach(geometry=>geometry.dispose()); materials.forEach(material=>material.dispose()); texture.dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [onStatus]);
  return <div ref={hostRef} className="closing-three-canvas" />;
}
