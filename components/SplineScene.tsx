'use client';

import Spline from '@splinetool/react-spline';

/** Add NEXT_PUBLIC_SPLINE_SCENE_URL in .env.local after publishing a Spline scene. */
export default function SplineScene() {
  const scene = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;
  if (!scene) return null;
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}><Spline scene={scene} /></div>;
}
