const fnv1a = (str: string): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash >>> 0;
};

export const stringToBlueRGB = (s: string): [number, number, number] => {
  const hash = fnv1a(s).toString(16).padStart(8, '0');

  const r = parseInt(hash.substring(0, 2), 16) % 150;
  const g = Math.floor(parseInt(hash.substring(2, 4), 16) % 101) + 50;
  const b = (parseInt(hash.substring(4, 6), 16) % 150) + 55;

  const adjustContrast = (value: number, factor: number) => {
    return Math.min(255, Math.max(0, value + factor));
  };

  const contrastFactor = (parseInt(hash.substring(6, 8), 16) % 30) - 15;

  const adjustedR = adjustContrast(r, contrastFactor * 0.75);
  const adjustedG = adjustContrast(g, contrastFactor * 0.75);
  const adjustedB = adjustContrast(b, -contrastFactor * 0.5);

  return [adjustedR, adjustedG, adjustedB];
};

export function rgbToString([r, g, b]: [number, number, number]): string {
  return `rgba(${r}, ${g}, ${b}, 0.9)`;
}
