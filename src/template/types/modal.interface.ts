import { ModalProps } from 'antd/lib/modal';
import { IField } from './form.interface';

export interface IFormModal extends ModalProps {
  formFields: IField[];
}

export interface IFormActionModal extends IFormModal {
  loading: boolean;
  initialValues: object;
  cancel: (form: any) => void;
  ok: (form: any, values: object, dataSource?: object) => void;
}
