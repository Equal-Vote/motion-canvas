import { Img, ImgProps, Length } from "@motion-canvas/2d";
import { SignalValue } from "@motion-canvas/core";

export interface CandidateProps extends ImgProps {
    size: SignalValue<Length>
} 

export class Candidate extends Img{
    public constructor(props: CandidateProps){
        super({
            ...props,
            radius: 1000,
            lineWidth: 20,
            width: props.size,
            height: props.size,
        });
    }
}