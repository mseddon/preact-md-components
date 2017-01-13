import { h, Component, ComponentProps } from "preact";
import "./styles.less";
import { globalPosition, globalRect } from "../domutil";
require('../theme');

export class Slider extends Component<{min: number, max: number, value: number}, {min: number, max: number, value: number}> {
    gutter: HTMLDivElement;
    thumb: HTMLDivElement;
    thumbPivot: HTMLDivElement;

    dragOffset: number; // offset relative to thumb pivot

    constructor(props) {
        super(props);
        this.state = {...props};
    }

    private getThumbPosition() {
        return ((this.state.value-this.state.min)/(this.state.max-this.state.min))*100+"%"
    }

    positionThumb = () => {
        this.thumbPivot.style.left = this.getThumbPosition();
    }

    xToValue = (position: number) => {
        let { x, y, width, height } = globalRect(this.gutter);
        return Math.max(this.state.min, Math.min(this.state.max, (position-x-this.dragOffset)/width*(this.state.max-this.state.min)+this.state.min));
    }

    onDrag = (event: MouseEvent|TouchEvent) => {
        if(event instanceof MouseEvent)
            this.setState({...this.state, value: this.xToValue(event.pageX)});
        else
            this.setState({...this.state, value: this.xToValue(event.changedTouches[0].pageX)});
    }

    endDrag = () => {
        this.thumb.classList.remove("active");
        window.removeEventListener("mouseup", this.endDrag);
        window.removeEventListener("mousemove", this.onDrag);
        window.removeEventListener("touchend", this.endDrag);
        window.removeEventListener("touchmove", this.onDrag);
    }

    thumbDown = (event: MouseEvent|TouchEvent) => {
        this.thumb.classList.add("active");
        event.preventDefault();
        event.stopImmediatePropagation();
        if(event instanceof MouseEvent) {
            let { x, y } = globalPosition(this.thumbPivot);
            this.dragOffset = event.pageX-x;
            window.addEventListener("mousemove", this.onDrag)
            window.addEventListener("mouseup", this.endDrag)
        }
    }

    gutterDown = (event: MouseEvent|TouchEvent) => {
        this.thumb.classList.add("active");
        event.preventDefault();
        let { x, y } = globalPosition(this.thumbPivot);
        this.dragOffset = 0;
        if(event instanceof MouseEvent) {
            this.setState({...this.state, value: this.xToValue(event.pageX)});

            window.addEventListener("mousemove", this.onDrag)
            window.addEventListener("mouseup", this.endDrag)
        } else {
            this.setState({...this.state, value: this.xToValue(event.changedTouches[0].pageX)});

            window.addEventListener("touchmove", this.onDrag)
            window.addEventListener("touchend", this.endDrag)
        }
    }

    render() {
        return <div className="md-slider" onMouseDown={this.gutterDown} onTouchStart={this.gutterDown}>
                 <div className="gutter" ref={x => this.gutter = x as HTMLDivElement}>
                     <div className="filled accent-bg" style={{width: this.getThumbPosition()}}></div>
                     <div className="thumbPivot" ref={x => this.thumbPivot = x as HTMLDivElement} style={{left: this.getThumbPosition()}}>
                        <div className="thumb accent-bg" ref={x => this.thumb = x as HTMLDivElement} onMouseDown={this.thumbDown}/>
                    </div>
                 </div>
               </div>
    }
}