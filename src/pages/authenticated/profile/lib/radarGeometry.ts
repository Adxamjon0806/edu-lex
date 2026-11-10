// Геометрия радара из макета: центр (150; 150), радиус 110. Область SVG (viewBox -62 0 424 300) шире, чем
// в макете (-20 0 340 300): там обрезались подписи «Аудирование» и «Письмо».
export const RADAR_CENTER = 150
export const RADAR_RADIUS = 110
// Подписи осей стоят чуть дальше внешнего контура.
export const RADAR_LABEL_RADIUS = 132

// Выравнивание подписи: на вертикальной оси — по центру, справа от центра — от начала, слева — к концу.
export function getLabelAnchor(x: number) {
  if (Math.abs(x - RADAR_CENTER) < 5) return 'middle'
  return x > RADAR_CENTER ? 'start' : 'end'
}

// Точка на оси index из count на расстоянии radius от центра; первая ось смотрит вверх.
export function getRadarPoint(index: number, count: number, radius: number): readonly [number, number] {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count
  return [RADAR_CENTER + radius * Math.cos(angle), RADAR_CENTER + radius * Math.sin(angle)]
}

// Атрибут points многоугольника по радиусам для каждой оси.
export function getRadarPolygon(radii: readonly number[]) {
  return radii
    .map((radius, index) =>
      getRadarPoint(index, radii.length, radius)
        .map((n) => n.toFixed(1))
        .join(','),
    )
    .join(' ')
}
