import { h, Component, ComponentProps } from "preact";
import "./styles.less";

export class Spinner extends Component<any, any> {
    render() {
        return <div className="md-spinner">
                 <div className="spinner-layer spinner-1">
                    <div className="clipper left"><div className="spinner-circle"/></div>
                    <div className="clipper right"><div className="spinner-circle"/></div>
                 </div>
               </div>
    }
}