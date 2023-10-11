import { Img, ImgProps, Length, Txt } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, createRef, makeRef } from "@motion-canvas/core";
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import { BLUE, GOLD, GREEN, RED, PURPLE, BaseFont, ORANGE } from '../constants';

import leia from '../images/leia.jpg';
import luke from '../images/luke.jpg';
import vader from '../images/vader.jpg';
import solo from '../images/solo.jpg';
import c3po from '../images/c3po.jpg';

export interface CandidateSpecs{
    src: string,
    stroke: string,
}

export interface CandidateProps extends ImgProps {
    size: SignalValue<Length>,
    candidateName: string,
} 

const candidates: Record<string, CandidateSpecs> = {
    'leia': {
        src: leia,
        stroke: ORANGE  
    },
    'luke': {
        src: luke,
        stroke: GREEN,
    },
    'solo': {
        src: solo,
        stroke: PURPLE,
    },
    'vader': {
        src: vader,
        stroke: RED,
    },
    'c3po': {
        src: c3po,
        stroke: BLUE,
    },
}

const WinState = {
    'tbd': 0,
    'win': 1,
    'lost': 2,
}



export class Candidate extends Img{
    @initial(WinState.tbd)
    @signal()
    public declare readonly initialState: SimpleSignal<number, this>;

    private state: number;

    private texts:Txt[] = [];

    public constructor(props: CandidateProps){
        super({
            ...props,
            ...candidates[props.candidateName],
            radius: 1000,
            lineWidth: 20,
            width: props.size,
            height: props.size,
        });

        this.state = this.initialState();

        this.add(
            <>
                {['Winner', 'Loser'].map((txt, i) => 
                <Txt
                    {...BaseFont}
                    position={[0, -140]}
                    opacity={0}
                    ref={makeRef(this.texts, i+1)}
                >
                    {txt}
                </Txt>
                )}
            </>
        );
    }

    public *win(){
        yield* this.texts[WinState.win].opacity(1, .5);
        this.state = WinState.win;
    }
}