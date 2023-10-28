import {makeScene2D, Circle, Rect, Line, Txt} from '@motion-canvas/2d';
import {all, chain, createRef, delay, easeInCubic, easeOutCubic, easeOutQuad, makeRef, range, useLogger, waitFor, waitUntil} from '@motion-canvas/core';
import { BKGGRAY, DKGRAY, TitleFont, WHITE } from '../constants';
import { Candidate } from '../components/Candidate';

export default makeScene2D(function* (view) {
  let title = createRef<Txt>();
  let circles: Circle[] = [];

  let claimSize=150;
  let claimGap=100;
  let claimX = (claimSize+claimGap)*-2;
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

    return chain(all(...circles.map((circle, i) => {
        if(i == index){
          return all(
            circle.scale(bigScale, 1),
            circle.x(0, 1),
            circle.y(claimY+50, 1),
            circle.zIndex(1, 0)
          );
        }else{
          return circle.opacity(0, 1);
        };
      }
    )), waitFor(2));
  }

  const reset = () => {
    return chain(all(...circles.map((circle, i) => all(
      circle.scale(1, 1),
      circle.opacity(1, 1),
      circle.x(claimX + (claimSize+claimGap)*i, 1),
      circle.y(claimY, 1),
      circle.zIndex(0, 0),
    ))), waitFor(2));
  }


  view.add(
    <>
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
          position={[claimX+(claimSize+claimGap)*i, claimY+100]}
          opacity={0}
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
    title().y(-400, 1),
    all(...circles.map((circle, i) =>
      delay(.1*(i+1), all(
        circle.y(claimY, 1, easeOutCubic), circle.opacity(1, 1)))
      )
    )
  );

  yield* waitFor(2);

  yield* focus(1);

  yield* reset();

  yield* focus(2);

  yield* reset();

  yield* focus(3);

  yield* reset();

  yield* focus(4);

  yield* reset();

  yield* focus(5);
});
