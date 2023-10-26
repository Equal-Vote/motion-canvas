import { Circle, CircleProps, Line, Node } from "@motion-canvas/2d";
import { SimpleSignal, all, createRef, easeOutCubic, makeRef } from "@motion-canvas/core";
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import { DKGRAY, RED } from '../constants';

export class Election extends Circle{
    private state: number;
    private lines: Line[] = [];
    private X = createRef<Node>();

    public constructor(props: CircleProps){
        super({
            ...props,
            fill: DKGRAY,
        });

        let lineOffset = 15;
        let lineProps = {
            stroke: RED,
            lineWidth: 6
        };

        this.add(
            <Node ref={this.X} opacity={0} scale={2}>
                <Line
                    ref={makeRef(this.lines, 0)}
                    {...lineProps}
                    points={[
                        [-lineOffset, -lineOffset],
                        [lineOffset, lineOffset],
                    ]}
                />
                <Line
                    ref={makeRef(this.lines, 1)}
                    {...lineProps}
                    points={[
                        [-lineOffset, lineOffset],
                        [lineOffset, -lineOffset],
                    ]}
                />
            </Node>
        );
    }

    public *redX(){
        let t = .7;
        yield* all(
            this.X().scale(1, t, easeOutCubic),
            this.X().opacity(1, t, easeOutCubic),
            this.lines[0].stroke(RED, t),
            this.lines[1].stroke(RED, t),
        );
    }

    public *grayX(){
        let t = .3;
        yield* all(
            this.X().opacity(.2, t, easeOutCubic),
        );
    }

    public *uncompetitive(){
        let t = .4;
        yield* all(
            this.opacity(.3, t)
        );
    }
}