import { h, Component } from "preact";
import "./styles.less";
import { RippleBox } from "./RippleBox";

export class Checkbox extends Component<{title: string, checked?: boolean}, {checked: boolean}> {
    elem: HTMLInputElement

    constructor(props) {
        super();
        this.state = {checked: props.checked};
    }

    componentDidReceiveProps() {
        this.setState({...this.state, checked: this.props.checked})
    }

    updateCheck = () => {
        this.setState({...this.state, checked: this.elem.checked})
    }

    render() {
        return <label className={"md-checkbox" + (this.state.checked ? " is-checked" : "")}>
                    <input ref={e => this.elem = e as HTMLInputElement} type="checkbox" checked={this.state.checked} onChange={this.updateCheck}/>
                    <span className="box"><span className="check"/></span>
                    <span className="label">{this.props.title}</span>
                    <RippleBox extraClasses="point-ripple invert-primary" /></label>
    }
}