import {h, Component, VNode } from "preact"
import { globalRect } from "../domutil";
import { ResizeTrigger } from "./ResizeTrigger";

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number
}

export class SplitPane extends Component<{first: VNode, second: VNode, axis: "horizontal" | "vertical", extraClasses?: string, onResize?: (first: Rect, second: Rect) => void}, { splitPos: number, myRect: Rect, splitterRect: Rect }> {
    myElem: HTMLElement;
    first: HTMLElement;
    second: HTMLElement;
    splitter: HTMLElement;

    dragOffset: number = 0;

    prevFirst = {x: 0, y: 0, width: 0, height: 0};
    prevSecond = {x: 0, y: 0, width: 0, height: 0};

    constructor() {
        super();
        this.state = { splitPos: 0.5, myRect: {x: 0, y: 0, width: 0, height: 0}, splitterRect: {x: 0, y: 0, width: 0, height: 0} }
    }


    xToValue(xPos: number) {
        let { x, y, width, height } = globalRect(this.myElem);
        return Math.max(0, Math.min(1, (xPos-x-this.dragOffset)/(width-this.splitter.offsetWidth)));
    }

    yToValue(yPos: number) {
        let { x, y, width, height } = globalRect(this.myElem);
        return Math.max(0, Math.min(1, (yPos-y-this.dragOffset)/(height-this.splitter.offsetHeight)));
    }

    onDrag = (event: MouseEvent | TouchEvent) => {
        if(this.props.axis == "vertical") {
            if(event instanceof MouseEvent)
                this.setState({...this.state, splitPos: this.yToValue(event.pageY)});
            else
                this.setState({...this.state, splitPos: this.yToValue(event.changedTouches[0].pageY)});
        } else {
            if(event instanceof MouseEvent)
                this.setState({...this.state, splitPos: this.xToValue(event.pageX)});
            else
                this.setState({...this.state, splitPos: this.xToValue(event.changedTouches[0].pageX)});
        }
    }

    startDrag = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        let splitRect = globalRect(this.splitter);
        if(event instanceof MouseEvent) {
            this.dragOffset = this.props.axis == "vertical" ? event.pageY-splitRect.y : event.pageX-splitRect.x;
            window.addEventListener("mousemove", this.onDrag);
            window.addEventListener("mouseup", this.endDrag);
        } else {
            this.dragOffset = this.props.axis == "vertical" ? event.changedTouches[0].pageY-splitRect.y : event.changedTouches[0].pageX-splitRect.x;
            window.addEventListener("touchmove", this.onDrag);
            window.addEventListener("touchend", this.endDrag);
        }
    }

    endDrag = () => {
        window.removeEventListener("mouseup", this.endDrag);
        window.removeEventListener("mousemove", this.onDrag);
        window.removeEventListener("touchend", this.endDrag);
        window.removeEventListener("touchmove", this.onDrag);
    }

    computeSizes() {
        if(!this.splitter) {
            return {
                firstRect: {},
                splitterRect: {},
                secondRect: {}
            }
        }
        let myRect = this.state.myRect;
        let splitPos = this.state.splitPos;
        if(this.props.axis == "vertical") {
            let h = myRect.height-this.splitter.offsetHeight;

            return {
                firstRect: {top: "0px", height: (h*splitPos)+"px"},
                splitterRect: {top: (h*splitPos)+"px"},
                secondRect: {height: (h*(1-splitPos))+"px", top: (h*splitPos+this.splitter.offsetHeight)+"px"}
            }
        } else {
            let w = myRect.width-this.splitter.offsetWidth;
            return {
                firstRect: {left: "0px", width: (w*splitPos)+"px"},
                splitterRect: { left: (w*splitPos)+"px"},
                secondRect: { left: (w*splitPos+this.splitter.offsetWidth)+"px", width: (w*(1-splitPos))+"px" }
            }
        }
    }

    resizeChildren() {
        this.setState({...this.state, myRect: globalRect(this.myElem), splitterRect: globalRect(this.splitter)})
    }

    componentDidMount() {
        this.resizeChildren();
    }

    componentDidUpdate() {
        if(this.props.onResize && this.first && this.second) {
            let f = globalRect(this.first);
            let s = globalRect(this.second);
            if(f.x != this.prevFirst.x || f.y != this.prevFirst.y || f.width != this.prevFirst.width || f.height != this.prevFirst.height ||
               s.x != this.prevSecond.x || s.y != this.prevSecond.y || s.width != this.prevSecond.width || s.height != this.prevSecond.height)
                this.props.onResize(f, s);
            this.prevFirst = f;
            this.prevSecond = s;
        }
    }
    
    render() {
        let {firstRect, splitterRect, secondRect} = this.computeSizes();
        return <div ref={x => this.myElem = x as HTMLElement} className={`md-split-pane md-split-${this.props.axis}`}>
                  <ResizeTrigger onResize={() => this.resizeChildren()}/>
                  <div key="first" style={firstRect} ref={x => this.first = x as HTMLElement} className="first">{this.props.first}</div>
                  <div key="second" style={secondRect} ref={x => this.second = x as HTMLElement}className="second">{this.props.second}</div>
                  <div key="split" style={splitterRect} ref={x => this.splitter = x as HTMLElement} className={"splitter" + (this.props.extraClasses ? " "+this.props.extraClasses : "")} onMouseDown={this.startDrag} onTouchStart={this.startDrag}>{this.props.children}</div>
               </div>
    }
}