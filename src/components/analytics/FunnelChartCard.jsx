import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Filter } from 'lucide-react';
import EmptyAnalyticsState from './EmptyAnalyticsState';

/** Colour per pipeline stage â€” matches STATUS_COLORS brand palette */
const STAGE_COLORS = {
  New:       '#94A3B8',
  Contacted: '#3B82F6',
  Meeting:   '#F59E0B',
  Proposal:  '#8B5CF6',
  Won:       '#22C55E',
};

/**
 * FunnelChartCard Component
 *
 * Renders a tapered trapezoid SVG funnel (like the WhatsApp reference image) showing
 * cumulative lead counts through each pipeline stage, with a right-side legend
 * displaying stage name, lead count, and the drop-off % vs the previous stage.
 *
 * @param {Array} data - [{stage, value, percent}] from getFunnelData().
 * @returns {React.JSX.Element}
 */
const FunnelChartCard = memo(({ data = [] }) => {
  const hasData = data.some((d) => d.value > 0);

  // â”€â”€ SVG layout constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const SVG_W   = 260;   // SVG canvas width
  const MAX_W   = 240;   // widest segment (New), px
  const MIN_W   = 56;    // narrowest segment (Won), px
  const STAGE_H = 48;    // height of each trapezoid, px
  const GAP     = 3;     // vertical gap between segments, px
  const CX      = SVG_W / 2;

  // â”€â”€ Derive trapezoid geometry from data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const polygons = useMemo(() => {
    if (!data.length) return [];

    return data.map((item, i) => {
      // Width proportional to cumulative percent, clamped to [MIN_W, MAX_W]
      const wForPercent = (pct) =>
        MIN_W + ((pct / 100) * (MAX_W - MIN_W));

      const topW    = i === 0 ? MAX_W : wForPercent(data[i].percent);
      const bottomW = i === data.length - 1 ? MIN_W : wForPercent(data[i + 1].percent);

      const y1    = i * (STAGE_H + GAP);
      const y2    = y1 + STAGE_H;
      const midY  = (y1 + y2) / 2;

      // Compute drop-off vs previous stage
      const prevValue  = i === 0 ? item.value : data[i - 1].value;
      const dropOff    = prevValue > 0 && i > 0
        ? Math.round(((prevValue - item.value) / prevValue) * 100)
        : null;

      return {
        ...item,
        points: `
          ${CX - topW / 2},${y1}
          ${CX + topW / 2},${y1}
          ${CX + bottomW / 2},${y2}
          ${CX - bottomW / 2},${y2}
        `,
        midY,
        color: STAGE_COLORS[item.stage] || '#94A3B8',
        dropOff,
      };
    });
  }, [data, CX, MAX_W, MIN_W, STAGE_H, GAP]);

  const svgHeight = data.length * (STAGE_H + GAP) - GAP;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col h-full">

      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
          Sales Funnel
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">Pipeline stage conversion</p>
      </div>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {!hasData ? (
        <EmptyAnalyticsState message="No funnel data yet" />
      ) : (
        <div className="flex items-start gap-6 flex-1">

          {/* Left: SVG trapezoid funnel */}
          <div className="shrink-0">
            <svg
              viewBox={`0 0 ${SVG_W} ${svgHeight}`}
              width={SVG_W}
              height={svgHeight}
              xmlns="http://www.w3.org/2000/svg"
            >
              {polygons.map((seg) => (
                <g key={seg.stage}>
                  {/* Trapezoid fill */}
                  <polygon
                    points={seg.points}
                    fill={seg.color}
                    opacity={0.92}
                  />
                  {/* Count label centered in the segment */}
                  <text
                    x={CX}
                    y={seg.midY + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="15"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {seg.value}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Right: Legend */}
          <div className="flex flex-col justify-around flex-1" style={{ height: svgHeight }}>
            {polygons.map((seg) => (
              <div key={seg.stage} className="flex items-start gap-2">
                {/* Coloured dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0"
                  style={{ background: seg.color }}
                />
                <div className="min-w-0">
                  {/* Stage name */}
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-205 leading-tight">{seg.stage}</p>
                  {/* Count + drop-off */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {seg.value}
                    {seg.dropOff !== null && (
                      <span className="ml-1 text-red-400 font-semibold">
                        â†“ {seg.dropOff}%
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* â”€â”€ Footer: overall conversion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {hasData && data.length >= 2 && (
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <span className="text-slate-400 dark:text-slate-400 font-medium">Overall funnel conversion</span>
          <span className="font-extrabold text-green-600 dark:text-green-450">
            {data[data.length - 1].percent}%
          </span>
        </div>
      )}
    </div>
  );
});

FunnelChartCard.displayName = 'FunnelChartCard';

FunnelChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      stage:   PropTypes.string,
      value:   PropTypes.number,
      percent: PropTypes.number,
    })
  ),
};

export default FunnelChartCard;
