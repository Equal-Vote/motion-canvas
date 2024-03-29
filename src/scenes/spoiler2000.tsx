import {Layout, makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import {all, createRef, delay, linear, makeRef, waitFor, waitUntil } from '@motion-canvas/core';
import { BLACK, TitleFont } from '../constants';
import { Candidate } from '../components/Candidate';

export default makeScene2D(function* (view) {
  let title = createRef<Txt>();
  let layout = createRef<Rect>();
  let candidates: Candidate[] = [];
  let bars: Rect[] = [];

  view.add(
    <>
      <Rect
        direction={'row'}
        layout
        ref={layout}
        y={170}
        opacity={0}
      >
        {['nader', 'gore', 'bush'].map((name, i) => 
          <Rect
            layout
            direction={'column'}
            alignItems={'center'}
          >
            <Candidate
              ref={makeRef(candidates, i)} 
              candidateName={name}
              size={140}
              opacity={i==0? 0 : 1}
              y={-140}
            />
            <Rect
              fill={candidates[i].stroke}
              ref={makeRef(bars, i)} 
              height={50}
              width={[0, 660, 540][i]}
            />
          </Rect>
        )}
      </Rect>
    </>
  );

  yield* waitFor(1);

  yield* all(
    layout().opacity(1, 1),
    layout().y(layout().y()-40, 1),
  );

  yield* candidates[1].majorityWin();

  yield* waitFor(.5);
  yield* candidates[1].resetMajorityWin();

  let t = 1;
  yield* all(
    candidates[0].opacity(1, t),
    bars[0].width(240, t),
    bars[1].width(420, t),
  );

  yield* candidates[0].spoiler();

  yield* waitFor(.5);

  yield* candidates[2].win();

  yield* waitFor(2);

  //yield* all(
  //  candidates[0].refresh('nader'),
  //  delay(.2, candidates[1].refresh('gore')),
  //  delay(.4, candidates[2].refresh('bush')),
  //)

  //yield* waitFor(2);


});
