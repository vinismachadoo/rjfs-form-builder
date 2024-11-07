import React from 'react';

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function adjustLightness(rgb: [number, number, number], factor: number): [number, number, number] {
  const [r, g, b] = rgb.map((channel) => {
    const adjusted = channel * factor;
    return Math.min(255, Math.max(0, Math.round(adjusted)));
  });
  return [r, g, b];
}

function generatePalette(hexColor: string): Record<string, string> {
  const baseRgb = hexToRgb(hexColor);

  // Custom lightness factors for Tailwind-style tones
  const lightnessFactors = [
    2.0, // 50
    1.8, // 10
    1.6, // 200
    1.4, // 300
    1.2, // 400
    1.0, // 500
    0.85, // 600
    0.7, // 700
    0.55, // 800
    0.4, // 900
    0.3, // 950
  ];

  // Generate palette with correct tone labels
  const tones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const palette: Record<string, string> = {};

  lightnessFactors.forEach((factor, index) => {
    const tone = tones[index];
    const adjustedRgb = adjustLightness(baseRgb, factor);
    palette[tone.toString()] = rgbToHex(adjustedRgb);
  });

  return palette;
}

export const Tailwind = () => {
  const inputHex = '#c4544a'; // Tailwind blue-500 as an example
  const palette = generatePalette(inputHex);

  return (
    <div className="flex gap-x-2">
      {Object.values(palette).map((v) => (
        <div className="size-20" key={v} style={{ backgroundColor: v }}>
          {v}
        </div>
      ))}
    </div>
  );
  // return Object.entries(palette).forEach(([key, value]) => (
  //   <div key={key} style={{ backgroundColor: value }}>
  //     vini
  //   </div>
  // ));
};
