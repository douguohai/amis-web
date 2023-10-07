import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import LogicFlow from '@logicflow/core';
import { Menu, Control } from "@logicflow/extension";
import PropertyPanel from './components/property';
import NodePanel from './components/NodePanel';
import RegisteNode from './components/registerNode';
import { themeApprove, data } from './config';
import "@logicflow/extension/lib/style/index.css";
import './index.css';

const config = {
  width: 1500,
  height: 800,
  grid: {
    size: 10,
    visible: true,
    type: 'mesh',
    config: {
      color: '#DCDCDC',  // 设置网格的颜色
    }
  },
  keyboard: { enabled: false },
  style: themeApprove,
  plugins: [Menu, Control],
}

export default function ApproveExample() {
  const [lf, setLf] = useState({} as LogicFlow);
  const [nodeData, setNodeData] = useState();

  useEffect(() => {
    const lf = new LogicFlow({
      ...config,
      container: document.querySelector('#graph') as HTMLElement
    });
    setLf(lf);
    RegisteNode(lf);
    lf.render(data);
    initEvent(lf);
  }, []);


  const initEvent = (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      setNodeData(data);
      console.log(data);
      console.log(JSON.stringify(lf.getGraphData()));
    });
    lf.on('connection:not-allowed', (data: any) => {
      message.error(data.msg);
    });
    lf.on('anchor:drop', (data: any) => {
      //线连接成功触发该事件
      console.log("线连接成功触发该事件", data);
      console.log("线连接成功触发该事件", data.edgeModel.sourceNodeId, data.edgeModel.targetNodeId);
      const node = lf.graphModel.nodesMap[data.edgeModel.sourceNodeId];
      console.log(node.model.getProperties())
      var pp = {
        dgh2: "zhangsan"
      }

      node.model.setProperties(Object.assign(node.model.properties, pp));
      console.log(node.model.getProperties())
    });
    lf.on('edge:delete', (data: any) => {
      //线连接成功触发该事件
      console.log("线被删除了", data);
    });

    lf.on('history:change', (data: any) => {
      //线连接成功触发该事件
      console.log("历史", data);
    });

  }


  // 更新属性
  const updateProperty = (id: string, data: any) => {
    console.log(id, data)
    const node = lf.graphModel.nodesMap[id];
    const edge = lf.graphModel.edgesMap[id];
    if (node) {
      node.model.setProperties(Object.assign(node.model.properties, data));
    } else if (edge) {
      edge.model.setProperties(Object.assign(edge.model.properties, data));
    }
  }


  // 隐藏属性面板
  const hidePropertyPanel = () => {
    setNodeData(undefined);
  }


  return (
    <div className="approve-example-container">
      <div className="node-panel">
        {NodePanel(lf)}
      </div>
      <div id="graph" className="viewport" />
      {nodeData ? <div className="property-panel">
        {PropertyPanel(nodeData, updateProperty, hidePropertyPanel)}
      </div> : ''}
    </div>
  )
}
