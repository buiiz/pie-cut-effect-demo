import { useState } from 'react';
import { clsx } from 'clsx';

type SegmentIdType = 1 | 2 | 3;

const getSegmentPolygon = (angle1: number, angle2: number, length: number) => {
  const x1 = length * Math.cos((angle1 * Math.PI) / 180);
  const y1 = length * Math.sin((angle1 * Math.PI) / 180);
  const x2 = length * Math.cos((angle2 * Math.PI) / 180);
  const y2 = length * Math.sin((angle2 * Math.PI) / 180);

  return `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;
};

const getLineFromCenter = (angle: number, length: number, width: number) => {
  const x1 = length * Math.cos((angle * Math.PI) / 180);
  const y1 = length * Math.sin((angle * Math.PI) / 180);

  const xOffset = width / 2 * Math.cos(((angle + 90) * Math.PI) / 180);
  const yOffset = width / 2 * Math.sin(((angle + 90) * Math.PI) / 180);

  return `polygon(
    calc(50% - ${xOffset}px) calc(50% - ${yOffset}px),
    calc(50% + ${xOffset}px) calc(50% + ${yOffset}px),
    calc(${x1}% + ${xOffset}px) calc(${y1}% + ${yOffset}px),
    calc(${x1}% - ${xOffset}px) calc(${y1}% - ${yOffset}px)
  )`;
};

type SegmentType = {
  id: SegmentIdType;
  angle1: number;
  angle2: number;
};

const angles = [70, 190, 310];
const segments: SegmentType[] = [
  { id: 1, angle1: angles[1], angle2: angles[2] },
  { id: 2, angle1: angles[2], angle2: angles[0] },
  { id: 3, angle1: angles[0], angle2: angles[1] },
];

const App = () => {
  const [selected, setSelected] = useState<SegmentIdType[]>([]);

  const clickHandler = (segment: SegmentIdType) => {
    if (selected.includes(segment)) {
      setSelected(selected.filter((s) => s !== segment));
    } else {
      setSelected([...selected, segment]);
    }
  };

  return (
    <div className="app">
      {segments.map((segment) => (
        <div
          key={segment.id}
          onClick={() => clickHandler(segment.id)}
          className={clsx('segment-' + segment.id, {
            'segment-selected': selected.includes(segment.id),
          })}
          style={{
            clipPath: getSegmentPolygon(segment.angle1, segment.angle2, 1000),
          }}
        />
      ))}

      {angles.map((angle) => (
        <div
          className="line"
          style={{ clipPath: getLineFromCenter(angle, 1000, 6) }}
        />
      ))}

      <div className="center"></div>
    </div>
  );
};

export default App;
