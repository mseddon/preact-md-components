import { h, Component, ComponentProps } from "preact";
import "./styles.less";
require('../theme');

const or100 = n => n === undefined ? 100 : n;

export class ProgressBar extends Component<{progress: number, buffer?: number, indeterminate?: boolean},{}> {
    render() {
        return <div className={"md-progress-bar" + (this.props.indeterminate ? " indeterminate" : "")}>
                  <div className="background accent-bg-lt" style={{width: (this.props.indeterminate ? 100 : Math.max(0, Math.min(100, or100(this.props.buffer))))+"%"}}></div>
                  <div className="progress accent-bg" style={{width: Math.max(0, Math.min(100, this.props.progress))+"%"}}></div>
                  <div className="buffer accent-buffer" style={{width: (this.props.indeterminate? 0 : Math.max(0, Math.min(100, 100-or100(this.props.buffer))))+"%"}}></div>
               </div>
    }
}