import React, { FC, useRef, useEffect } from 'react';
import { Form, Input, Row, Col, Button, Select, Checkbox, Cascader } from 'antd';
import { IField, IForm } from '../types/form.interface';
import * as _ from 'lodash';
/**
 * 通用的Form表单解决方案
 * 样式布局 label + field
 * placeholder 应该具有提示内容，无需把label重复写入，默认值为 '请选择 | 请输入'
 * 表单项校验
 * 多次提交 loading
 * 操作按钮的展示，两个按钮正常展示，三个及以上要收起来
 */
// 搜索框
const FormTemp: FC<IForm> = ({
  form,
  formFields,
  onSearch,
  initialValues,
  searchText="查询",
  resetText="重置",
  labelCol={span: 4},
  wrapperCol={span: 16},
  ...restProps
}) => {
  if (!form) {
    [form] = Form.useForm();
  }
  // 根据field的类型和数据渲染页面
  const getField = ({
    show,
    componentName,
    placeholder,
    selectOptions=[],
    checkboxOptions=[],
    cascaderOptions=[],
    ...restProps
  }: IField) => {
    placeholder = placeholder ? placeholder : (componentName === 'Select' ? '请选择' : '请输入' );
    switch(componentName) {
      case 'Input':
        return (<Input placeholder={placeholder} {...restProps}></Input>);
      case 'Select':
          return (<Select {...restProps}  placeholder={placeholder}>
            {
              Array.isArray(selectOptions)
              ? selectOptions.map(option => (<Select.Option key={option.key} value={option.value}>
                {option.label}
              </Select.Option>))
              : selectOptions.list.map(option => (<Select.Option key={option[selectOptions.key]} value={option[selectOptions.value]}>
                {option[selectOptions.label]}
              </Select.Option>))
            }
          </Select>);
      case 'Checkbox':
        return (<Checkbox.Group options={checkboxOptions} {...restProps} />);
      case 'Cascader':
        return (<Cascader placeholder={placeholder} options={cascaderOptions} {...restProps} />);
      default:
        return null;
    }
  };
  const renderFormItem = (field: IField) => (
    <Form.Item
      name={field.key}
      label={field.label}
      rules={[
        {
          required: field.required || false,
          message: field.message || `${field.label}为必须项`
        },
      ]}
    >
      {getField(field)}
    </Form.Item>
  );
  const getFields = (allValues?: any) => {
    return formFields.map((field, index) => {
      const type = typeof field.type === 'undefined' ? 'formItem' : 'custom';
      const key = field.key || index;
      const span = field.span || (onSearch ? 8 : 24)
      // 控制显示
      // allValues = allValues || form.getFieldsValue();
      // if (typeof field.show !== 'undefined') {
      //   if (typeof field.show === 'string' && !allValues[field.show]) {
      //     return null;
      //   } else if (typeof field.show === 'function' && !field.show(allValues)) {
      //     return null;
      //   } else if (typeof field.show === 'object') {
      //     if (_.find([allValues], field.show)) {
      //       return <div>隐藏掉</div>;
      //     }
      //   }
      // }
      // 判断类型是表单类型 | 用户自定义类型
      if (type === 'custom') {
        if (typeof field.component !== 'undefined') {
          return (
            <Col span={span} key={key}>
              {field.component}
            </Col>
          );
        }
        return null;
      }
      return (
        <Col span={span} key={key}>
          {renderFormItem(field)}
        </Col>
      );
    })
  };
  // 执行查询
  const search = async () => {
    const values = await form.validateFields();
    onSearch && onSearch(values);
  };
  // 执行重置
  const reset = () => {
    form.resetFields();
    onSearch && onSearch({});
  };
  // 解决新增和详情共用的时候数据未清空的bug
  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const formValuesChange = (changeValues: any, allValues: any) => {
    // 根据改变的数据，控制表单联动 field.show {gender: 1}
    console.log('changeValues', changeValues);
    console.log('allValues', allValues);
  };
  return (
    <Form 
      form={form} 
      initialValues={initialValues} 
      labelCol={labelCol} 
      wrapperCol={wrapperCol}
      onValuesChange={formValuesChange}
      {...restProps}
    >
      <Row gutter={24}>{getFields()}</Row>
      {
        onSearch && (
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={search}>
                {searchText}
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={reset}
              >
                {resetText}
              </Button>
            </Col>
          </Row>
        )
      }
    </Form>
  );
}

export default FormTemp;