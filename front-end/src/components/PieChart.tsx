import React, { useEffect } from 'react';
import { pie, arc, PieArcDatum } from 'd3';
import { ClientTooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { useContext } from 'react';
import { MovementsContext } from '../context/movementsContext';

type DataItem = {
  name: string;
  value: number;
  colorFrom: string;
  colorTo: string;
};
const colors = {
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  lime: 'text-lime-400',
  indigo: 'text-indigo-400',
  sky: 'text-sky-400',
};

const keys = Object.keys(colors);
function getRandomKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

let data: DataItem[] = [];
type Movement = {
  id: string;
  category: string;
  concept: string;
  amount: number;
  income: boolean;
  dom: Date;
};

interface PieChartProps {
  movements: Movement[];
}

export default function PieChart(props: PieChartProps) {
  data = props.movements.map((movement) => {
    return {
      name: movement.category,
      value: movement.amount,
      colorFrom: colors[getRandomKey()],
      colorTo: colors[getRandomKey()],
    };
  });

  // Chart dimensions
  const radius = Math.PI * 100;
  const gap = 0.02; // Gap between slices

  // Pie layout and arc generator
  const pieLayout = pie<DataItem>()
    .sort(null)
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  const arcGenerator = arc<PieArcDatum<DataItem>>()
    .innerRadius(20)
    .outerRadius(radius)
    .cornerRadius(8);

  const labelRadius = radius * 0.8;
  const arcLabel = arc<PieArcDatum<DataItem>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);
  // Calculate the angle for each slice
  const computeAngle = (d: PieArcDatum<DataItem>) => {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  };
  // Minimum angle to display text
  const MIN_ANGLE = 20;

  return (
    <div className='p-4'>
      <div className='relative max-w-[16rem] mx-auto'>
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className='overflow-visible'>
          {/* Slices */}
          {arcs.map((d, i) => {
            const midAngle = (d.startAngle + d.endAngle) / 2;

            return (
              <ClientTooltip key={i}>
                <TooltipTrigger>
                  <g key={i}>
                    <path fill={`url(#pieColors-${i})`} d={arcGenerator(d)!} />
                    <linearGradient
                      id={`pieColors-${i}`}
                      x1='0'
                      y1='0'
                      x2='1'
                      y2='0'
                      gradientTransform={`rotate(${
                        (midAngle * 180) / Math.PI - 90
                      }, 0.5, 0.5)`}>
                      <stop
                        offset='0%'
                        stopColor={'currentColor'}
                        className={d.data.colorFrom}
                      />
                      <stop
                        offset='100%'
                        stopColor={'currentColor'}
                        className={d.data.colorTo}
                      />
                    </linearGradient>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{d.data.name}</div>
                  <div className='text-gray-500 text-sm'>
                    {d.data.value.toLocaleString('en-US')}
                  </div>
                </TooltipContent>
              </ClientTooltip>
            );
          })}
        </svg>

        {/* Labels as absolutely positioned divs */}
        <div className='absolute inset-0 pointer-events-none'>
          {arcs.map((d: PieArcDatum<DataItem>, i) => {
            const angle = computeAngle(d);
            if (angle <= MIN_ANGLE) return null;

            // Get pie center position
            const [x, y] = arcLabel.centroid(d);
            const CENTER_PCT = 50;

            // Convert to percentage positions. Adjust magic numbers to move the labels around
            const nameLeft = `${CENTER_PCT + (x / radius) * 40}%`;
            const nameTop = `${CENTER_PCT + (y / radius) * 40}%`;

            const valueLeft = `${CENTER_PCT + (x / radius) * 72}%`;
            const valueTop = `${CENTER_PCT + (y / radius) * 70}%`;

            return (
              <div key={i}>
                <div
                  className='absolute transform -translate-x-1/2 -translate-y-1/2'
                  style={{ left: valueLeft, top: valueTop }}>
                  {d.data.value}
                </div>
                <div
                  className='absolute max-w-[80px] text-white truncate text-center text-sm font-medium'
                  style={{
                    left: nameLeft,
                    top: nameTop,
                    transform: 'translate(-50%, -50%)',
                    marginLeft: x > 0 ? '2px' : '-2px',
                    marginTop: y > 0 ? '2px' : '-2px',
                  }}>
                  {d.data.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
