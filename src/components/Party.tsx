import { Img, ImgProps, Length, Line, Rect, Txt } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, all, chain, createRef, easeOutCubic, makeRef } from "@motion-canvas/core";
import {initial, signal} from '@motion-canvas/2d/lib/decorators';

export interface PartyProps extends ImgProps {
    size: SignalValue<Length>,
} 

export class Party extends Rect{
    public constructor(props: PartyProps){
        super({
            ...props,
            radius: 1000,
            width: props.size,
            height: props.size,
            layout: true,
            justifyContent: 'center',
            direction: 'column'
        });
        if(props.src)
            this.add(<Img width='60%' alignContent='center' alignSelf='center' src={props?.src ?? ''}/>)
    }
}