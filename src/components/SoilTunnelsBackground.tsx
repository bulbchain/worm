import React, { useEffect, useRef } from 'react';

export const SoilTunnelsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Root paths simulation (tunnels in the soil)
    interface RootVein {
      points: { x: number; y: number }[];
      color: string;
      width: number;
      speed: number;
      pulseOffset: number;
    }

    const roots: RootVein[] = [];
    const colors = ['rgba(0, 245, 212, 0.08)', 'rgba(16, 185, 129, 0.07)', 'rgba(163, 230, 53, 0.06)', 'rgba(236, 72, 153, 0.05)'];

    for (let i = 0; i < 9; i++) {
      const startX = (width / 8) * i + (Math.random() * 80 - 40);
      const points: { x: number; y: number }[] = [];
      let curX = startX;
      let curY = 0;
      points.push({ x: curX, y: curY });

      while (curY < height + 100) {
        curY += Math.random() * 80 + 40;
        curX += (Math.random() - 0.5) * 90;
        points.push({ x: curX, y: curY });
      }

      roots.push({
        points,
        color: colors[i % colors.length],
        width: Math.random() * 2 + 1,
        speed: Math.random() * 0.002 + 0.001,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Floating subterranean spores / photon dust
    interface SporeParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    const sporePalette = ['#00f5d4', '#10b981', '#a3e635', '#ec4899', '#f59e0b'];
    const spores: SporeParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.1,
      alpha: Math.random() * 0.4 + 0.2,
      color: sporePalette[Math.floor(Math.random() * sporePalette.length)],
    }));

    // Ambient background crawling worm silhouette
    interface AmbientWorm {
      x: number;
      y: number;
      angle: number;
      speed: number;
      color: string;
      trail: { x: number; y: number }[];
      maxLen: number;
    }

    const ambientWorms: AmbientWorm[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        angle: 0.4,
        speed: 0.7,
        color: 'rgba(0, 245, 212, 0.18)',
        trail: [],
        maxLen: 28,
      },
      {
        x: width * 0.8,
        y: height * 0.7,
        angle: -2.2,
        speed: 0.6,
        color: 'rgba(163, 230, 53, 0.15)',
        trail: [],
        maxLen: 32,
      },
      {
        x: width * 0.5,
        y: height * 0.85,
        angle: 1.8,
        speed: 0.8,
        color: 'rgba(236, 72, 153, 0.14)',
        trail: [],
        maxLen: 24,
      },
    ];

    let t = 0;

    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle glowing root tunnels
      roots.forEach((root) => {
        ctx.beginPath();
        ctx.strokeStyle = root.color;
        ctx.lineWidth = root.width;
        ctx.lineCap = 'round';
        ctx.moveTo(root.points[0].x, root.points[0].y);

        for (let j = 1; j < root.points.length - 1; j++) {
          const xc = (root.points[j].x + root.points[j + 1].x) / 2;
          const yc = (root.points[j].y + root.points[j + 1].y) / 2;
          const wobble = Math.sin(t * 0.8 + root.pulseOffset + j) * 8;
          ctx.quadraticCurveTo(root.points[j].x + wobble, root.points[j].y, xc, yc);
        }
        ctx.stroke();
      });

      // Draw ambient subterranean worms
      ambientWorms.forEach((worm) => {
        worm.angle += (Math.sin(t * 1.5 + worm.x * 0.01) * 0.04);
        worm.x += Math.cos(worm.angle) * worm.speed;
        worm.y += Math.sin(worm.angle) * worm.speed;

        if (worm.x < -50) worm.x = width + 50;
        if (worm.x > width + 50) worm.x = -50;
        if (worm.y < -50) worm.y = height + 50;
        if (worm.y > height + 50) worm.y = -50;

        worm.trail.unshift({ x: worm.x, y: worm.y });
        if (worm.trail.length > worm.maxLen) worm.trail.pop();

        if (worm.trail.length > 2) {
          ctx.beginPath();
          ctx.strokeStyle = worm.color;
          ctx.lineWidth = 5;
          ctx.lineCap = 'round';
          ctx.moveTo(worm.trail[0].x, worm.trail[0].y);
          for (let i = 1; i < worm.trail.length; i++) {
            ctx.lineTo(worm.trail[i].x, worm.trail[i].y);
          }
          ctx.stroke();

          // Head glowing pip
          ctx.fillStyle = worm.color;
          ctx.beginPath();
          ctx.arc(worm.x, worm.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw floating bioluminescent spores
      spores.forEach((spore) => {
        spore.x += spore.vx;
        spore.y += spore.vy;

        if (spore.x < 0) spore.x = width;
        if (spore.x > width) spore.x = 0;
        if (spore.y < 0) spore.y = height;
        if (spore.y > height) spore.y = 0;

        ctx.save();
        ctx.globalAlpha = spore.alpha * (0.6 + Math.sin(t * 2 + spore.x) * 0.4);
        ctx.fillStyle = spore.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = spore.color;
        ctx.beginPath();
        ctx.arc(spore.x, spore.y, spore.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
};
