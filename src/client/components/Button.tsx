import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox"

export class Button extends Component<{title: string, onClick: () => void}, {}> {
    render() {
        return <button>{this.props.title}
                 <RippleBox/>
               </button>
    }
}