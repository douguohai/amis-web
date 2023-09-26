import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { useEffect, useRef } from "react";
// https://site.logic-flow.cn/docs/#/zh/guide/extension/adapter
export default function App2() {
    const refContainer = useRef();
    useEffect(() => {
        const logicflow = new LogicFlow({
            container: refContainer.current,
            grid: true,
            width: 2000,
            height: 1000
        });
        logicflow.render({
            nodes: [
                {
                    id: "3",
                    type: "rect",
                    x: 200,
                    y: 200
                },
                {
                    id: "4",
                    type: "rect",
                    x: 400,
                    y: 300
                }
            ],
            edges: [
                {
                    sourceNodeId: "3",
                    targetNodeId: "4",
                    type: "bezier"
                }
            ]
        });
    }, []);
    return <div className="App" ref={refContainer}></div>;
}