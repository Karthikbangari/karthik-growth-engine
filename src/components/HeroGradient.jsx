import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

// Dreamy animated water-plane gradient used behind the hero.
// The full look (colours, motion, camera) is driven by the customise URL.
const URL =
  "https://shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=170&cDistance=4.4&cPolarAngle=70&cameraZoom=1&color1=%23fffff7&color2=%234de7ff&color3=%23fdd4ff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&loop=on&loopDuration=10&pixelDensity=1&positionX=0&positionY=0.9&positionZ=-0.3&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=0&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.2&uFrequency=0&uSpeed=0.2&uStrength=3.4&uTime=0&wireframe=false";

export default function HeroGradient() {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      pointerEvents="none"
    >
      <ShaderGradient control="query" urlString={URL} />
    </ShaderGradientCanvas>
  );
}
