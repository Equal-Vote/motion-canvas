import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, createRef, delay, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitUntil} from '@motion-canvas/core';
import { BKGGRAY, DKGRAY, TitleFont, WHITE } from '../constants';
import { Candidate } from '../components/Candidate';

export default makeScene2D(function* (view) {
  let title = createRef<Txt>();
  let circles: Circle[] = [];

  let claimSize=110;
  let claimGap=30;
  let claimX = -800;
  let claimY = -250;

  const focus = (index : number) => {
    index = index - 1;
    let bigScale = 1.5;
    let bigSize = claimSize * bigScale;
    let smallSize = claimSize - (claimSize * (bigScale-1) / 4);
    let smallScale = smallSize / claimSize;
    
    //let yy = -250;
    //(() => {
    //  yy = yy + ((i == index)? bigSize : smallSize)/2;
    //  let c = circle.y(yy, 1);
    //  yy = yy + ((i == index)? bigSize : smallSize)/2 + claimGap;
    //  return c;
    //})(),

    return all(...circles.map((circle, i) => all(
      circle.scale(i == index? bigScale : 1, 1),
      circle.x(claimX+(i==index? 100 : 0), 1),
      circle.y(claimY+(claimSize+claimGap)*i, 1),
    )));
  }

  view.add(
    <>
      <Rect
        position={[0, 0]}
        width={1920}
        height={1080}
        fill={BKGGRAY}
      />
      <Rect
        layout
        direction={'column'}
        alignItems={'center'}
        position={[0, -350]}
        opacity={0}
        ref={title}
      >
        <Txt {...TitleFont}>
          RCV False Claims
        </Txt>
      </Rect>
      {range(5).map(i => 
        <Circle
          ref={makeRef(circles, i)}
          fill={DKGRAY}
          size={claimSize}
          position={[-1200, -250+(claimSize+claimGap)*i]}
        >
          <Txt {...TitleFont} fontSize={80} textAlign='center' marginTop={30} width={'100%'}>
            {i+1}
          </Txt>
        </Circle>
      )}
    </>
  );

  yield* all(
    title().opacity(1, 1),
    title().y(-400, 1)
  );

  yield* all(...circles.map((circle, i) => delay(.1*i, circle.x(claimX, 1))));

  yield* focus(1);
  yield* focus(2);
  yield* focus(3);
  yield* focus(4);
  yield* focus(5);
});
