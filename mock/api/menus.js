module.exports = () => {
  return {
    status: 0,
    data: [
      {
        label: "导航",
        children: [
          {
            path: "/dashboard",
            label: "Dashboard",
            icon: "fa fa-gauge",
          },
          {
            path: "/dialog/simple",
            label: "Dialog",
            icon: "fa fa-bomb",
          },
          {
            label: "会员管理",
            icon: "fa fa-user",
            children: [
              {
                label: "列表",
                path: "/customer/index",
              },
            ],
          },
          {
            label: "选项卡",
            icon: "fa fa-clone",
            children: [
              {
                label: "常规选项卡",
                path: "/tabs",
              },
            ],
          },
          {
            path: "/icon/simple",
            label: "Icon",
            icon: "fa fa-th",
          },
          {
            path: "/horizontal",
            label: "排版",
            icon: "fa fa-grip",
          },
          {
            label: "表单页面",
            icon: "fas fa-pen-to-square",
            children: [
              {
                label: "常规表单",
                children: [
                  {
                    label: "常规表单",
                    path: "/form/basic",
                  },
                  {
                    label: "三级目录测试",
                    path: "/form/basic/advanced",
                  },
                ],
              },
              {
                label: "复杂表单",
                path: "/form/advanced",
              },
              {
                label: "向导",
                path: "/form/wizard",
              },
              {
                label: "代码编辑器",
                path: "/form/editor",
              }
            ],
          },
          {
            label: "流程引擎",
            icon: "fa fa-magic",
            children: [
              {
                label: "应用管理",
                path: "/flow/apps",
              },
              {
                label: "流程列表",
                path: "/flow/list",
              },
              {
                label: "设计流程",
                path: "/flow/editor",
              },
            ],
          },
          {
            label: "SchemaApi",
            icon: "fa fa-th",
            children: [
              {
                path: "/schemaApi/demo1",
                label: "渲染接口amis",
                icon: "fa fa-th",
              },
            ],
          },
          {
            label: "系统管理",
            icon: "fa fa-th",
            children: [
              {
                path: "/schemaApi/deptControl",
                label: "部门信息",
                icon: "fa fa-th",
              },
              {
                path: "/schemaApi/permissionControl",
                label: "菜单信息",
                icon: "fa fa-th",
              },
              {
                path: "/schemaApi/roleControl",
                label: "角色信息",
                icon: "fa fa-th",
              },
            ],
          },
        ],
      },
    ],
  };
};
