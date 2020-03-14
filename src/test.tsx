import React, { FC } from 'react';
import Template from './template/index';

const config = {
  search: {
    searchText: '搜索',
    resetText: '清空',
    formFields: [
      // {
      //   type: 'custom',
      //   key: 'custom',
      //   component: <div>custom field</div>,
      // },
      // {
      //   componentName: 'Input',
      //   key: 'name',
      //   label: '姓名',
      //   span: 8,
      // },
      // {
      //   componentName: 'Input',
      //   key: 'age',
      //   label: '年龄',
      // },
      {
        componentName: 'Select',
        key: 'gender',
        label: '性别',
        selectOptions: [
          {
            key: 0,
            value: 0,
            label: '女'
          },
          {
            key: 1,
            value: 1,
            label: '男'
          }
        ],
        showArrow: false,
        allowClear: true,
      },
      {
        componentName: 'Checkbox',
        key: 'hobby',
        label: '爱好',
        show: {gender: 1},
        checkboxOptions: [
          {
            value: 0,
            label: '篮球'
          },
          {
            value: 1,
            label: '足球'
          }
        ],
      },
      // {
      //   componentName: 'Cascader',
      //   key: 'area',
      //   label: '地区',
      //   cascaderOptions: [
      //     {
      //       value: 'zhejiang',
      //       label: 'Zhejiang',
      //       children: [
      //         {
      //           value: 'hangzhou',
      //           label: 'Hangzhou',
      //           children: [
      //             {
      //               value: 'xihu',
      //               label: 'West Lake',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       value: 'jiangsu',
      //       label: 'Jiangsu',
      //       children: [
      //         {
      //           value: 'nanjing',
      //           label: 'Nanjing',
      //           children: [
      //             {
      //               value: 'zhonghuamen',
      //               label: 'Zhong Hua Men',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  table: {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    actions: [
      {
        key: 'view',
        label: '查看',
        onClick(row) {
          console.log('view row ===', row);
        }
      },
      {
        key: 'edit',
        label: '编辑',
      },
      {
        key: 'download',
        label: '下载',
      },
      {
        key: 'delete',
        label: '删除',
        onClick(row) {
          console.log('delete row ===', row);
        }
      },
    ]
  },
  modal: {
    formFields: [
      {
        componentName: 'Input',
        key: 'name',
        label: '姓名',
        required: true,
      },
      {
        componentName: 'Input',
        key: 'age',
        label: '年龄',
        required: true,
      },
    ]
  },
  request: {
    callListApi(params: object) {
      return {
        list: [
          {
            key: '1',
            name: '胡彦斌111',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        total: 11,
      }
    },
    callSaveApi(values: object, dataSource?: object) {
      console.log('values ===', values);
      console.log('dataSource ===', dataSource);
      throw new Error('save error');
    },
    callDeleteApi(params?: object) {
      console.log('delete params ====', params);
    }
  },
};

const Test: FC = () => {
  return <Template {...config} />
};

export default Test;