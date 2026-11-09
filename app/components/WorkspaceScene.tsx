"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate } from "framer-motion";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { workspaceFeatures } from "../lib/workspace-data";

type Props = { selected: number; onStatus: (status: "ready" | "fallback") => void };

export default function WorkspaceScene({ selected, onStatus }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ selected });
  const updateRef = useRef<(() => void) | null>(null);
  useEffect(() => { stateRef.current = { selected }; updateRef.current?.(); }, [selected]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { onStatus("fallback"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true"); host.appendChild(renderer.domElement);
    const html = new CSS3DRenderer(); html.domElement.className = "workspace-html-layer"; host.appendChild(html.domElement);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(-2, 4, 6); scene.add(light);
    const fill = new THREE.DirectionalLight(0xa6bcdb, 1); fill.position.set(4, -1, 3); scene.add(fill);

    function frameGeometry(width: number, height: number) {
      const radius = 0.06, x = -width / 2, y = -height / 2, shape = new THREE.Shape();
      shape.moveTo(x + radius, y); shape.lineTo(x + width - radius, y); shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius); shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height); shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius); shape.quadraticCurveTo(x, y, x + radius, y);
      return new THREE.ExtrudeGeometry(shape, { depth: 0.085, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2, steps: 1 });
    }
    const material = new THREE.MeshStandardMaterial({ color: "#c8d8ec", roughness: 0.72, metalness: 0.12 });
    const rig = new THREE.Group(); scene.add(rig);
    const browser = new THREE.Group(); rig.add(browser);
    browser.add(new THREE.Mesh(frameGeometry(5.56, 3.30), material));
    const browserElement = document.createElement("div"); browserElement.className = "workspace-browser";
    browserElement.style.width = "1120px"; browserElement.style.height = "664px";
    browserElement.innerHTML = `<div class="workspace-browser-bar"><span>PINGSTACK</span><span>Workspace preview</span><span data-workspace-label></span></div><div class="workspace-screen"><img draggable="false" alt=""/><div class="workspace-focus"></div></div>`;
    const browserObject = new CSS3DObject(browserElement); browserObject.scale.setScalar(0.00485); browserObject.position.z = 0.11; browser.add(browserObject);
    const image = browserElement.querySelector("img")!;
    const hotspot = browserElement.querySelector<HTMLDivElement>(".workspace-focus")!;
    let displayed = -1;
    let imageAnimation: ReturnType<typeof animate> | undefined;
    let frame = 0, visible = false, disposed = false, failed = false, width = 1;
    let desiredX = 0.045, desiredY = -0.065, desiredZ = -0.008, desiredBrowserX = 0;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const draw = () => { if (!disposed && !failed) { renderer.render(scene, camera); html.render(scene, camera); } };
    function tick() {
      frame = 0;
      if (!visible || document.hidden || disposed || failed) return;
      rig.rotation.x += (desiredX - rig.rotation.x) * 0.13;
      rig.rotation.y += (desiredY - rig.rotation.y) * 0.13;
      rig.rotation.z += (desiredZ - rig.rotation.z) * 0.13;
      browser.position.x += (desiredBrowserX - browser.position.x) * 0.13;
      draw();
      if (Math.abs(desiredX - rig.rotation.x) + Math.abs(desiredY - rig.rotation.y) + Math.abs(desiredZ - rig.rotation.z) + Math.abs(desiredBrowserX - browser.position.x) > 0.0005) frame = requestAnimationFrame(tick);
    }
    function wake() { if (visible && !document.hidden && !frame && !failed) frame = requestAnimationFrame(tick); }
    function basePose() {
      const desktop = finePointer.matches && width >= 900;
      const selected = stateRef.current.selected;
      desiredX = desktop ? selected === 3 ? 0.015 : 0.045 : 0;
      desiredY = desktop ? selected === 1 ? 0.04 : selected === 3 ? 0 : -0.065 : 0;
      desiredZ = desktop ? selected === 1 ? 0.008 : -0.008 : 0;
    }
    function update() {
      const { selected } = stateRef.current, feature = workspaceFeatures[selected];
      if (displayed !== selected) {
        image.src = feature.image;
        imageAnimation?.stop();
        imageAnimation = animate(image, { opacity: [0.3, 1], y: [5, 0] }, { duration: 0.35, ease: "easeOut" });
        displayed = selected;
      }
      browserElement.querySelector("[data-workspace-label]")!.textContent = feature.label;
      const focus = feature.focus;
      Object.assign(hotspot.style, { left: `${focus.x * 100}%`, top: `${focus.y * 100}%`, width: `${focus.w * 100}%`, height: `${focus.h * 100}%` });
      desiredBrowserX = 0;
      basePose(); draw(); wake();
    }
    updateRef.current = update;
    const resize = () => {
      const rect = host.getBoundingClientRect(); if (!rect.width || !rect.height) return;
      width = rect.width; renderer.setSize(rect.width, rect.height); html.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.position.z = Math.max(6.5, (width < 768 ? 2.95 : 3.4) / (Math.tan(THREE.MathUtils.degToRad(18)) * camera.aspect) + 0.95);
      camera.updateProjectionMatrix(); update();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || width < 900 || event.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect(); basePose();
      desiredY += ((event.clientX - rect.left) / rect.width - 0.5) * 0.055;
      desiredX -= ((event.clientY - rect.top) / rect.height - 0.5) * 0.035;
      wake();
    };
    const onPointerLeave = () => { basePose(); wake(); };
    host.addEventListener("pointermove", onPointerMove); host.addEventListener("pointerleave", onPointerLeave);
    image.addEventListener("load", draw);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { cancelAnimationFrame(frame); frame = 0; } else { draw(); wake(); } }); observer.observe(host);
    const resizer = new ResizeObserver(resize); resizer.observe(host); resize();
    document.addEventListener("visibilitychange", wake);
    const contextLost = (event: Event) => { event.preventDefault(); failed = true; cancelAnimationFrame(frame); frame = 0; onStatus("fallback"); };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    onStatus("ready");

    return () => {
      disposed = true; cancelAnimationFrame(frame); imageAnimation?.stop(); observer.disconnect(); resizer.disconnect();
      host.removeEventListener("pointermove", onPointerMove); host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", wake);
      image.removeEventListener("load", draw);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      scene.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); }); material.dispose(); renderer.dispose();
      renderer.domElement.remove(); html.domElement.remove(); updateRef.current = null;
    };
  }, [onStatus]);

  return <div ref={hostRef} aria-hidden="true" className="workspace-renderer" />;
}
