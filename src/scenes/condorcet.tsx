import {makeScene2D, Circle, Rect, Line} from '@motion-canvas/2d';
import {all, makeRef, range, useLogger, waitUntil} from '@motion-canvas/core';
import { BLUE, GOLD, GREEN, ORANGE, PURPLE, RED, WHITE, YELLOW } from '../constants';


const radialPosition = (r : number, angle : number) => {
  return {
    x: r * Math.cos(angle * (Math.PI/180)),
    y: -r * Math.sin(angle * (Math.PI/180))
  };
};

export default makeScene2D(function* (view) {
  const logger = useLogger();

  let circles: Circle[] = [];
  let lines: Line[] = [];
  const colors = [GOLD, GREEN, BLUE, RED, WHITE];

  view.add(
    <>
      <Rect
        position={[0, 0]}
        width={1920}
        height={1080}
        fill='#111111'
      />
      {range(5).map(i => 
          <Circle
            position={[0,0]}
            ref={makeRef(circles, i)}
            width={140}
            height={140}
            fill={colors[i]}
          />
      )}
    </>
  );

  yield all(
    ...circles.map((circle, i) => [
        circle.position({...radialPosition(300, 90-i*(360 / circles.length))}, 1)
    ]).flat()
  );
  yield* waitUntil('arrows');

  for(let i = 0; i < 4; i++){
    view.add(
      <Line
        lineCap='round'
        endArrow={true}
        arrowSize={32}
        points={[circles[i+1].position, circles[0].position]}
        ref={makeRef(lines, i)}
        lineWidth={16}
        stroke='#080808'
        startOffset={100}
        endOffset={100}
        end={0}
      />
    )
    yield* lines[i].end(1, 1)
  }
});
