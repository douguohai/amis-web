import React, { useEffect, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { Menu, Control, DndPanel } from "@logicflow/extension";
import PropertyPanel from './components/property';
import RegisteNode from './components/registerNode';
import { themeApprove, data } from './config';
import "@logicflow/extension/lib/style/index.css";
import './index.css';
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import { message } from 'antd';

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
  plugins: [Menu, Control, DndPanel],
}

export default function ApproveExample() {

  const [lf, setLf] = useState({} as LogicFlow);
  const [nodeData, setNodeData] = useState();
  const [open, setOpen] = useState(false);

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
  }, []);


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
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
      },
      {
        type: 'jugement',
        label: '条件判断',
        text: '条件',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
      },
      {
        type: 'parallelGateway',
        text: '并行开始',
        label: '并行开始',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAXBJREFUOE+1lb1KA0EUhc/dVFbqLsReMgk2Fr6BIBaCTTpfwGKWpBG0NHaCYKFmQHyBNOkEERvfQGyEZNfUQsiuglhokiuz+dH8sQo7U83MPXxzZu6dGYKBRgaYmApdVP4uwDuxCzJXQjd7Oa6bCrXLXgjCQiwUeAukmNBNQB3lHTNwANAHuHMyE0zWPoA5AKeBFHu/dSPQeVVbTsF61gJmuKEr1Cyoo/wCg890PMUkmm7GH2hHoLaqVwHKE/DQkmItbvu28h8BXiXguiXF9gTUUbUNhnWnA90O1l8L4j4WWvY2QbiNdgbaCmXmRveHTm3lPQFYAbgSyGx85vsr2sqvApwHUA+kyA2hjvJcBi70xGcb6feiaMa5HMTTV42l9lfnpQejYktmziOntvI4EnH3KHBzpb8CBzq7XCuBrEM9DqSgCGrEad9tsmfac2sg+z23Cdephhq5Uf2kJXv3f0ok4VdKg428p/8t/nG9ke/kG4C0wRY4obbdAAAAAElFTkSuQmCC',
        properties: {
          "kk": "parallelGateway-start"
        }
      },
      {
        type: 'parallelGateway',
        text: '并行结束',
        label: '并行结束',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAXVJREFUOE+1lb1KxEAUhc/1Z4LYWGm1syiu2TQWvoEgFoLNdr6AzaKNoKVrJwgWKoJvYLOdIGLjG4iNSRYVErdYsBAbIRPNlQwb2V+ikKTK5J75cu7cuTOEHB7KgYmBUFuObxJjI+2HTLi0/PCiVzcQ6kjxDmAqDQrgo+yrPl0f1JHiEMAegE8GjoaBCdgFMMHEx5YX7nTquqCuNOYY/BwLiLlqvobnw6ANaWxF4JM4PhZRab4ZPCXaLqhdEHUiVBi4t3y1lJa+UxQPYCwScGX6ar0P6kpjhcG3cYCjaNlqft2lQe2CsUrENzozojXTC671ezLRkeIRgKUr6qnUyifz3IKoM6ECQqPsKfMX6haNKjOfxR9GlZoutfCW5jKJv8xOzqjvsBWPR0DbC35wqp06UrBOGziwfFX7KzDR2VLUCNiPx2VfkYbm4rTtNts11W7zqH4Mznyftt1m31Httc229zsaIdtTSq9tHufpfzd/rz6X6+QHcg3KFkZDYP8AAAAASUVORK5CYII=',
        properties: {
          "kk": "parallelGateway-end"
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
    console.log(id, data.properties)
    const node = lf.graphModel.nodesMap[id];
    const edge = lf.graphModel.edgesMap[id];
    if (node) {
      node.model.setProperties(Object.assign(node.model.properties, data.properties));
      setNodeData(data);
    } else if (edge) {
      edge.model.setProperties(Object.assign(edge.model.properties, data.properties));
    }
  }

  const onClose = () => {
    setNodeData(undefined);
    setOpen(false);
  };

  return (
    <div className="approve-example-container">
      <div id="graph" className="viewport" />
      {PropertyPanel(nodeData, updateProperty, onClose)}
    </div>
  )
}
