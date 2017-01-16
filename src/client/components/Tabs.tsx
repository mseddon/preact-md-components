import {h, Component, VNode, cloneElement} from "preact";
import * as preact from "preact";

import {globalRect} from "../domutil"
import "./styles.less";
import {RippleBox} from "./RippleBox";

export class TabStrip extends Component<{tabs: {id: string, title: VNode, component: VNode}[], active: string, scrollable?: boolean, extraClasses?: string},{active: string}> {
    elem: HTMLElement;
    tabElements: { [id: string]: HTMLElement } = {};
    tabComponents: { [id: string]: VNode } = {}
    indicator: HTMLElement;
    scroller: HTMLElement;

    constructor(props) {
        super();
        this.state = { active: props.active };
    }

    update() {
        let thisRect = globalRect(this.elem);
        let tabRect = globalRect(this.tabElements[this.state.active]);

        let left = tabRect.x-thisRect.x;
        this.indicator.style.left = left+"px";
        this.indicator.style.width = tabRect.width+"px";
        for(let i=0; i<this.props.tabs.length; i++) {
            if(this.props.tabs[i].id == this.state.active) {
                this.scroller.style.left = -i*100+"%";
            }
        }
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    selectTab = (id: string) => (event: MouseEvent | TouchEvent ) => {
        this.setState({active: id});
    }

    activeComponent() {
        for(let i=0; i<this.props.tabs.length; i++) {
            if(this.props.tabs[i].id == this.state.active)
                return this.props.tabs[i].component;
        }
    }

    render() {
        return <div className={"md-tab-pane" + (this.props.extraClasses ? " "+this.props.extraClasses : "")}>
                  <div ref={x => this.elem = x as HTMLDivElement} className={"md-tab-strip primary-bg" + (this.props.scrollable ? " scrollable" : "")}>
                    <i className="material-icons left-scroll">chevron_left</i>
                    <i className="material-icons right-scroll">chevron_right</i>
                    {this.props.tabs.map(child => 
                        <div ref={x => this.tabElements[child.id] = x as HTMLDivElement}
                            className={"md-tab" + (child.id == this.state.active ? " is-active" : "")}
                            onMouseDown={this.selectTab(child.id)}
                            onTouchStart={this.selectTab(child.id)}>
                            <RippleBox/>
                            {child.title}</div>
                    )}<div ref={x=> this.indicator = x as HTMLDivElement} className="indicator accent-bg"/></div>
                  <div className="md-tab-content-area">
                    <div className="md-tab-scroller" ref={ x => this.scroller = x as HTMLDivElement }>
                        {this.props.tabs.map((tab, i) => {                           
                            return <div className="md-tab-content" style={{left: (i*100)+"%"}}>{tab.component}</div>
                        })}
                    </div>
                  </div>
               </div>
    }
}