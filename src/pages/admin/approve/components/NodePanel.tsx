import React from 'react';
import LogicFlow from '@logicflow/core';
import { approveNodes } from '../config';
import { HtmlNodeConfig } from '../type';
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

export default function NodePanel(lf: LogicFlow) {
  // 拖拽创建
  const dragNode = (item: HtmlNodeConfig) => {
    console.log(item)
    lf.dnd.startDrag({
      type: item.type,
      text: item.label,
      properties: item.property
    })
  }

  // 节点菜单
  const getNodePanel = (): JSX.Element[] => {
    const nodeList: JSX.Element[] = [];
    approveNodes.forEach((item, key) => {
      console.log(item)
      nodeList.push(
        <div
          className={`approve-node node-${item.type}`}
          key={key}
        >
          <div
            className="node-shape"
            style={{ ...item.style }}
            onMouseDown={() => dragNode(item)}
          ></div>
          <div className="node-label">{item.label}</div>
        </div>
      )
    })
    return nodeList;
  }


  return getNodePanel()
}