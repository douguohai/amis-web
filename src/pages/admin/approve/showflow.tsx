import React, { useEffect, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { Control, Snapshot } from "@logicflow/extension";
import PropertyPanel from './components/property';
import RegisteNode from './components/registerNode';
import { themeApprove, data } from './config';
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import "@logicflow/core/dist/style/index.css";
import "./index.css";
import { useLocation } from 'react-router-dom';
import { request } from '@/utils/requestInterceptor';
import { message } from 'antd';

// https://site.logic-flow.cn/docs/#/zh/guide/extension/adapter
export default function ApproveExample() {

  const [lf, setLf] = useState({} as LogicFlow);
  const [nodeData, setNodeData] = useState("");
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  const location = useLocation();

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
    plugins: [Control, Snapshot],
  }

  useEffect(() => {
    const lf = new LogicFlow({
      ...config,
      container: document.querySelector('#graph') as HTMLElement,
    });

    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    if (id != undefined) {
      request({
        method: "get",
        url: "http://localhost:8080/v1/sys/flowDetail/" + id,
      }).then((res: any) => {
        console.log("res:", res);
        if (res.data.errorCode != 0) {
          message.open({
            type: 'error',
            content: res.data.errorMessage,
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
          setLf(lf);
          RegisteNode(lf);
          initControl(lf);
          initEvent(lf);
          lf.render(JSON.parse(res.data.data.detail));
        }
      }).catch((error) => {
        console.log("error:", error);
      });
    }

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
      title: "下载文件",
      text: "下载文件",
      onClick: (lf, ev) => {
        const data = lf.getGraphData()
        download("logic-flow-" + new Date().getTime() + ".json", JSON.stringify(data));
      },
    });
    lf.extension.control.addItem({
      key: 'download-map',
      iconClass: "custom-minimap",
      title: "下载图片",
      text: "下载图片",
      onClick: (lf, ev) => {
        lf.getSnapshot();
      },
    });
  }


  const initEvent = (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      setNodeData(data);
      setOpen(true)
      console.log(JSON.stringify(lf.getGraphData()));
    });
  }



  // 更新属性
  const updateProperty = (id: string, data: any) => {
    console.log("updateProperty", id, data)
    setNodeData(data);
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

