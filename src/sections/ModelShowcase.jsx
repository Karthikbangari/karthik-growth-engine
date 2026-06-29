import { Suspense, lazy, useEffect, useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";

// Lazy-load the 3D viewer so three.js (~0.7MB) is only fetched as its own
// chunk, and only when the user scrolls near this section (see observer below).
const ModelViewer = lazy(() => import("../components/ModelViewer"));

export default function ModelShowcase() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading a bit before it's on screen
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return (
    <section id="showcase" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Interactive"
        title="Spin it around"
        subtitle="A little 3D flourish — drag to rotate. Swap in any product or brand model you like."
      />

      <div
        ref={ref}
        className="mx-auto mt-10 grid w-full place-items-center overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-card backdrop-blur-md"
        style={{ minHeight: 420 }}
      >
        {inView ? (
          <Suspense
            fallback={
              <span className="font-grotesk text-sm text-ink/50">Loading 3D…</span>
            }
          >
            <ModelViewer
              url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
              width="100%"
              height={420}
              autoFrame
              fadeIn
              autoRotate
              autoRotateSpeed={0.5}
              enableManualZoom={false}
              showScreenshotButton={false}
              environmentPreset="city"
            />
          </Suspense>
        ) : (
          <span className="font-grotesk text-sm text-ink/40">3D preview</span>
        )}
      </div>
    </section>
  );
}
