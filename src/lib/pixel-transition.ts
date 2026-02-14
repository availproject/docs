let isTransitioning = false;

export function pixelTransition(
  callback: () => void,
  origin?: { x: number; y: number },
): void {
  if (isTransitioning) {
    callback();
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    callback();
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    callback();
    return;
  }

  isTransitioning = true;
  document.dispatchEvent(new CustomEvent("pixelTransitionStart"));
  const pixelSize = 10;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "99999",
    pointerEvents: "none",
  });

  // Read the page-level background from --page-bg custom property.
  // Layouts declare their dominant bg via data-page-bg on a wrapper;
  // a :has() rule in global.css maps it to --page-bg on :root.
  const pageBg = getComputedStyle(document.documentElement)
    .getPropertyValue("--page-bg")
    .trim();
  const bgColor = pageBg || getComputedStyle(document.body).backgroundColor;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Mount overlay, then switch theme underneath
  document.body.appendChild(canvas);
  callback();

  // Build pixel grid
  const cols = Math.ceil(width / pixelSize);
  const rows = Math.ceil(height / pixelSize);
  const pixels: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pixels.push([c * pixelSize, r * pixelSize]);
    }
  }

  // Sort by distance from origin (with jitter for organic feel)
  // Uses Schwartzian transform: pre-compute random keys so the comparator
  // is deterministic — avoids V8 TimSort corruption from inconsistent ordering.
  if (origin) {
    const sorted = pixels
      .map((p) => ({
        p,
        d:
          Math.hypot(p[0] - origin.x, p[1] - origin.y) +
          Math.random() * pixelSize * 4,
      }))
      .sort((a, b) => a.d - b.d);
    for (let i = 0; i < sorted.length; i++) {
      pixels[i] = sorted[i].p;
    }
  } else {
    // Fisher-Yates shuffle (random dissolve)
    for (let i = pixels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
    }
  }

  // Wait for theme change to apply to DOM (useEffect + paint)
  // before starting the dissolve — otherwise cleared pixels reveal
  // the OLD theme (same color as the canvas) and nothing is visible.
  const duration = 400;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const startTime = performance.now();
      let lastCleared = 0;

      function animate(currentTime: number) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 2;
        const targetCleared = Math.floor(eased * pixels.length);

        for (let i = lastCleared; i < targetCleared && i < pixels.length; i++) {
          ctx?.clearRect(pixels[i][0], pixels[i][1], pixelSize, pixelSize);
        }
        lastCleared = targetCleared;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          canvas.remove();
          isTransitioning = false;
          document.dispatchEvent(new CustomEvent("pixelTransitionEnd"));
        }
      }

      requestAnimationFrame(animate);
    });
  });
}
