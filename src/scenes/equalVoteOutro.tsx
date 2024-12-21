import {makeScene2D, Img, Txt} from '@motion-canvas/2d';

import text_only from '../images/evc_logo/text_only.png';
import gradient from '../images/evc_logo/gradient.png';
import { createRef, all, delay, waitFor, easeOutCubic, linear, easeOutQuad } from '@motion-canvas/core';
import { Logo } from '../components/Logo';
import { BaseFont } from '../constants';

export default makeScene2D(function* (view) {
  let text = createRef<Img>();
  let logo = createRef<Logo>();
  let grad = createRef<Img>();

  let textWidth = 950;
  let finalTextScale = textWidth/5007;
  let logoToTextScale = 309/382;
  let logoXFrac = .36;
  let startLogoScale = 1.5;
  let startRotation = 120;

  let t1 = .75;
  let t2 = 0.75;

  view.add(<>
    <Img
      src={text_only}
      scale={finalTextScale}
      ref={text}
      opacity={0}
      position={[0, 0]}
    />
    <Img
      src={gradient}
      ref={grad}
      opacity={1}
      position={[0, 0]}
      scale={startLogoScale}
    />
    <Logo
      ref={logo}
      opacity={0}
      position={[0, 0]}
      scale={startLogoScale}
      rotation={startRotation}
      radius={300}
    />
  </>);

  yield* waitFor(0.25);

  yield* all(
    logo().opacity(1,t1),
    logo().scale(finalTextScale*logoToTextScale,t1),
    logo().rotation(0,t1),
    logo().animate(t1),
    grad().scale(finalTextScale*logoToTextScale,t1),
  );

  yield* all(
    logo().x(-logoXFrac*textWidth,t2),
    grad().x(-logoXFrac*textWidth-200,t2+.2),
    text().opacity(1,t2),
    //delay(.8*t2, grad().opacity(0,0.2*t2)),
  );

  yield* waitFor(2);
});

