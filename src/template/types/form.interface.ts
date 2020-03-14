import { ReactNode } from 'react';
import { FormProps } from 'antd/lib/form';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { CascaderOptionType } from 'antd/lib/cascader';

type ComponentType = 'custom' | 'formItem';
interface IOption {
  key: string | number;
  value: string | number;
  label: string | number | ReactNode;
};

interface IOptionConfig {
  list: [];
  // 指定字段
  key: string;
  value: string;
  label: string;
};

type ComponentName = 'Input' | 'Select' | 'Checkbox' | 'Cascader';

export interface IField {
  componentName?: ComponentName;
  component?: string | ReactNode;
  key: string;
  type?: ComponentType,
  label?: string;
  span?: number;
  placeholder?: string;
  selectOptions?: IOption[] | IOptionConfig; // 适用于Select选择框
  checkboxOptions?: (string | CheckboxOptionType)[];
  cascaderOptions?: CascaderOptionType[];
  // TODO：验证规则单独拿出必填字段
  required?: boolean;
  message?: string;
  rules?: [];
  // 表单联动
  show?: string | object | ((values: object) => boolean); // 是否显示
  setValues?: object | ((values: object) => void); // 数据改变联动改变另一组数据
};

export interface IForm extends FormProps {
  form?: any;
  // 取名formFields的原因：属性继承自antd form属性，但是已经存在fields的属性，不必覆盖
  formFields: IField[];
  onSearch?: (values: any) => void;
  searchText?: string;
  resetText?: string;
};