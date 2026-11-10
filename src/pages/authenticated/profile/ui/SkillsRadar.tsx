import { useId } from 'react'

import { SKILLS } from '../config/profile'
import {
  getLabelAnchor,
  getRadarPoint,
  getRadarPolygon,
  RADAR_CENTER,
  RADAR_LABEL_RADIUS,
  RADAR_RADIUS,
} from '../lib/radarGeometry'

// Уровни сетки радара: четверть, половина, три четверти и внешний контур (он с заливкой фона).
const GRID_LEVELS = [0.25, 0.5, 0.75, 1] as const

/*
 * Радар навыков из макета (SVG). Цвета — токены темы, поэтому в тёмной теме он тоже читается.
 * Для скринридера — одна картинка с перечнем навыков и значений в заголовке.
 */
export function SkillsRadar() {
  const id = useId()
  const count = SKILLS.length
  const gradientId = `${id}-gradient`
  const skillList = SKILLS.map(({ label, value }) => `${label} ${String(value)}`).join(', ')
  const title = `Навыки по категориям: ${skillList}`

  return (
    <svg aria-labelledby={`${id}-title`} className="block h-auto w-full" role="img" viewBox="-62 0 424 300">
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" style={{ stopColor: 'var(--color-navy)' }} />
          <stop offset="55%" style={{ stopColor: 'var(--color-emerald)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-gold)' }} />
        </linearGradient>
      </defs>
      {GRID_LEVELS.map((level) => (
        <polygon
          className={level === 1 ? 'fill-background stroke-line' : 'fill-none stroke-line'}
          key={level}
          points={getRadarPolygon(SKILLS.map(() => RADAR_RADIUS * level))}
        />
      ))}
      {SKILLS.map(({ label }, index) => {
        const [x, y] = getRadarPoint(index, count, RADAR_RADIUS)
        return <line className="stroke-line" key={label} x1={RADAR_CENTER} x2={x} y1={RADAR_CENTER} y2={y} />
      })}
      <polygon
        className="stroke-emerald"
        fill={`url(#${gradientId})`}
        fillOpacity={0.55}
        points={getRadarPolygon(SKILLS.map(({ value }) => (RADAR_RADIUS * value) / 100))}
        strokeLinejoin="round"
        strokeWidth={2}
      />
      {SKILLS.map(({ label, value }, index) => {
        const [x, y] = getRadarPoint(index, count, (RADAR_RADIUS * value) / 100)
        const [labelX, labelY] = getRadarPoint(index, count, RADAR_LABEL_RADIUS)
        return (
          <g key={label}>
            <circle className="fill-surface stroke-emerald" cx={x} cy={y} r={4} strokeWidth={2} />
            <text
              className="fill-body font-sans text-12 font-semibold"
              dominantBaseline="middle"
              textAnchor={getLabelAnchor(labelX)}
              x={labelX}
              y={labelY}
            >
              {label} <tspan className="fill-success">{value}</tspan>
            </text>
          </g>
        )
      })}
    </svg>
  )
}
