import React, { useEffect, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { Menu, Control, DndPanel } from "@logicflow/extension";
import PropertyPanel from './components/property';
import RegisteNode from './components/registerNode';
import { themeApprove, data } from './config';
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import { message } from 'antd';

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
    plugins: [Menu, Control, DndPanel],
  }

  useEffect(() => {
    const lf = new LogicFlow({
      ...config,
      container: document.querySelector('#graph') as HTMLElement
    });
    setLf(lf);
    RegisteNode(lf);
    lf.render(data);
    initEvent(lf);
    initPanel(lf)

    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  lf.setTheme({
    edgeText: {
      textWidth: 100,
      overflowMode: "autoWrap",
      fontSize: 12,
      background: {
        fill: "#FFFFFF",
      },
    },
  });


  const initPanel = (lf: LogicFlow) => {
    lf.extension.dndPanel.setPatternItems([
      {
        type: 'start',
        text: '开始',
        label: '开始节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
      },
      {
        type: 'taskNode',
        text: '任务节点',
        label: '任务节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAwpJREFUOE+1lU9sVFUYxc+5rUsC87oxEZOqvVPQXSES44aGhTtMrEUSXNQg0HmvYIAQEw0RI66MEJX3prEaS4KJtmCiOxekuGCBMe5EO7cqATRu5k2N2/Ydc1/73sxoS3HhbCZz//zuvd855xvif/hwI2YQL7wA6rNinYSoFdnkXvv+BQ0m3eNcgm1O2C/9xiBxJwTUtIxD7MFxkmlaG3jJz/VdaOxSL/9Kx+3NzkO6oB6IDDMArMjThB6EcBzC5TSyo5XYxSRCkNOQrgN4H8AvMNjXCS6hJVBqifgK4ikY3IHwtTHmanP8satbPnC72csnKT0HYBeAcwD7AQ12gkto/hTDOQD1NLQnPWDxqL22Xu221H/sX6xtv9UXN8ZEJsw03Jyo3vDru5+fuJcBTGVcesRvKIBB4kah7AnQ/JCGdrYY33zBDfUYXgH0dhraj4rxbmh94RNJ/a3QDreBjZ8ADrZvrPk0rG4rflcSNwfhZiuyURc0iN1BkjsFjXdaJt8AwEgXm1F1upIsHCb0qoDbxcGV2IUkYpKvCNlvaa16Jb9pkDgJXhzcVYZZX8tK3R2gcAnK3kyjwTPlzVd9K+LFVs1+6mtvjA6D3AGgmoaWJTRbxnCnMEE8fwY0b/hF/xTLv4DKvuk8LIf3YK4LCqAh4HdjzFlvn1wcYEbgkVY48GGXaMi9vM+LltvMYBTEVgJ729B6Y4QwD0l6j9DpZlg9u1KWXKQHIL6WRgOfF7cB2mKVNQUnJX2XRvbjrqetJmYoDe1TneoS2C3gWvHd6Y68FOStIrrr+JSvL2ca+XPCfl+CvWhZZmWM8+IU4z4ARr2/Aji0pk+LRFEKvX2KxKybqNXEBYl7F0BtzUS1mwnnAfk0nQBwQ+QXWtK33hl9kz/vybJsD4hnkOFhUO9Q2Auysmb2c2HaXepRAMdAPg1pTELiExPEbhbE8yDOC/yD0lsA3LpdqrRM3k+1qWgOwUp0Ay3jPHswxZWGc26ln7pn1Qt3z366Vv0Ky5Rz4n5vr//U+Tf6e7mf+b8B0vqbJTbXhqoAAAAASUVORK5CYII=',
      },
      {
        type: 'approver',
        text: '审批节点',
        label: '审批节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
      },
      {
        type: 'conditionGateWay',
        label: '条件网关',
        text: '条件网关',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
      },
      {
        type: 'parallelGateway',
        text: '并行开始',
        label: '并行网关',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAXBJREFUOE+1lb1KA0EUhc/dVFbqLsReMgk2Fr6BIBaCTTpfwGKWpBG0NHaCYKFmQHyBNOkEERvfQGyEZNfUQsiuglhokiuz+dH8sQo7U83MPXxzZu6dGYKBRgaYmApdVP4uwDuxCzJXQjd7Oa6bCrXLXgjCQiwUeAukmNBNQB3lHTNwANAHuHMyE0zWPoA5AKeBFHu/dSPQeVVbTsF61gJmuKEr1Cyoo/wCg890PMUkmm7GH2hHoLaqVwHKE/DQkmItbvu28h8BXiXguiXF9gTUUbUNhnWnA90O1l8L4j4WWvY2QbiNdgbaCmXmRveHTm3lPQFYAbgSyGx85vsr2sqvApwHUA+kyA2hjvJcBi70xGcb6feiaMa5HMTTV42l9lfnpQejYktmziOntvI4EnH3KHBzpb8CBzq7XCuBrEM9DqSgCGrEad9tsmfac2sg+z23Cdephhq5Uf2kJXv3f0ok4VdKg428p/8t/nG9ke/kG4C0wRY4obbdAAAAAElFTkSuQmCC',
        properties: {
          "action": "parallelGateway-start"
        }
      },
      {
        type: 'finsh',
        text: '结束',
        label: '结束节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAbdJREFUOE+11D9IG3EUB/DvuyS/0+pUdBD1rlA0p8YpcaopiKMuXRzq0lEHN3FVwc2pW1dBEUWd3BS76KSBoiFG24K51BZpcVFb88t5Ty71QvxLIncHxy3vffjd+733CD489JS536i2BhSOMpwXUSi0RUBC2rTbmc19fyz3QTRZj9pgtToN8JCTyAyLwJsgegMgdIMtWrYcjvzA6V38HnqgBbsZyjoAlYFJJtq2a3JrkRTkThSh2j9VcWb7LQHjACwQPhgZOVcK30LTuhgEYxbAchUFR15l/v567Be/aqL9CpgBECPY8bBpbbqxRTTZhJdBRZwA+GKYsqvc+0trYglAv/VP1kV+49zJK6JpTSwAGAgAHS2mTJWLHukvGi7Z+gnQJ8PMDRfRvWb1dYj4m1PDNlNOlAu6cfuamHBqzFcUbjvOHRZOeqCLd8xYASm9RuZyo1I0pat9CvOqwnjfmpXzBTStiykwxs7rZU0sgXylaLIdInAmLhTwx3A2P/ofbQ59dr5GNt9TKejGlxr+ndSXmvpy+4W6et2nDurLRN20lrez77aG51vKhT3fp6XN7+nmf+5UuXnXBMoMJVvY4G0AAAAASUVORK5CYII=',
      }
    ]);
  }


  const initEvent = (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      setNodeData(data);
      setOpen(true)
      console.log(open);
      console.log(data);
      console.log(JSON.stringify(lf.getGraphData()));
    });
    lf.on('connection:not-allowed', (data: any) => {
      message.open({
        type: 'error',
        content: data.msg,
        duration: 4,
        style: {
          marginTop: '15vh',
        },
      });
    });
    lf.on('anchor:drop', (data: any) => {
      //线连接成功触发该事件
      console.log("线连接成功触发该事件", data);
      console.log("线连接成功触发该事件", data.edgeModel.sourceNodeId, data.edgeModel.targetNodeId);
      const sourceId = data.edgeModel.sourceNodeId;
      const targetId = data.edgeModel.targetNodeId;
      const edgeId = data.edgeModel.id;
      const sourceNode = lf.graphModel.nodesMap[sourceId];
      const targetNode = lf.graphModel.nodesMap[targetId];
      const preType = sourceNode.model.getProperties().type
      const preAction = sourceNode.model.getProperties().action
      if (["conditionGateWay", "approval"].indexOf(preType) < 0 && preAction != "parallelGateway-start") {
        lf.setProperties(sourceId, {
          nextId: targetId,
          nextType: targetNode.model.getProperties().type,
        });
      }

      targetNode.model.setProperties(Object.assign(targetNode.model.properties, {
        preId: sourceId,
      }));

      if (preType == "conditionGateWay" || preAction == "parallelGateway-start" || preType == "approval") {
        lf.setProperties(edgeId, {
          type: "approval" == preType ? "system" : "custom",  // 判断条件类型  custom(自定义) system(系统默认)
          nextType: targetNode.model.getProperties().type,
          nextId: targetId,
          preId: sourceId,
        });
      }
    });

    lf.on('edge:delete', (data: any) => {
      //线连被删除触发该事件
      console.log("线被删除了", data, data.data.sourceNodeId);
      const sourceId = data.data.sourceNodeId;
      const sourceNode = lf.graphModel.nodesMap[sourceId];
      const preType = sourceNode.model.getProperties().type
      const preAction = sourceNode.model.getProperties().action
      sourceNode.model.setProperties(Object.assign(sourceNode.model.properties, {
        nextId: '',
        nextType: '',
      }));
      if (preType == "conditionGateWay" || preAction == "parallelGateway-start") {
        lf.setProperties(sourceId, {
          conditions: lf.getNodeOutgoingEdge(sourceId).map(element => {
            let { lineDesc, ...params } = element.getProperties()
            return params;
          }),
        });
      }

    });

    lf.on('history:change', (data: any) => {
      //触发存储历史数据事件
      console.log("历史", data);
    });

    lf.on('node:dnd-add', (data: any) => {
      console.log(data)
      //控制面板新托拽节点
      const node = data.data;
      if (node.type == "parallelGateway" && node.properties?.action == "parallelGateway-start") {
        const end = lf.addNode({
          type: "parallelGateway",
          properties: {
            "action": "parallelGateway-end",
            "friend": node.id,
          },
          text: { x: node.x + 300, y: node.y, value: '并行结束' },
          x: node.x + 300,
          y: node.y
        })
        lf.setProperties(node.id, {
          "friend": end.id,
        });
      }
    });

    lf.on('node:delete', (e: any) => {
      //删除节点触发事件
      console.log("删除节点", e);
      if (e.data.type = "parallelGateway") {
        lf.deleteNode(e.data.properties.friend)
      }
    });

  }


  // 更新属性
  const updateProperty = (id: string, data: any) => {
    const node = lf.graphModel.nodesMap[id];
    const edge = lf.graphModel.edgesMap[id];
    if (node) {
      node.model.setProperties(Object.assign(node.model.properties, data.properties));
      const nodeModel = lf.getNodeModelById(id);
      if (nodeModel.type == "taskNode") {
        console.log(nodeModel)
        const currentNextId = nodeModel.getProperties().nextId;
        if ("" != currentNextId && lf.getNodeDataById(currentNextId)?.type == "finsh") {
          lf.deleteEdgeByNodeId({
            sourceNodeId: id,
            targetNodeId: currentNextId,
          });
          let { nextId, nextType, ...temp } = node.model.properties
          lf.setProperties(id, temp)
          lf.deleteProperty(currentNextId, "preId")
          let { type, ...temp2 } = data.properties
          data.properties = temp2
        }
        nodeModel.updateText(data.properties.action);
      }
    } else if (edge) {
      console.log(edge)
      edge.model.updateText(data.text?.value)
      const sourceId = data.sourceNodeId;
      const sourceNode = lf.graphModel.nodesMap[sourceId];
      const preType = sourceNode.model.getProperties().type
      const preAction = sourceNode.model.getProperties().action
      if (["parallelGateway", "approval", "conditionGateWay"].indexOf(preType) >= 0 && preAction != "parallelGateway-end") {
        edge.model.setProperties(Object.assign(edge.model.properties, data.properties));
        const sourceId = edge.model.getProperties().preId;
        lf.setProperties(sourceId, {
          conditions: lf.getNodeOutgoingEdge(sourceId).map(element => {
            let { lineDesc, ...params } = element.getProperties()
            return params;
          }),
        });

      } else {
        let { type, ...temp } = data.properties
        edge.model.setProperties(Object.assign(edge.model.properties, temp));
        data.properties = temp
      }
    }
    setNodeData(data);
  }

  const onClose = () => {
    setNodeData("");
    setOpen(false);
  };

  return (
    <div>
      <div id="graph" style={{ height: height - 70 }} />
      <PropertyPanel updateProperty={updateProperty} onClose={onClose} nodeData={nodeData} open={open} />
    </div>
  )
}
