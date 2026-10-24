import React, { useEffect, useRef, useState } from 'react';

interface TrailNode {
  x: number;
  y: number;
}

interface Spark3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  alpha: number;
  color: string;
  size: number;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCoarse || isReduced) {
      setDisabled(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      smoothX: width / 2,
      smoothY: height / 2,
      vx: 0,
      vy: 0,
      isPressed: false,
      hoverMode: 'default' as 'default' | 'interactive' | 'pika' | 'resume',
      hoverLabel: '',
    };

    const TRAIL_LENGTH = 20;
    const trail: TrailNode[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: mouse.x,
      y: mouse.y,
    }));

    const sparks: Spark3D[] = [];
    const shockwaves: ShockwaveRing[] = [];

    const checkHoverTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        mouse.hoverMode = 'default';
        mouse.hoverLabel = '';
        return;
      }

      const pikaEl = target.closest('[data-cursor="pika"]');
      if (pikaEl) {
        mouse.hoverMode = 'pika';
        mouse.hoverLabel = 'PET PIKA ⚡';
        return;
      }

      const interactiveEl = target.closest('a, button, input, textarea, [role="button"]');
      if (interactiveEl) {
        const text = (interactiveEl.textContent || '').toLowerCase();
        if (text.includes('resume')) {
          mouse.hoverMode = 'resume';
          mouse.hoverLabel = 'RESUME PDF';
        } else if (interactiveEl.tagName.toLowerCase() === 'a') {
          mouse.hoverMode = 'interactive';
          mouse.hoverLabel = 'OPEN ↗';
        } else {
          mouse.hoverMode = 'interactive';
          mouse.hoverLabel = 'INTERACT';
        }
        return;
      }

      mouse.hoverMode = 'default';
      mouse.hoverLabel = '';
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      checkHoverTarget(e.target);

      // Spawn subtle 3D motion sparks when moving fast
      const speed = Math.hypot(mouse.vx, mouse.vy);
      if (speed > 4 && sparks.length < 70) {
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          z: (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 2.2 - mouse.vx * 0.08,
          vy: (Math.random() - 0.5) * 2.2 - mouse.vy * 0.08,
          vz: (Math.random() - 0.5) * 3,
          alpha: 0.9,
          color:
            mouse.hoverMode === 'pika'
              ? '#facc15'
              : Math.random() > 0.4
              ? '#22d3ee'
              : '#818cf8',
          size: Math.random() * 2.2 + 1.2,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      mouse.isPressed = true;
      const primaryColor = mouse.hoverMode === 'pika' ? '#facc15' : '#22d3ee';

      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 54,
        alpha: 0.95,
        color: primaryColor,
      });

      // 3D Octahedral Spark Shatter Burst on Click
      for (let i = 0; i < 16; i++) {
        const theta = (Math.PI * 2 * i) / 16;
        const speed = 2.5 + Math.random() * 4.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          z: 0,
          vx: Math.cos(theta) * speed,
          vy: Math.sin(theta) * speed,
          vz: (Math.random() - 0.5) * 8,
          alpha: 1,
          color: i % 2 === 0 ? '#22d3ee' : '#facc15',
          size: 2.5 + Math.random() * 1.8,
        });
      }
    };

    const onMouseUp = () => {
      mouse.isPressed = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // 3D rotation helper
    const project3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number,
      cx: number,
      cy: number
    ) => {
      // Rotate X
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);

      // Rotate Y
      const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);

      // Rotate Z
      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

      const fov = 240;
      const scale = fov / (fov + z2 + 60);

      return {
        x: cx + x3 * scale,
        y: cy + y3 * scale,
        scale,
        z: z2,
      };
    };

    let time = 0;
    let rafId: number;

    const render = () => {
      time += 0.045;
      ctx.clearRect(0, 0, width, height);

      // Smooth spring interpolation for the 3D Gyroscope ring center
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.28;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.28;
      mouse.vx *= 0.85;
      mouse.vy *= 0.85;

      // Update ribbon trail nodes
      trail[0].x = mouse.x;
      trail[0].y = mouse.y;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.42;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.42;
      }

      const isPika = mouse.hoverMode === 'pika';
      const isInteractive = mouse.hoverMode !== 'default';
      const primaryColor = isPika ? '#facc15' : '#22d3ee';
      const secondaryColor = isPika ? '#fb923c' : '#6366f1';

      // 1. Draw Tapered Neon Plasma Ribbon Trail
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < TRAIL_LENGTH - 1; i++) {
        const progress = 1 - i / TRAIL_LENGTH;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        const midX = (trail[i].x + trail[i + 1].x) / 2;
        const midY = (trail[i].y + trail[i + 1].y) / 2;
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, midX, midY);
        ctx.strokeStyle = isPika
          ? `rgba(250, 204, 21, ${progress * 0.55})`
          : `rgba(34, 211, 238, ${progress * 0.55})`;
        ctx.lineWidth = progress * 7;
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw 3D Perspective Orbital Gyroscope Rings around smoothX, smoothY
      const gyroRadius = mouse.isPressed ? 16 : isInteractive ? 28 : 20;
      const tiltX = time * (isInteractive ? 1.8 : 1.1) + mouse.vy * 0.04;
      const tiltY = time * (isInteractive ? 1.5 : 0.9) - mouse.vx * 0.04;

      // Draw Ring A (3D segmented polygon loop)
      ctx.save();
      ctx.beginPath();
      const SEGMENTS = 28;
      for (let i = 0; i <= SEGMENTS; i++) {
        const a = (i / SEGMENTS) * Math.PI * 2;
        const px = Math.cos(a) * gyroRadius;
        const py = Math.sin(a) * gyroRadius;
        const pt = project3D(px, py, 0, tiltX, tiltY, time * 0.5, mouse.smoothX, mouse.smoothY);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = isInteractive ? 1.8 : 1.3;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10;
      ctx.stroke();

      // Draw Ring B (Orthogonal counter-rotating 3D ring)
      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const a = (i / SEGMENTS) * Math.PI * 2;
        const px = Math.cos(a) * (gyroRadius * 0.88);
        const pz = Math.sin(a) * (gyroRadius * 0.88);
        const pt = project3D(px, 0, pz, -tiltY * 0.9, tiltX * 0.9, -time * 0.6, mouse.smoothX, mouse.smoothY);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw 3D Rotating Octahedron / Crystal Core inside the Gyroscope when hovering interactive targets
      if (isInteractive) {
        const octR = 7;
        const vertices = [
          [0, -octR, 0],
          [octR, 0, 0],
          [0, 0, octR],
          [-octR, 0, 0],
          [0, 0, -octR],
          [0, octR, 0],
        ].map(([vx, vy, vz]) => project3D(vx, vy, vz, time * 2, time * 1.6, 0, mouse.smoothX, mouse.smoothY));

        const edges = [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
          [5, 1],
          [5, 2],
          [5, 3],
          [5, 4],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 1],
        ];

        ctx.beginPath();
        for (const [u, v] of edges) {
          ctx.moveTo(vertices[u].x, vertices[u].y);
          ctx.lineTo(vertices[v].x, vertices[v].y);
        }
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Draw 3D Faceted Cyber Arrowhead at exact cursor tip (mouse.x, mouse.y)
      ctx.save();
      ctx.translate(mouse.x, mouse.y);

      // Slight dynamic bank angle based on horizontal velocity
      const bankAngle = -0.38 + Math.max(-0.25, Math.min(0.25, mouse.vx * 0.012));
      ctx.rotate(bankAngle);

      const scale = mouse.isPressed ? 0.85 : 1;
      ctx.scale(scale, scale);

      // Left sunlit 3D facet
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-7, 17);
      ctx.lineTo(0, 13);
      ctx.closePath();
      ctx.fillStyle = isPika ? '#fef08a' : '#67e8f9';
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 12;
      ctx.fill();

      // Right shaded 3D facet
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(7, 17);
      ctx.lineTo(0, 13);
      ctx.closePath();
      ctx.fillStyle = isPika ? '#eab308' : '#2563eb';
      ctx.fill();
      ctx.restore();

      // 4. Draw Contextual Floating 3D HUD Pill Label
      if (mouse.hoverLabel) {
        ctx.save();
        ctx.font = '600 10px "JetBrains Mono", monospace';
        const textWidth = ctx.measureText(mouse.hoverLabel).width;
        const bx = mouse.smoothX + 24;
        const by = mouse.smoothY - 24;

        ctx.fillStyle = 'rgba(11, 17, 32, 0.9)';
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, textWidth + 14, 20, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = primaryColor;
        ctx.fillText(mouse.hoverLabel, bx + 7, by + 13.5);
        ctx.restore();
      }

      // 5. Render 3D Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        s.alpha -= 0.032;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const fovScale = 240 / Math.max(60, 240 + s.z);
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.8, s.size * fovScale), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Render Click Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.18;
        sw.alpha -= 0.045;

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sw.alpha;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(sw.x, sw.y, sw.radius, sw.radius * 0.65, -0.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(rafId);
      } else {
        rafId = window.requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (disabled) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default CustomCursor;
