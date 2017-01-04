import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";
require('../theme');

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
                    <span className={"track" + (this.state.checked ? " primary-bg-lt" : "")}/>
                    <span className={"thumb" + (this.state.checked ? " primary-bg": "")}><RippleBox extraClasses="point-ripple" rippleClass="primary-bg"/></span>
                    <span className="label">{this.props.title}</span></label>
    }
}