import { h, Component } from "preact";
import "./styles.less";
import { globalPosition } from "../domutil";

export class RippleBox extends Component<{extraClasses?: string, rippleColor?: string}, {}> {
    ripple: HTMLElement;
    rippleBox: HTMLElement;
    timer: any;
    storeRipple = (ripple: HTMLElement) => {
        this.ripple = ripple;
    }

    triggerRipple = (event: MouseEvent|TouchEvent) => {
        if(this.timer)
            clearTimeout(this.timer);
        if(event instanceof MouseEvent) {
            let {x,y} = globalPosition(this.rippleBox);
            this.ripple.style.left = (event.pageX-x-12)+"px"
            this.ripple.style.top = (event.pageY-y-12)+"px"
            window.addEventListener("mouseup", this.resetRipple);
        } else if(event instanceof TouchEvent) {
            let touch = event.changedTouches.item(0)
            let {x,y} = globalPosition(this.rippleBox);
            this.ripple.style.left = (touch.pageX-x-12)+"px"
            this.ripple.style.top = (touch.pageY-y-12)+"px"
            window.addEventListener("touchend", this.resetRipple);
        }
        this.ripple.classList.add("zoom")
        this.ripple.classList.remove("fade")
    }

    resetRipple = (event: MouseEvent|TouchEvent) => {
        if(this.timer)
            clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.ripple.classList.remove("zoom")
            this.ripple.classList.add("fade")
        }, 100)
        window.removeEventListener("mouseup", this.resetRipple);
        window.removeEventListener("touchend", this.resetRipple);
    }

    render() {
        return <div className={"ripple-box"+(this.props.extraClasses ? " "+this.props.extraClasses : "")}
                    ref={x => this.rippleBox = x as HTMLElement}
                    onMouseDown={this.triggerRipple}
                    onTouchStart={this.triggerRipple}>
                   <span ref={this.storeRipple} className="ripple" style={this.props.rippleColor ? {backgroundColor: this.props.rippleColor} : {}} />
               </div>
    }
}