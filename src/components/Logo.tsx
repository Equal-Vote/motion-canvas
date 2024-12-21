import { Img, Layout, LayoutProps, NodeProps, Rect, RectProps } from "@motion-canvas/2d";

import red from '../images/evc_logo/red.png';
import gold from '../images/evc_logo/gold.png';
import white from '../images/evc_logo/white.png';
import green from '../images/evc_logo/green.png';
import blue from '../images/evc_logo/blue.png';
import { all, easeInCubic, easeOutCubic, makeRef } from "@motion-canvas/core";

const radialPosition = (r : number, angle : number) => {
  return {
    x: r * Math.cos(angle * (Math.PI/180)),
    y: -r * Math.sin(angle * (Math.PI/180))
  };
};

const startRadius = 120;
export interface LogoProps extends LayoutProps {
    radius: number
}

export class Logo extends Layout{
    private lines: Img[] = [];
    public constructor(props: LogoProps){
        super({
            ...props
        });
        [green, gold, white, red, blue].forEach((item, i) => {
            this.add(<Img ref={makeRef(this.lines, i)}width={1357} height={1357} position={radialPosition(props.radius, 72*i)} src={item}/>)
        })
    }

    public *animate(t: number){
        yield *all(
            ...this.lines.map(l => l.position([0, 0], t))
        )
    }
}