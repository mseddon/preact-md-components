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
    }

    yToValue(yPos: number) {
        let { x, y, width, height } = globalRect(this.splitter);
        return Math.max(0, Math.min(1, (yPos-y-this.dragOffset)/height));

    }

    onDrag = (event: MouseEvent | TouchEvent) => {
        if(event instanceof MouseEvent)
            this.setState({...this.state, value: this.yToValue(event.pageY)});
        else
            this.setState({...this.state, value: this.yToValue(event.changedTouches[0].pageY)});
    }

    startDrag = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        let splitRect = globalRect(this.splitter);
        if(event instanceof MouseEvent) {
            this.dragOffset = event.pageY-splitRect.y;
            window.addEventListener("mousemove", this.onDrag);
            window.addEventListener("mouseup", this.endDrag);
        } else {
            this.dragOffset = event.changedTouches[0].pageY-splitRect.y;
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
                  <div ref={x => this.splitter = x as HTMLElement}className="splitter" onMouseDown={this.startDrag} onTouchStart={this.startDrag} />
                  <div ref={x => this.second = x as HTMLElement}className="second">{this.props.second}</div>
               </div>
    }
}