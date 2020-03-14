import React, { FC } from 'react';
import { Table, Button, Dropdown, Menu, Pagination, Modal } from "antd";
import { DownOutlined } from '@ant-design/icons';
import './table.scss';
import { ITable, ActionTypes, IAction } from '../types/table.interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const TableTemplate: FC<ITable> = ({
  onAdd,
  onAddText="新增", 
  moreActionText="更多",
  dataSource,
  columns, 
  actions, 
  loading=false, 
  pagination={
    current: 1,
    pageSize: 10,
  },
  onEdit,
  onView,
  onDelete,
  extra,
  OnLink,
  ...restProps
}) => {
  // 执行操作功能
  const dispatchAction = (triggerAction: IAction, row: object) => {
    if (triggerAction?.onClick) {
      triggerAction.onClick(row);
    } else {
      // 未传递操作方法，常见的类型
      switch (triggerAction?.key) {
        case ActionTypes.edit:
          onEdit && onEdit(row);
          break;
        case ActionTypes.delete:
          Modal.confirm({
            title: '确定要删除这条数据吗?',
            icon: <ExclamationCircleOutlined />,
            content: '请谨慎操作',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              onDelete && onDelete(row);
            },
            onCancel() { },
          });
          break;
        case ActionTypes.view:
          onView && onView(row);
          break;
        default:
          break;
      }
    }
  };
  // table 列表聚合操作
  columns = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, row) => {
        const newAction = typeof actions === 'function' ? actions(row) : actions;
        const menuClick = (e: any) => {
          const triggerAction = newAction?.find(action => action.key === e.key);
          triggerAction && dispatchAction(triggerAction, row);
        };
        const actionsMenu = (mainkey: any) => (
          <Menu onClick={menuClick}>
            {
              newAction?.filter(action => action.key !== mainkey).map((action) => (<Menu.Item key={action.key}>{action.label}</Menu.Item>))
            }
          </Menu>
        );
        // 操作个数多于两个，采用主操作 + n个次操作
        if (newAction && newAction.length < 3 && newAction?.length > 1) {
          return (
            newAction?.map(item => (<Button type="link" key={item.key} onClick={() => {item.onClick && item.onClick(row)}}>{item.label}</Button>))
          )
        } else {
          let mainAction =  newAction?.find(action => action.main === true);
          mainAction = mainAction || (newAction && newAction[0]);
          return (
            <>
              <Button type="link" onClick={() => {if (mainAction) {dispatchAction(mainAction, row)}}}>{mainAction?.label}</Button>
              <Dropdown overlay={() => actionsMenu(mainAction?.key)}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {moreActionText} <DownOutlined />
                </a>
              </Dropdown>
            </>
          )
        }
      },
    },
  ];
  return (
    <>
      <div className="add-button">
        {onAdd && <Button type="primary" onClick={onAdd}>{onAddText}</Button>}
        {extra}
      </div>
      <div className="table-wrapper">
      <Table loading={loading} dataSource={dataSource} columns={columns} pagination={false} {...restProps} />
      {
        pagination && 
        <div className="pagination-wrapper">
          <Pagination
            showSizeChanger
            onChange={pagination.onChange}
            onShowSizeChange={pagination.onChange}
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
          />
        </div>
      }
    </div>
  </>
  );
};

export default TableTemplate;
