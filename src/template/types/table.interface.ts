import { ReactNode } from 'react';
import { TableProps } from "antd/lib/table";
import { PaginationProps } from 'antd/lib/pagination';

type ActionType = 'delete' | 'view' | 'edit' | 'link'; // 操作类型
// 定义操作的枚举类型
export enum ActionTypes {
  delete = 'delete',
  view = 'view',
  edit = 'edit',
  link = 'link'
}

export interface IAction {
  key: ActionType;
  label: string;
  main?: boolean;
  onClick?: (row: object) => void;
}

interface ICallAction {
  (row: object): IAction[]
}
export interface ITable extends TableProps<any> {
  actions?: IAction[] | ICallAction;
  pagination?: PaginationProps;
  onAdd?: () => void;
  onAddText?: string;
  moreActionText?: string;
  onEdit?: (row: object) => void;
  onView?: (row: object) => void;
  onDelete?: (row: object) => void;
  OnLink?: (row: object) => void;
  extra?: ReactNode | string;
  route?: string | object;
}