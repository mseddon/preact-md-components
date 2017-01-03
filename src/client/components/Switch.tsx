import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";

export class Switch extends Component<{title: string, checked?: boolean}, {checked: boolean}> {
    elem: HTMLInputElement

    constructor(props) {
        super();
        this.state = {checked: props.checked};
    }

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked})
    }

    render() {
        return <label className={"md-switch" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" checked={this.state.checked} onChange={this.updateCheck}/>
                    <span className="track"/>
                    <span className="thumb"><RippleBox extraClasses="point-ripple invert-primary" /></span>
                    <span className="label">{this.props.title}</span></label>
    }
}