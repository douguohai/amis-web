import React from 'react';
import { RendererProps, Renderer } from 'amis';
import LogicFlow from '@logicflow/core';
import { Control } from "@logicflow/extension";
import RegisteNode from '../components/registerNode';
import { themeApprove } from '../config';
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import "@logicflow/core/dist/style/index.css";
import { request } from '@/utils/requestInterceptor';
import { message } from 'antd';
import "../index.css";

class ApproveShowStateType {
    height: number
}

@Renderer({
    type: 'approveShow',
    autoVar: true
})
class ApproveShow extends React.Component<RendererProps, ApproveShowStateType> {
    constructor(props) {
        super(props);

        console.log(props)
        this.state = {
            height: window.innerHeight,
        };
    }

    componentDidMount() {
        const config = {
            grid: {
                size: 10,
                visible: true,
                type: 'mesh',
                config: {
                    color: '#DCDCDC',
                }
            },
            keyboard: { enabled: false },
            style: themeApprove,
            plugins: [Control],
        };
        const { id } = this.props.data;
        if (id != undefined) {
            request({
                method: "get",
                url: "http://localhost:8080/v1/sys/preView/instance/" + id,
            }).then((res: any) => {
                console.log("res:", res);
                if (res.data.errorCode != 0) {
                    message.open({
                        type: 'error',
                        content: res.data.msg,
                        duration: 4,
                        style: {
                            marginTop: '15vh',
                        },
                    });
                } else {
                    const lf = new LogicFlow({
                        ...config,
                        _container: document.querySelector('#graph'),
                        get container() {
                            return this._container;
                        },
                        set container(value) {
                            this._container = value;
                        },
                    });
                    RegisteNode(lf);
                    lf.render(JSON.parse(res.data.data.detail));
                    lf.zoom(0.7);
                    let runNodeId = res.data.data.runNodeId;
                    if (runNodeId) {
                        for (let i = 0; i < runNodeId.length; i++) {
                            lf.setProperties(runNodeId[i].nodeId, {
                                active: true,
                            });
                        }
                    }
                }
            }).catch((error) => {
                console.log("error:", error);
            });
        }
        window.addEventListener("resize", () => this.setState({ height: window.innerHeight }));
    }


    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({ height: window.innerHeight }));
    }


    render() {
        return (
            <div>
                <div id="graph" style={{ height: this.state.height * 0.4 }} />
            </div>
        );
    }
}

