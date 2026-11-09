"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { useCaseStories } from "../lib/use-case-data";

type Props = { active: number; reducedMotion: boolean; onStatus: (status: "ready" | "fallback") => void };

export default function UseCaseScene({ active, reducedMotion, onStatus }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<((index: number, reduced: boolean) => void) | null>(null);
  const stateRef = useRef({ active, reducedMotion });
  useEffect(() => { stateRef.current = { active, reducedMotion }; switchRef.current?.(active, reducedMotion); }, [active, reducedMotion]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { onStatus("fallback"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const htmlRenderer = new CSS3DRenderer();
    htmlRenderer.domElement.className = "usecase-html-layer";
    host.appendChild(htmlRenderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0, 6.4);
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(-3, 4, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0x88baff, 1.3); rim.position.set(3, 0, 2); scene.add(rim);

    function rounded(width: number, height: number, radius: number, depth: number) {
      const s = new THREE.Shape(), x = -width / 2, y = -height / 2;
      s.moveTo(x + radius, y); s.lineTo(x + width - radius, y); s.quadraticCurveTo(x + width, y, x + width, y + radius);
      s.lineTo(x + width, y + height - radius); s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      s.lineTo(x + radius, y + height); s.quadraticCurveTo(x, y + height, x, y + height - radius);
      s.lineTo(x, y + radius); s.quadraticCurveTo(x, y, x + radius, y);
      return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.018, bevelThickness: 0.018, bevelSegments: 3, steps: 1, curveSegments: 12 });
    }
    function htmlObject(markup: string, width: number, height: number, scale: number) {
      const element = document.createElement("div"); element.innerHTML = markup;
      element.style.width = `${width}px`; element.style.height = `${height}px`;
      const object = new CSS3DObject(element); object.scale.setScalar(scale);
      return object;
    }

    const phone = new THREE.Group(); scene.add(phone);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: "#242424", roughness: 0.72, metalness: 0.28 });
    phone.add(new THREE.Mesh(rounded(1.68, 3.28, 0.24, 0.14), bodyMaterial));
    const buttonMaterial = new THREE.MeshStandardMaterial({ color: "#575757", roughness: 0.6, metalness: 0.5 });
    for (const [x, y, height] of [[-0.85, 0.55, 0.32], [-0.85, 0.1, 0.32], [0.85, 0.25, 0.5]]) {
      const button = new THREE.Mesh(new THREE.BoxGeometry(0.035, height, 0.07), buttonMaterial); button.position.set(x, y, 0.07); phone.add(button);
    }
    const screen = htmlObject(`<div class="uc-screen"><div class="uc-status"><span>9:41</span><span class="uc-island"></span><span>•••</span></div><div class="uc-contact"><span class="uc-avatar"></span><span data-sender>PINGSTACK</span><small>Text message</small></div><div class="uc-conversation"><span class="uc-time">Now</span><div class="uc-message" data-message></div><div class="uc-code" data-code></div><span class="uc-delivered">Message example</span></div><div class="uc-input">Text message<span>↑</span></div></div>`, 280, 540, 0.0053);
    screen.position.set(0, 0, 0.173); phone.add(screen);

    const paperMaterial = new THREE.MeshStandardMaterial({ color: "#faf9f6", roughness: 1 });
    const receipt = new THREE.Group(); scene.add(receipt);
    receipt.add(new THREE.Mesh(rounded(1.4, 1.9, 0.05, 0.025), paperMaterial));
    const receiptText = htmlObject(`<div class="uc-receipt"><span class="uc-paper-label">STUDIO ADA</span><h4>Order #1042</h4><p>One less thing to chase.</p><div class="uc-paper-rule"></div><span>Collection status</span><strong>Ready to collect</strong><div class="uc-paper-rule"></div><small>Thank you for shopping with us.</small></div>`, 260, 350, 0.0052);
    receiptText.position.z = 0.05; receipt.add(receiptText); receipt.position.set(0.95, 0.1, 0.65); receipt.rotation.set(0.04, -0.15, 0.06);

    const calendar = new THREE.Group(); scene.add(calendar);
    calendar.add(new THREE.Mesh(rounded(1.2, 1.35, 0.08, 0.07), paperMaterial));
    const calendarText = htmlObject(`<div class="uc-calendar"><span>YOUR NEXT APPOINTMENT</span><strong>10:00</strong><p>Tomorrow morning</p><div class="uc-calendar-rule"></div><small>A timely reminder.</small></div>`, 250, 280, 0.0046);
    calendarText.position.z = 0.09; calendar.add(calendarText); calendar.position.set(1, 0.55, 0.6); calendar.rotation.set(0.03, -0.1, 0.08);

    const email = new THREE.Group(); scene.add(email);
    email.add(new THREE.Mesh(rounded(2.65, 2.48, 0.07, 0.04), paperMaterial));
    const emailText = htmlObject(`<div class="uc-email"><div class="uc-email-toolbar"><span>Inbox / Welcome</span><span>•••</span></div><div class="uc-email-body"><span class="uc-paper-label">STUDIO ADA</span><h4>Glad you're here, Ada.</h4><p>Your account is ready. Here's to your next chapter.</p><div class="uc-paper-rule"></div><p>Sign in to explore your dashboard and take your first step.</p><span class="uc-email-action">Explore your account →</span><small>A little hello. A useful next step.</small></div></div>`, 440, 410, 0.0059);
    emailText.position.z = 0.065; email.add(emailText); email.position.set(0.35, 0.05, 0.85); email.rotation.set(0.03, -0.1, -0.025);

    let visible = false, disposed = false, unavailable = false, frame = 0, progress = 1, lastTime = 0;
    let from = { x: 0, y: 0, angle: -0.12, scale: 1, cameraZ: 6.4 }, target = { ...from };
    const draw = () => { if (!disposed && !unavailable) { renderer.render(scene, camera); htmlRenderer.render(scene, camera); } };
    const apply = (t: number) => {
      const ease = 1 - Math.pow(1 - t, 3);
      phone.position.set(THREE.MathUtils.lerp(from.x, target.x, ease), THREE.MathUtils.lerp(from.y, target.y, ease), 0);
      phone.rotation.set(-0.035, THREE.MathUtils.lerp(from.angle, target.angle, ease), -0.035);
      phone.scale.setScalar(THREE.MathUtils.lerp(from.scale, target.scale, ease));
      camera.position.z = THREE.MathUtils.lerp(from.cameraZ, target.cameraZ, ease);
      [receipt, calendar, email].forEach((object) => { object.scale.setScalar(0.94 + 0.06 * ease); });
      draw();
    };
    function tick(time: number) {
      frame = 0;
      if (!visible || document.hidden || disposed || unavailable) return;
      progress = Math.min(1, progress + (lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0) / 0.7);
      lastTime = time; apply(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    function resume() { if (visible && !document.hidden && !unavailable && !frame && progress < 1) { lastTime = 0; frame = requestAnimationFrame(tick); } }
    function fitDistance(index: number) {
      const halfWidth = index === 0 ? 1.1 : index === 3 ? 1.9 : 1.65;
      return Math.max(6.4, halfWidth / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect) + 0.9);
    }
    function change(index: number, reduced: boolean) {
      const story = useCaseStories[index];
      screen.element.querySelector("[data-sender]")!.textContent = story.sender;
      screen.element.querySelector("[data-message]")!.textContent = story.message;
      const code = screen.element.querySelector<HTMLElement>("[data-code]")!;
      code.textContent = story.code; code.hidden = !story.code;
      receipt.visible = index === 1; calendar.visible = index === 2; email.visible = index === 3;
      from = { x: phone.position.x, y: phone.position.y, angle: phone.rotation.y, scale: phone.scale.x, cameraZ: camera.position.z };
      target = { x: index === 0 ? 0 : index === 3 ? -0.78 : -0.45, y: index === 3 ? -0.12 : 0, angle: index === 3 ? 0.12 : -0.12, scale: index === 3 ? 0.9 : 1, cameraZ: fitDistance(index) };
      progress = reduced ? 1 : 0;
      if (reduced) { cancelAnimationFrame(frame); frame = 0; apply(1); } else { apply(0); resume(); }
    }
    switchRef.current = change;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height); htmlRenderer.setSize(width, height);
      camera.aspect = width / height;
      target.cameraZ = fitDistance(stateRef.current.active); from.cameraZ = target.cameraZ; camera.position.z = target.cameraZ;
      camera.updateProjectionMatrix(); draw();
    };
    const resizer = new ResizeObserver(resize); resizer.observe(host); resize();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { cancelAnimationFrame(frame); frame = 0; } else { draw(); resume(); } }); observer.observe(host);
    document.addEventListener("visibilitychange", resume);
    const contextLost = (event: Event) => { event.preventDefault(); unavailable = true; cancelAnimationFrame(frame); frame = 0; host.style.visibility = "hidden"; onStatus("fallback"); };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    change(stateRef.current.active, stateRef.current.reducedMotion);
    onStatus("ready");

    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resizer.disconnect();
      document.removeEventListener("visibilitychange", resume); renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse((object) => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => materials.add(m)); } });
      geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); renderer.dispose();
      renderer.domElement.remove(); htmlRenderer.domElement.remove(); switchRef.current = null;
    };
  }, [onStatus]);

  return <div ref={hostRef} aria-hidden="true" className="usecase-renderer" />;
}
