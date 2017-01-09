import {h, Component, VNode } from "preact"
import { globalRect } from "../domutil";
import { ResizeTrigger } from "./ResizeTrigger";

export class SplitPane extends Component<{first: VNode, second: VNode, axis: "horizontal" | "vertical"}, { splitPos: number }> {
    myElem: HTMLElement;
    first: HTMLElement;
    second: HTMLElement;
    splitter: HTMLElement;
    constructor() {
        super();
    }

    resizeChildren() {
        let myRect = globalRect(this.myElem);
        let splitPos = 0.5;
        this.first.style.height = (myRect.height*splitPos-this.splitter.offsetHeight/2)+"px";
        this.splitter.style.top = (myRect.height*splitPos-this.splitter.offsetHeight/2)+"px";
        this.second.style.height = (myRect.height*(1-splitPos)-this.splitter.offsetHeight/2)+"px";
        this.second.style.top = (myRect.height*splitPos+this.splitter.offsetHeight/2)+"px"
    }

    componentDidMount() {
        this.resizeChildren();
    }

    render() {
        return <div ref={x => this.myElem = x as HTMLElement} className={`md-split-pane md-split-${this.props.axis}`}>
                  <ResizeTrigger onResize={() => this.resizeChildren()}/>
                  <div ref={x => this.first = x as HTMLElement} className="first">{this.props.first}</div>
                  <div ref={x => this.splitter = x as HTMLElement}className="splitter"/>
                  <div ref={x => this.second = x as HTMLElement}className="second">{this.props.second}</div>
               </div>
    }
}