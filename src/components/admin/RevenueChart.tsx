'use client';

import { useId, useState } from 'react';

interface Point {
  label: string;
  value: number;
}

/** Minimal SVG revenue line — no decorative graphics (§47, §52). */
export function RevenueChart({ data }: { data: Point[] }) {
  const gradientId = useId();
  const [hover, setHover] = useState<number | null>(null);

  const W = 720;
  const H = 260;
  const pad = { top: 20, right: 16, bottom: 28, left: 16 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const min = 0;

  const x = (i: number) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) =>
    pad.top + innerH - ((v - min) / (max - min)) * innerH;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`)
    .join(' ');
  const areaPath = `${linePath} L ${x(data.length - 1)} ${pad.top + innerH} L ${x(0)} ${pad.top + innerH} Z`;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Revenue over ${data.length} months, trending from ${data[0].value}k to ${data[data.length - 1].value}k`}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A27B3F" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A27B3F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gridlines — subtle (§ gridline-subtle) */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad.left}
            x2={W - pad.right}
            y1={pad.top + innerH * t}
            y2={pad.top + innerH * t}
            stroke="#2D2D31"
            strokeWidth="1"
          />
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="#A27B3F"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Hover targets + points */}
        {data.map((d, i) => (
          <g key={d.label}>
            <rect
              x={x(i) - innerW / data.length / 2}
              y={pad.top}
              width={innerW / data.length}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
            <circle
              cx={x(i)}
              cy={y(d.value)}
              r={hover === i ? 5 : 3}
              fill={hover === i ? '#F4F2EE' : '#A27B3F'}
              className="transition-all"
            />
            <text
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              className="fill-stone font-mono"
              fontSize="10"
            >
              {d.label}
            </text>
          </g>
        ))}

        {/* Tooltip */}
        {hover !== null && (
          <g>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke="#A27B3F"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            <text
              x={x(hover)}
              y={y(data[hover].value) - 14}
              textAnchor="middle"
              className="fill-ivory font-mono"
              fontSize="12"
            >
              ${data[hover].value}k
            </text>
          </g>
        )}
      </svg>
    </figure>
  );
}
