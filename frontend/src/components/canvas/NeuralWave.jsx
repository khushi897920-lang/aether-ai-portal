import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralWave() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Viewport dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Perspective Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 220;
    camera.position.y = 90;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 2. WebGL Renderer with alpha support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.setSize(width, height);
    renderer.setClearColor(0x060911, 0.95); // Deep dark void background matching our theme
    
    // Style the canvas element explicitly
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    
    container.appendChild(renderer.domElement);

    // 3. Buffer Geometry mapping grid positions
    const SEPARATOR = 15;
    const AMOUNTX = 55;
    const AMOUNTY = 55;

    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Lay out grid positions centered
        positions[i] = ix * SEPARATOR - (AMOUNTX * SEPARATOR) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATOR - (AMOUNTY * SEPARATOR) / 2;
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage); // Optimize for frequent updates
    geometry.setAttribute('position', positionAttribute);

    // 4. Custom canvas texture for anti-aliased glowing circular particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    // Vibrant teal-green neon color matching the mockup left pane
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.65)');
    gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.3)');
    gradient.addColorStop(1, 'rgba(6, 9, 17, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 7,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    // Prevent frustum culling from hiding the particles during vertical waves
    particles.frustumCulled = false;
    scene.add(particles);

    // 5. trigonometric float animation loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posAttr = geometry.getAttribute('position');
      const positionsArray = posAttr.array;
      let i = 0;

      const time = clock.getElapsedTime() * 2.1; // Frame-rate independent speed factor

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positionsArray[i + 1] = (Math.sin((ix * 0.25) + time) * 18) + (Math.sin((iy * 0.2) + time) * 18);
          i += 3;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 6. Grid resizing observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use contentRect for precise canvas layout bounds
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Cleanup WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 bg-void-950 overflow-hidden select-none pointer-events-none"
    />
  );
}
