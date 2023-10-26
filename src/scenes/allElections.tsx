import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, createRef, delay, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitFor, waitUntil} from '@motion-canvas/core';
import { BKGGRAY, DKGRAY, RED, TitleFont, WHITE } from '../constants';
import { Election } from '../components/Election';

export default makeScene2D(function* (view) {
  let elections: Election[] = [];

  let electionCount=448;
  let electionSize=50;
  let electionGap=10;
  let electionColumns = 30;
  let electionX = -((electionColumns-1)*(electionSize+electionGap)) / 2;
  let electionY = -((Math.ceil(electionCount/electionColumns)-1)*(electionSize+electionGap)) / 2;

  view.add(
    <>
      <Rect
        position={[0, 0]}
        width={1920}
        height={1080}
        fill={BKGGRAY}
      />
      {range(electionCount).map(i => 
        <Election
          ref={makeRef(elections, i)}
          size={electionSize}
          position={[
            electionX+((i%electionColumns)*(electionSize+electionGap)),
            electionY+(Math.floor(i/electionColumns)*(electionSize+electionGap))
          ]}
        />
      )}
    </>
  );

  yield* all(...elections.slice(0, 11).map((election, i) => delay(.08*i, election.redX())));
  yield* waitFor(2)
  yield* all(...elections.slice(3, 11).reverse().map((election, i) => delay(.12*i, election.grayX())));
  yield* waitFor(2)
  yield* all(...elections.slice(88).reverse().map((election, i) => delay(.1*Math.floor((i+2) / electionColumns), election.uncompetitive())));
  yield* waitFor(2)
});
