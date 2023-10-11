import { Img, ImgProps, Length, Line, Txt } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, all, createRef, makeRef } from "@motion-canvas/core";
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import { BLUE, GOLD, GREEN, RED, PURPLE, BaseFont, ORANGE, WHITE } from '../constants';

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
    'spoiler': 3,
}

export class Candidate extends Img{
    @initial(WinState.tbd)
    @signal()
    public declare readonly initialState: SimpleSignal<number, this>;

    private state: number;

    private winTxt = createRef<Txt>();
    private spoilerTxt = createRef<Txt>();
    private spoilerArrow = createRef<Line>();

    public constructor(props: CandidateProps){
        super({
            ...props,
            ...candidates[props.candidateName],
            radius: 1000,
            lineWidth: 20,
            width: props.size,
            height: props.size,
            layout: false,
        });

        this.state = this.initialState();

        this.add(
            <>
                <Txt
                    {...BaseFont}
                    y={-80}
                    opacity={0}
                    ref={this.winTxt}
                >
                    Winner
                </Txt>
            </>
        );

        this.add(
            <>
                <Txt
                    {...BaseFont}
                    position={[-80, -150]}
                    opacity={0}
                    ref={this.spoilerTxt}
                >
                    Spoiler
                </Txt>
                <Line
                    ref={this.spoilerArrow}
                    points={[this.spoilerTxt().position, props.position]}
                    lineWidth={16}
                    stroke={WHITE}
                    startOffset={40}
                    endOffset={90}
                    endArrow={true}
                    arrowSize={24}
                    end={0}
                />
            </>
        );
    }

    public *win(){
        yield* all(
            this.winTxt().opacity(1, .5),
            this.winTxt().position.y(-120, .5),
        );
        this.state = WinState.win;
    }

    public *resetWin(){
        yield* all(
            this.winTxt().opacity(0, .5),
            this.winTxt().y(-80, .5),
        );
        this.state = WinState.tbd;
    }

    public *spoiler(){
        yield* all(
            this.spoilerTxt().opacity(1, .5),
            this.spoilerArrow().opacity(1, .5),
            this.spoilerArrow().end(1, .5),
        );
        this.state = WinState.spoiler;
    }
}