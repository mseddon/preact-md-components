import {h, Component, VNode } from "preact"
import { globalRect } from "../domutil";
import { ResizeTrigger } from "./ResizeTrigger";

export class SplitPane extends Component<{first: VNode, second: VNode, axis: "horizontal" | "vertical"}, { splitPos: number }> {
    myElem: HTMLElement;
    first: HTMLElement;
    second: HTMLElement;
    splitter: HTMLElement;

    dragOffset: number = 0;
    constructor() {
        super();
        this.state = { splitPos: 0.5 }
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

    resizeChildren() {
        let myRect = globalRect(this.myElem);
        let splitPos = this.state.splitPos;
        if(this.props.axis == "vertical") {
            let h = myRect.height-this.splitter.offsetHeight;
            this.first.style.height = (h*splitPos)+"px";
            this.splitter.style.top = (h*splitPos)+"px";
            this.second.style.height = (h*(1-splitPos))+"px";
            this.second.style.top = (h*splitPos+this.splitter.offsetHeight)+"px"
        } else {
            let w = myRect.width-this.splitter.offsetWidth;
            this.first.style.width = (w*splitPos)+"px";
            this.splitter.style.left = (w*splitPos)+"px";
            this.second.style.width = (w*(1-splitPos))+"px";
            this.second.style.left = (w*splitPos+this.splitter.offsetWidth)+"px"
        }
    }

    componentDidMount() {
        this.resizeChildren();
    }

    componentDidUpdate() {
        this.resizeChildren();
    }
    
    render() {
        return <div ref={x => this.myElem = x as HTMLElement} className={`md-split-pane md-split-${this.props.axis}`}>
                  <ResizeTrigger onResize={() => this.resizeChildren()}/>
                  <div ref={x => this.first = x as HTMLElement} className="first">{this.props.first}</div>
                  <div ref={x => this.splitter = x as HTMLElement}className="splitter" onMouseDown={this.startDrag} onTouchStart={this.startDrag} />
                  <div ref={x => this.second = x as HTMLElement}className="second">{this.props.second}</div>
               </div>
    }
}