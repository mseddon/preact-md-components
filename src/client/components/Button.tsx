import { h, Component } from "preact";

export class Button extends Component<{title: string, onClick: () => void}, {}> {
    ripple: HTMLElement;
    storeRipple = (ripple: HTMLElement) => {
        this.ripple = ripple;
    }
    triggerRipple = (event: MouseEvent|TouchEvent) => {
        if(event instanceof MouseEvent) {
            this.ripple.style.left = (event.offsetX-12)+"px"
            this.ripple.style.top = (event.offsetY-12)+"px"
        } else if(event instanceof TouchEvent) {
            let touch = event.changedTouches.item(0)
            this.ripple.style.left = (touch.clientX-12)+"px"
            this.ripple.style.top = (touch.clientY-12)+"px"
            event.preventDefault()
        }
        this.ripple.classList.add("zoom")
        this.ripple.classList.remove("fade")
    }
    resetRipple = (event: MouseEvent|TouchEvent) => {
        this.ripple.classList.remove("zoom")
        this.ripple.classList.add("fade")
    }
    render() {
        return <button onMouseDown={this.triggerRipple}
                       onMouseUp={this.resetRipple}
                       onTouchStart={this.triggerRipple}
                       onTouchEnd={this.resetRipple}

                       >{this.props.title}
                 <div className="ripple-box">
                   <span ref={this.storeRipple} className="ripple"/>
                 </div>
               </button>
    }
}