import { h, Component } from "preact";
import "./styles.less";
require('../theme');

export class TextField extends Component<{placeholder: string, value: string, floatingLabel?: boolean, onInput?: (e: KeyboardEvent) => void, onKeyDown?: (e: KeyboardEvent) => void}, {focused: boolean, value: string}> {
    constructor(props) {
        super(props);
        this.setState({ focused: false, value: props.value });
    }

    updateInput = (e: KeyboardEvent) => {
        this.setState({...this.state, value: (e.target as HTMLInputElement).value})
        if(this.props.onInput)
            this.props.onInput(e);
    }

    private setFocus = (e: Event) => {
        this.setState({...this.state, focused: true});
    }

    private clearFocus = (e: Event) => {
        this.setState({...this.state, focused: false});
    }

    componentWillReceiveProps(props) {
        this.setState({...this.state, value: props.value})
    }

    render() {
        return <div class={"md-field "+(this.props.floatingLabel ? "floating-label " : "")+ (this.state.focused ? " is-focused" : "") + (this.state.value !== "" ? " has-content" : "")}>
                 <input value={this.state.value} onFocus={this.setFocus} onBlur={this.clearFocus} onInput={this.updateInput} onKeyDown={this.props.onKeyDown} className="text-primary"/>
                 <label className={(this.state.value === "" ? "show-placeholder" : "no-placeholder") + ((this.state.focused || this.state.value !=="") ? " accent-fg": " hint-text")}>{this.props.placeholder}</label>
                 <span className="underline"/><span className="after accent-bg"></span>
               </div>
    }
}