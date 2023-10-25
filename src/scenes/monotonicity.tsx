import {Layout, Line, makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import {all, createRef, linear, makeRef, waitUntil } from '@motion-canvas/core';
import { BaseFont, BLACK, DKGRAY, TitleFont } from '../constants';
import { Candidate } from '../components/Candidate';

export default makeScene2D(function* (view) {
  let title = createRef<Txt>();
  let layout = createRef<Rect>();
  let candidate = createRef<Candidate>();
  let gainArrow = createRef<Line>();
  let loseArrow = createRef<Line>();
  let gainSupport = createRef<Txt>();
  let loseSupport = createRef<Txt>();

  view.add(
    <>
      <Rect
        position={[0, 0]}
        width={1920}
        height={1080}
        fill={BLACK}
      />
      <Txt
        {...TitleFont}
        position={[0, -400]}
        opacity={0}
        ref={title}
      >
        Monotonicity Failure
      </Txt>
      <Candidate
        ref={candidate} 
        candidateName={'luke'}
        size={140}
        opacity={1}
        y={200}
        zIndex={1}
      />
      <Line
        ref={gainArrow}
        endArrow={true}
        arrowSize={270}
        lineWidth={240}
        stroke={DKGRAY}
        points={[[candidate().position.x(), candidate().position.y()+120], [candidate().position.x(), candidate().position.y()-500]]}
        opacity={0}
      />
      <Line
        ref={loseArrow}
        startArrow={true}
        arrowSize={270}
        lineWidth={240}
        stroke={DKGRAY}
        points={[[candidate().position.x(), candidate().position.y()+120], [candidate().position.x(), candidate().position.y()-500]]}
        opacity={0}
      />
      <Txt
        {...BaseFont}
        fill={BLACK}
        position={[0, -70]}
        opacity={1}
        ref={gainSupport}
        fontSize={60}
      >
        Gain Support
      </Txt>
      <Txt
        {...BaseFont}
        fill={BLACK}
        position={[0, 90]}
        opacity={0}
        ref={loseSupport}
        fontSize={60}
      >
        Lose Support
      </Txt>
    </>
  );

  yield* all(
    title().opacity(1, 1),
    title().y(-450, 1)
  );

  yield* candidate().win();

  yield* gainArrow().opacity(1, .5);

  yield* waitUntil('gainSupportMovement')

  yield* all(
    candidate().resetWin(),
    gainArrow().opacity(0, .5),
    candidate().y(candidate().y()-320, .7)
  );

  yield* candidate().lose();

  gainSupport().opacity(0);
  loseSupport().opacity(1);

  yield* loseArrow().opacity(1, .5);

  yield* waitUntil('loseSupportMovement')

  yield* all(
    candidate().resetLose(),
    loseArrow().opacity(0, .5),
    candidate().y(candidate().y()+320, .7)
  );

  yield* candidate().win();

  yield* waitUntil('monotonicityEnd')
});

