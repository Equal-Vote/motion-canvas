import { Img, ImgProps, Length, Txt } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, createRef, makeRef } from "@motion-canvas/core";
import { BaseFont } from "../constants";
import {initial, signal} from '@motion-canvas/2d/lib/decorators';


const WinState = {
    'tbd': 0,
    'win': 1,
    'lost': 2,
}

export interface CandidateProps extends ImgProps {
    size: SignalValue<Length>
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