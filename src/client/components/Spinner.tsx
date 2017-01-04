import { h, Component, ComponentProps } from "preact";
import "./styles.less";

// Extremely hairy spinner taken from getmdl.io

export class Spinner extends Component<any, any> {
    render() {
        return <div className="md-spinner">
                 <div className="spinner-layer spinner-1">
                    <div className="clipper left"><div className="spinner-circle"/></div>
                    <div className="gap-patch"><div className="spinner-circle"/></div>
                    <div className="clipper right"><div className="spinner-circle"/></div>
                 </div>
                 <div className="spinner-layer spinner-2">
                    <div className="clipper left"><div className="spinner-circle"/></div>
                    <div className="gap-patch"><div className="spinner-circle"/></div>
                    <div className="clipper right"><div className="spinner-circle"/></div>
                 </div>
                 <div className="spinner-layer spinner-3">
                    <div className="clipper left"><div className="spinner-circle"/></div>
                    <div className="gap-patch"><div className="spinner-circle"/></div>
                    <div className="clipper right"><div className="spinner-circle"/></div>
                 </div>
                 <div className="spinner-layer spinner-4">
                    <div className="clipper left"><div className="spinner-circle"/></div>
                    <div className="gap-patch"><div className="spinner-circle"/></div>
                    <div className="clipper right"><div className="spinner-circle"/></div>
                 </div>
               </div>
    }
}