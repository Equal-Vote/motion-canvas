import { Img, makeScene2D } from "@motion-canvas/2d"

import usa from '../images/US Map.png';
import idaho from '../images/idaho.png';
import montana from '../images/montana.png';
import southdakota from '../images/southdakota.png';
import tennessee from '../images/tennessee.png';
import florida from '../images/florida.png';
import kentucky from '../images/kentucky.png';
import alabama from '../images/alabama.png';
import oklahoma from '../images/oklahoma.png';
import mississippi from '../images/mississippi.png';
import louisiana from '../images/louisiana.png';
import { all, delay, easeOutCubic, makeRef, waitFor } from "@motion-canvas/core";

let stateSrcs = [idaho, montana, southdakota, oklahoma, kentucky, tennessee, louisiana, mississippi, alabama, florida]

export default makeScene2D(function* (view) {
    let states : Img[] = [];
    view.add(<>
        <Img src={usa}/>
        {
            stateSrcs.map((src, i) => 
                <Img
                    src={src}
                    ref={makeRef(states, i)}
                    position={[0, 0]}
                    scale={2.5}
                    opacity={0}
                />
            )
        }
    </>);

    yield* waitFor(.5);

    let t = .4;
    yield* all(...states.map((state, i) => 
        delay(i*.05, all(
            state.opacity(1, t),
            state.scale(1.00, t, easeOutCubic),
        ))
    ));

    yield* waitFor(.2);
})