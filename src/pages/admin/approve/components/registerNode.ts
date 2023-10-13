import LogicFlow, {
  BaseNodeModel,
  ConnectRule,
  CircleNodeModel,
  CircleNode,
  h,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
} from '@logicflow/core';

import GraphModel from "@logicflow/core/types/model/GraphModel";
import { nodeProperty } from '../type';

export default function RegisteNode(lf: LogicFlow) {

  // 申请节点
  class StartNodeModel extends CircleNodeModel {

    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      console.log(data)
      this.properties = {
        next: '',
        nextType: '',
        type: 'start',
      }
    }

    getNodeStyle() {
      const style = super.getNodeStyle();
      style.stroke = "rgb(24, 125, 255)";
      return style;
    }

    getConnectedTargetRules(): ConnectRule[] {
      const rules = super.getConnectedTargetRules();
      const geteWayOnlyAsTarget = {
        message: '开始节点只能连出，不能连入！',
        validate: (source: BaseNodeModel, target: BaseNodeModel) => {
          let isValid = true;
          if (target) {
            isValid = false;
          }
          return isValid;
        },
      };
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget);
      return rules;
    }
  }
  lf.register({
    type: 'start',
    view: CircleNode,
    model: StartNodeModel,
  })


  //审批节点
  class ApproverNode extends RectNode {
    static extendKey = 'UserTaskNode';
    getLabelShape() {
      const {
        x,
        y,
        width,
        height,
        properties,
      } = this.props.model;
      const { labelColor, approveTypeLabel } = properties as nodeProperty;
      return h(
        'text',
        {
          fill: labelColor,
          fontSize: 12,
          x: x - width / 2 + 5,
          y: y - height / 2 + 15,
          width: 50,
          height: 25
        },
        approveTypeLabel,
      );
    }
    getShape() {
      const {
        x,
        y,
        width,
        height,
        radius,
      } = this.props.model;
      const style = this.props.model.getNodeStyle();
      return h(
        'g',
        {
        },
        [
          h(
            'rect',
            {
              ...style,
              x: x - width / 2,
              y: y - height / 2,
              rx: radius,
              ry: radius,
              width,
              height,
            },
          ),
          this.getLabelShape(),
        ],
      );
    }
  }
  class ApproverModel extends RectNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.properties = {
        labelColor: '#000000',
        type: 'approval',
      }
    }
  }

  lf.register({
    type: 'approver',
    view: ApproverNode,
    model: ApproverModel,
  })


  // 条件节点
  class ConditionGateWayModel extends PolygonNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.points = [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35],
      ];
      this.properties = {
        type: 'conditionGateWay',
      }
    }
  }


  lf.register({
    type: 'conditionGateWay',
    view: PolygonNode,
    model: ConditionGateWayModel,
  });


  // 并行条件节点
  class ParallelGatewayView extends PolygonNode {

    getShape() {
      const { model } = this.props;
      const { x, y, width, height, points } = model;
      const style = model.getNodeStyle();

      const properties = model.properties;
      if (properties.action == "parallelGateway-end") {
        style.stroke = "red";
      } else {
        style.stroke = "rgb(24, 125, 255)";
      }

      return h(
        'g',
        {
          transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`,
        },
        h('polygon', {
          ...style,
          x,
          y,
          points,
        }),
      );
    }
  }


  // 并行条件节点
  class ParallelGatewayModel extends PolygonNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.points = [
        [40, 0],
        [80, 20],
        [80, 60],
        [40, 75],
        [0, 60],
        [0, 20]
      ];
      this.properties = {
        ...data.properties,
        type: 'parallelGateWay',
      }
    }
  }
  lf.register({
    type: 'parallelGateway',
    view: ParallelGatewayView,
    model: ParallelGatewayModel,
  });


  //结束节点
  class FinshNodeModel extends CircleNodeModel {

    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.properties = {
        type: 'finsh',
      }
    }

    getConnectedSourceRules(): ConnectRule[] {
      const rules = super.getConnectedSourceRules();
      const geteWayOnlyAsTarget = {
        message: '结束节点只能连入，不能连出！',
        validate: (source: BaseNodeModel) => {
          let isValid = true;
          if (source) {
            isValid = false;
          }
          return isValid;
        },
      };
      // @ts-ignore
      rules.push(geteWayOnlyAsTarget);
      return rules;
    }
  }

  lf.register({
    type: 'finsh',
    view: CircleNode,
    model: FinshNodeModel,
  })



  class TaskView extends RectNode {
    getLabelShape() {
      const { model } = this.props;
      const { x, y, width, height } = model;
      const style = model.getNodeStyle();
      return h(
        "svg",
        {
          x: x - width / 2 + 5,
          y: y - height / 2 + 5,
          width: 25,
          height: 25,
          viewBox: "0 0 1274 1024"
        },
        [
          h("path", {
            fill: style.stroke,
            d:
              "M690.366075 350.568358c0-98.876614-79.937349-179.048571-178.558027-179.048571-98.59935 0-178.515371 80.150629-178.515371 179.048571 0 98.833958 79.916021 178.963259 178.515371 178.963259C610.428726 529.531617 690.366075 449.380988 690.366075 350.568358M376.140632 350.568358c0-75.159877 60.72082-136.072649 135.667416-136.072649 74.989253 0 135.667416 60.912772 135.667416 136.072649 0 75.117221-60.678164 136.029993-135.667416 136.029993C436.861451 486.577022 376.140632 425.664251 376.140632 350.568358M197.284012 762.923936 197.284012 778.472049l15.526785 0 291.255186 0.127968L819.784387 778.472049l15.569441 0 0-15.548113c0-139.783721-136.413897-285.581938-311.026243-273.275681-10.002833 0.703824-24.740482 9.128385-34.658002 9.938849-8.573857 0.74648 13.692577 8.232609 14.396401 16.827793 9.021745-0.789136 6.313088 13.095393 15.505457 13.095393 150.597017 0 263.14488 103.07823 263.14488 224.62651l15.441473-15.590769-285.816546-0.042656-278.991585 1.81288 15.526785 15.612097c0-82.752645 75.095893-152.70849 136.861785-191.824044 7.25152-4.58552 8.659169-17.659585 4.862784-22.906273-6.846288-9.426977-19.877697-8.701825-28.046322-6.014496C285.262018 560.521203 197.284012 667.758394 197.284012 762.923936"
          }),
          h('path', {
            fill: style.stroke,
            d:
              'M882.527918 434.149934c-2.234901-5.303796-7.311523-8.853645-13.059434-9.138124l-61.390185-3.009544c-6.635117-20.973684-15.521508-41.175795-26.513864-60.282968l42.051745-47.743374c4.308119-4.889357 4.955872-12.004405 1.602498-17.59268-46.384423-77.30362-103.969956-101.422947-106.400309-102.410438-5.332449-2.170432-11.432377-1.090844-15.693424 2.77009L654.674467 240.664222c-17.004279-8.654101-35.092239-15.756869-53.995775-21.210068l-3.26537-66.490344c-0.280386-5.747911-3.833305-10.824533-9.134031-13.059434-1.683339-0.709151-30.193673-12.391215-76.866668-12.051477-46.672996-0.339738-75.18333 11.342326-76.866668 12.051477-5.300726 2.234901-8.853645 7.311523-9.134031 13.059434l-3.26537 66.490344c-18.903535 5.453199-36.991496 12.555967-53.995775 21.210068l-48.450479-43.922349c-4.261047-3.860934-10.360975-4.940522-15.693424-2.77009-2.430352 0.98749-60.015885 25.106818-106.400309 102.410438-3.353374 5.588275-2.705622 12.703323 1.602498 17.59268l42.051745 47.743374c-10.992355 19.107173-19.878746 39.309284-26.513864 60.282968l-61.390185 3.009544c-5.747911 0.284479-10.824533 3.834328-13.059434 9.138124-1.01512 2.415003-24.687262 60.190871-2.822278 147.651828 1.583055 6.324032 7.072069 10.893094 13.57518 11.308557 5.892197 0.37146 11.751648 0.523933 17.419741 0.667196 14.498202 0.372483 28.193109 0.723477 40.908712 4.63353 4.212952 1.294482 6.435573 8.270361 9.349949 18.763342 1.287319 4.640694 2.617617 9.43693 4.484128 14.010085 1.794879 4.393054 3.75758 8.570189 5.66093 12.607132 1.302669 2.765997 2.529613 5.380544 3.689019 8.018627 2.986007 6.803963 2.682086 9.773598 2.578732 10.349719-3.061732 3.672646-6.391571 7.238868-9.91379 11.015891-1.810229 1.943258-3.680832 3.949962-5.523807 5.980201l-22.560832 24.8909c-3.865028 4.261047-4.940522 10.365068-2.774183 15.693424 0.991584 2.426259 25.102724 60.011792 102.414531 106.400309 5.588275 3.353374 12.703323 2.701528 17.591657-1.603521l23.476691-20.682042c2.346441-2.061962 4.64888-4.336772 6.875594-6.534833 9.05319-8.93858 14.018272-12.95608 17.73185-11.576663 3.305279 1.222851 6.907317 3.166109 10.720156 5.228071 3.325745 1.794879 6.764054 3.650133 10.465352 5.288446 6.016017 2.662643 12.120039 4.688789 18.019399 6.65149 6.827499 2.266623 13.279445 4.409426 18.819624 7.275707 1.518586 0.782829 1.926886 0.994654 2.358721 7.830339 0.726547 11.496845 1.25048 23.276123 1.753947 34.672684 0.264013 5.900384 0.528026 11.803837 0.815575 17.700127 0.284479 5.743818 3.833305 10.82044 9.138124 13.05534 1.654686 0.698918 29.371958 12.063757 74.869175 12.063757 0.328481 0 3.65832 0 3.986801 0 45.497217 0 73.214489-11.364839 74.869175-12.063757 5.304819-2.234901 8.853645-7.311523 9.138124-13.05534 0.287549-5.89629 0.551562-11.799744 0.815575-17.700127 0.503467-11.396561 1.027399-23.175839 1.753947-34.672684 0.431835-6.835685 0.840134-7.04751 2.358721-7.830339 5.54018-2.866281 11.992125-5.009084 18.819624-7.275707 5.89936-1.962701 12.003382-3.988848 18.019399-6.65149 3.701299-1.638313 7.139607-3.493567 10.465352-5.288446 3.812839-2.061962 7.414877-4.00522 10.720156-5.228071 3.713578-1.379417 8.67866 2.638083 17.73185 11.576663 2.226714 2.198062 4.529153 4.472871 6.875594 6.534833l23.476691 20.682042c4.888334 4.305049 12.003382 4.956895 17.591657 1.603521 77.311807-46.388517 101.422947-103.97405 102.414531-106.400309 2.166339-5.328355 1.090844-11.432377-2.774183-15.693424l-22.560832-24.8909c-1.842974-2.030239-3.713578-4.036943-5.523807-5.980201-3.52222-3.777023-6.852058-7.343245-9.91379-11.015891-0.103354-0.576121-0.407276-3.545756 2.578732-10.349719 1.159406-2.638083 2.38635-5.252631 3.689019-8.018627 1.90335-4.036943 3.866051-8.214079 5.66093-12.607132 1.866511-4.573155 3.196809-9.369392 4.484128-14.010085 2.914376-10.492982 5.136997-17.46886 9.349949-18.763342 12.715603-3.910053 26.41051-4.261047 40.908712-4.63353 5.668093-0.143263 11.527544-0.295735 17.419741-0.667196 6.503111-0.415462 11.992125-4.984524 13.57518-11.308557C907.21518 494.340805 883.543038 436.564937 882.527918 434.149934zM643.49894 643.761929c-35.280528 35.280528-82.191954 54.711066-132.086317 54.711066s-96.806813-19.430538-132.086317-54.711066c-35.280528-35.279504-54.711066-82.191954-54.711066-132.086317 0-49.894364 19.430538-96.80272 54.711066-132.082224 35.283598-35.284621 82.191954-54.711066 132.086317-54.711066s96.80579 19.426445 132.086317 54.711066c35.279504 35.279504 54.711066 82.187861 54.711066 132.082224C698.210006 561.569976 678.782537 608.482425 643.49894 643.761929z',
          }),
        ]
      );
    }

    getShape() {
      const { model } = this.props;
      const { x, y, width, height, radius } = model;
      const style = model.getNodeStyle();
      return h("g", {}, [
        h("rect", {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width,
          height
        }),
        this.getLabelShape()
      ]);
    }
  }

  class TaskModel extends RectNodeModel {

    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.properties = {
        red: true,
        type: 'taskNode',
        action: 'apply',
        webhook: ''
      }
      this.text.value = "apply"
    }

    setAttributes() {
      this.width = 100;
      this.height = 80;
    }
    getTextStyle() {
      const style = super.getTextStyle();
      style.fontSize = 12;
      const properties = this.properties;
      style.color = properties.red ? "red" : "rgb(24, 125, 255)";
      return style;
    }
    getNodeStyle() {
      const style = super.getNodeStyle();
      const properties = this.properties;
      if (properties.red) {
        style.stroke = "red";
      } else {
        style.stroke = "rgb(24, 125, 255)";
      }
      return style;
    }

  }

  lf.register({
    type: 'taskNode',
    view: TaskView,
    model: TaskModel,
  })
}
