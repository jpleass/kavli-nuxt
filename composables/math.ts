import type { Spherical } from 'three'

export const clamp = (x: number, min: number = 0, max: number = 1) =>
  Math.max(Math.min(x, max), min)
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const inverseLerp = (a: number, b: number, x: number) => {
  const range = b - a
  if (range === 0) return a
  return (x - a) / range
}
export const map = (
  x: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
) => lerp(newMin, newMax, inverseLerp(oldMin, oldMax, x))
export const mapClamped = (
  x: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
) =>
  clamp(
    map(x, oldMin, oldMax, newMin, newMax),
    Math.min(newMin, newMax),
    Math.max(newMin, newMax),
  )
export const sign = (x: number) => (x > 0 ? 1 : -1)
export const DEG2RAD = Math.PI / 180
export const RAD2DEG = 180 / Math.PI
export const shortestAngleDistance = (angle1: number, angle2: number) => {
  const max = Math.PI * 2
  const da = (angle2 - angle1) % max
  return ((2 * da) % max) - da
}

export const lerpSpherical = (
  out: Spherical,
  a: Spherical,
  b: Spherical,
  t: number,
): void => {
  out.phi += shortestAngleDistance(a.phi, b.phi) * t
  out.theta += shortestAngleDistance(a.theta, b.theta) * t
  out.radius = lerp(a.radius, b.radius, t)
}
export const roundToPrecision = (n: number, precision: number) =>
  Math.round(n / precision) * precision
