import React, { useEffect, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { Menu, Control, DndPanel } from "@logicflow/extension";
import PropertyPanel from './components/property';
import RegisteNode from './components/registerNode';
import { themeApprove, data } from './config';
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import "@logicflow/core/dist/style/index.css";
import "./index.css";
import { code } from './config'

// https://site.logic-flow.cn/docs/#/zh/guide/extension/adapter
export default function ApproveExample() {

  const [lf, setLf] = useState({} as LogicFlow);
  const [nodeData, setNodeData] = useState("");
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);

  const config = {
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

  useEffect(() => {
    const lf = new LogicFlow({
      ...config,
      container: document.querySelector('#graph') as HTMLElement,
    });

    setLf(lf);
    initControl(lf);
    RegisteNode(lf);
    lf.fitView(30, 30);
    lf.render(data);
    initEvent(lf);

    lf.zoom(0.7);


    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };


  }, []);



  const initControl = (lf: LogicFlow) => {
    lf.extension.control.addItem({
      key: 'download-map',
      iconClass: "custom-minimap",
      title: "下载",
      text: "下载",
      onClick: (lf, ev) => {
        const data = lf.getGraphData()
        download("logic-flow-" + new Date().getTime() + ".json", JSON.stringify(data));
      },
    });
  }


  const initEvent = (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      setNodeData(data);
      setOpen(true)
    });

  }


  // 更新属性
  const updateProperty = (id: string, data: any) => {
    console.log(id, data);
  }

  const onClose = () => {
    setNodeData("");
    setOpen(false);
  };

  return (
    <div>
      <div id="graph" style={{ height: height - 70 }} />
      <PropertyPanel updateProperty={updateProperty} onClose={onClose} nodeData={nodeData} open={open} formDisabled={true} />
    </div>
  )
}

/**
 * 文件下载
 * @param filename 下载文件名称 
 * @param text  文件体
 */
function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

