import {h, Component, VNode } from "preact"
import * as preact from "preact";

import { globalRect } from "../domutil";
import { ResizeTrigger } from "./ResizeTrigger";

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number
}

export class SplitPane extends Component<{first: VNode, second: VNode, axis: "horizontal" | "vertical", extraClasses?: string, onResize?: (first: Rect, second: Rect) => void, splitPos?: number, onSplitChange?: (pos: number) => void}, { splitPos: number, myRect: Rect, splitterRect: Rect }> {
    myElem: HTMLElement;
    first: HTMLElement;
    second: HTMLElement;
    splitter: HTMLElement;

    dragOffset: number = 0;

    prevFirst = {x: 0, y: 0, width: 0, height: 0};
    prevSecond = {x: 0, y: 0, width: 0, height: 0};

    splitterSize: number = 0;

    constructor() {
        super();
        this.state = { splitPos: 0.5, myRect: {x: 0, y: 0, width: 0, height: 0}, splitterRect: {x: 0, y: 0, width: 0, height: 0} }
    }

    componentWillReceiveProps(props) {
        if(props.splitPos !== undefined)
            this.setState({ ...this.state, splitPos: props.splitPos})
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
        if(this.props.onSplitChange)
            this.props.onSplitChange(this.state.splitPos);
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
            let h = (myRect.height-this.splitter.offsetHeight)|0;

            return {
                firstRect: {top: "0px", height: (h*splitPos)+"px"},
                splitterRect: {top: ((h*splitPos)|0)+"px"},
                secondRect: {height: ((h*(1-splitPos))|0)+"px", top: ((h*splitPos+this.splitter.offsetHeight)|0)+"px"}
            }
        } else {
            let w = (myRect.width-this.splitter.offsetWidth)|0;
            return {
                firstRect: {left: "0px", width: ((w*splitPos)|0)+"px"},
                splitterRect: { left: ((w*splitPos)|0)+"px"},
                secondRect: { left: ((w*splitPos+this.splitter.offsetWidth)|0)+"px", width: ((w*(1-splitPos))|0)+"px" }
            }
        }
    }

    resizeChildren() {
        if(this.myElem && this.splitter)
            this.setState({...this.state, myRect: globalRect(this.myElem), splitterRect: globalRect(this.splitter)})
    }

    componentDidMount() {
        this.resizeChildren();
    }

    componentDidUpdate() {
        if(this.props.onResize && this.first && this.second) {
            let f = globalRect(this.first);
            let s = globalRect(this.second);
            f.x |= 0; f.y |= 0; f.width |=0; f.height |= 0;
            s.x |= 0; s.y |= 0; s.width |=0; s.height |= 0;
            if(Math.abs(f.x - this.prevFirst.x) > 0.001 || Math.abs(f.y - this.prevFirst.y) > 0.001 || Math.abs(f.width - this.prevFirst.width) > 0.001 || Math.abs(f.height - this.prevFirst.height) > 0.001 ||
               Math.abs(s.x - this.prevSecond.x) > 0.001 || Math.abs(s.y - this.prevSecond.y) > 0.001 || Math.abs(s.width - this.prevSecond.width) > 0.001 || Math.abs(s.height - this.prevSecond.height) > 0.001) {
               this.prevFirst = f;
               this.prevSecond = s;
               
               this.props.onResize(f, s);
            }
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