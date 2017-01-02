import { h, Component } from "preact";
import "./styles.less";

export class Button extends Component<{title: string, onClick: () => void}, {}> {
    ripple: HTMLElement;
    timer: any;
    storeRipple = (ripple: HTMLElement) => {
        this.ripple = ripple;
    }

    triggerRipple = (event: MouseEvent|TouchEvent) => {
        if(this.timer)
            clearTimeout(this.timer);
        if(event instanceof MouseEvent) {
            this.ripple.style.left = (event.offsetX-12)+"px"
            this.ripple.style.top = (event.offsetY-12)+"px"
            window.addEventListener("mouseup", this.resetRipple);
        } else if(event instanceof TouchEvent) {
            let touch = event.changedTouches.item(0)
            this.ripple.style.left = (touch.clientX-12)+"px"
            this.ripple.style.top = (touch.clientY-12)+"px"
            event.preventDefault()
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
        return <button onMouseDown={this.triggerRipple}
                       onMouseUp={this.resetRipple}
                       onTouchStart={this.triggerRipple}
                       onTouchEnd={this.resetRipple}>{this.props.title}
                 <div className="ripple-box">
                   <span ref={this.storeRipple} className="ripple"/>
                 </div>
               </button>
    }
}