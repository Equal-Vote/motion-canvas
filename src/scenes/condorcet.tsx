import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, createRef, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitUntil} from '@motion-canvas/core';
import { BLUE, GOLD, GREEN, RED, TitleFont, WHITE } from '../constants';
import { Candidate } from '../components/Candidate';
import leia from '../images/leia.jpg';
import luke from '../images/luke.jpg';
import vader from '../images/vader.jpg';
import solo from '../images/solo.jpg';
import c3po from '../images/c3po.jpg';

const radialPosition = (r : number, angle : number) => {
  return {
    x: r * Math.cos(angle * (Math.PI/180)),
    y: -r * Math.sin(angle * (Math.PI/180))
  };
};

export default makeScene2D(function* (view) {
  const logger = useLogger();

  let candidates: Candidate[] = [];
  let lines: Line[] = [];
  let title = createRef<Txt>();
  const colors = [GOLD, GREEN, BLUE, RED, WHITE];
  const images = [leia, luke, solo, vader, c3po]

  view.add(
    <>
      <Rect
        position={[0, 0]}
        width={1920}
        height={1080}
        fill='#111111'
      />
      <Txt
        {...TitleFont}
        position={[0, -450]}
        opacity={0}
        ref={title}
      >
        Condorcet Winner
      </Txt>
      {range(5).map(i => 
          <Candidate
            position={[0,0]}
            ref={makeRef(candidates, i)}
            src={images[i]}
            size={140}
            stroke={colors[i]}
            opacity={0}
          />
      )}
    </>
  );

  yield* title().opacity(1, 1);
  yield* all(
    ...candidates.map((candidate, i) => [
        candidate.position({...radialPosition(300, 90-i*(360 / candidates.length))}, 1, easeOutCubic),
        candidate.opacity(1, 1, easeOutCubic)
    ]).flat()
  );
  yield* waitUntil('arrows');

  for(let i = 0; i < 4; i++){
    view.add(
      <Line
        lineCap='round'
        endArrow={true}
        arrowSize={32}
        points={[candidates[0].position, candidates[i+1].position]}
        ref={makeRef(lines, i)}
        lineWidth={16}
        stroke={WHITE}
        startOffset={100}
        endOffset={100}
        end={0}
      />
    )
    yield* lines[i].end(1, .5, easeOutQuad)
  }

  candidates[0].win();
});
