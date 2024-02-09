import {Layout, makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import { BLUE, LTBLUE, GOLD, GREEN, RED, PURPLE, ORANGE, WHITE } from '../constants';
import { Party } from '../components/Party';
import { all, delay, makeRef, waitFor } from '@motion-canvas/core';

import dems from '../images/democrats.png';
import reps from '../images/republicans.png';

export default makeScene2D(function* (view) {
  let parties: Party[] = [];
  view.add(
    <>
      <Party
        ref={makeRef(parties, 0)}
        fill={BLUE}
        x={-400}
        y={40}
        size={500} // 500
        src={dems}
        opacity={0}
      />
      <Party
        ref={makeRef(parties, 1)}
        fill={RED}
        x={400}
        y={40}
        size={500} // 500
        src={reps}
        opacity={0}
      />
      <Party
        ref={makeRef(parties, 2)}
        fill={PURPLE}
        x={105}
        y={-150}
        size={0}
      />
      <Party
        ref={makeRef(parties, 3)}
        fill={GREEN}
        x={-500}
        y={300}
        size={0}
      />
      <Party
        ref={makeRef(parties, 4)}
        fill={GOLD}
        x={-160}
        y={-250}
        size={0}
      />
      <Party
        ref={makeRef(parties, 5)}
        fill={ORANGE}
        x={230}
        y={250}
        size={0}
      />
      <Party
        ref={makeRef(parties, 6)}
        fill={LTBLUE}
        x={-120}
        y={150}
        size={0}
      />
      <Party
        ref={makeRef(parties, 7)}
        fill={WHITE}
        x={420}
        y={-300}
        size={0}
      />
    </>
  );

  yield *waitFor(.5);
  yield *all(
    parties[0].y(0, 1),
    parties[0].opacity(1, 1),
    parties[1].y(0, 1),
    parties[1].opacity(1, 1),
  );
  yield *waitFor(2);
  let vals = [330, 330, 200, 160, 187, 159, 221, 200];
  yield *all(...parties.map((party, i) => delay(i < 2 ? 0 : .4 + (i-1) * .2, party.size(vals[i], i < 2 ? 1.8 : .2)) ));
  yield *waitFor(2);
});
