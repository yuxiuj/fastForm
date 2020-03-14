import React, { FC } from 'react';
import { Modal, Form } from 'antd';
import FormTemplate from './form';
import { IFormActionModal } from '../types/modal.interface';


const ModalTemplate: FC<IFormActionModal> = ({
  title='请输入标题', 
  visible, 
  formFields, 
  children, 
  loading=false, 
  maskClosable=false, 
  keyboard=false,
  initialValues,
  ok,
  cancel,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const onOk = async () => {
    const values = await form.validateFields();
    if (formFields) {
      ok(form, values, initialValues);
    } else {
      ok(form, values);
    }
  };
  return (
    <div>
      <Modal
        title={title}
        visible={visible}
        okText="保存"
        cancelText="取消"
        onOk={onOk}
        maskClosable={false}
        keyboard={false}
        onCancel={() => cancel(form)}
        okButtonProps={{
          ...restProps.okButtonProps,
          loading,
        }}
        {...restProps}
      >
        <FormTemplate form={form} formFields={formFields} initialValues={initialValues} />
      </Modal>
    </div>
  );
};

export default ModalTemplate;
