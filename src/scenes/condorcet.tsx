import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, createRef, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitUntil} from '@motion-canvas/core';
import { TitleFont, WHITE } from '../constants';
import { Candidate } from '../components/Candidate';

const radialPosition = (r : number, angle : number) => {
  return {
    x: r * Math.cos(angle * (Math.PI/180)),
    y: -r * Math.sin(angle * (Math.PI/180))
  };
};

export default makeScene2D(function* (view) {
  let candidates: Candidate[] = [];
  let lines: Line[] = [];
  let title = createRef<Txt>();
  let candidateGroup = createRef<Rect>();
  const candidateNames = ['leia', 'luke', 'solo', 'vader', 'c3po'];

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
        position={[0, -400]}
        opacity={0}
        ref={title}
      >
        Condorcet Winner
      </Txt>
      <Rect
        y={50}
        ref={candidateGroup}
      >
        {range(5).map(i => 
          <Candidate
            position={[0,0]}
            ref={makeRef(candidates, i)}
            size={140}
            opacity={0}
            candidateName={candidateNames[i]}
          />
        )}
      </Rect>
    </>
  );

  yield* all(
    title().opacity(1, 1),
    title().y(-450, 1)
  );
  yield* all(
    ...candidates.map((candidate, i) => [
        candidate.position({...radialPosition(300, 90-i*(360 / candidates.length))}, 1, easeOutCubic),
        candidate.opacity(1, 1, easeOutCubic)
    ]).flat()
  );
  yield* waitUntil('arrows');

  for(let i = 0; i < 4; i++){
    candidateGroup().add(
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

  yield* candidates[0].win();

  yield* waitUntil('condorcetEnd');
});
