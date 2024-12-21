import {makeScene2D, Img} from '@motion-canvas/2d';

import text_only from '../images/evc_logo/text_only.png';
import logo_only from '../images/evc_logo/logo_only.png';
import gradient from '../images/evc_logo/gradient.png';
import { createRef, all, delay, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  let text = createRef<Img>();
  let logo = createRef<Img>();
  let grad = createRef<Img>();

  let textWidth = 800;
  let finalTextScale = textWidth/5007;
  let logoToTextScale = 309/382;
  let logoXFrac = .36;
  let startLogoScale = 5;

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
    <Img
      src={logo_only}
      ref={logo}
      opacity={0}
      position={[0, 0]}
      scale={startLogoScale}
    />
  </>);

  yield* waitFor(1);

  yield* all(
    logo().opacity(1,1),
    logo().scale(finalTextScale*logoToTextScale,1),
    grad().scale(finalTextScale*logoToTextScale,1)
  );

  yield* all(
    logo().x(-logoXFrac*textWidth,1),
    grad().x(-logoXFrac*textWidth,1),
    text().opacity(1,1),
    delay(.8, grad().opacity(0,0.2)),
  );

  yield* waitFor(3);
});

