/**
 * 原则：支持 antd 的全部属性
 */
import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import SearchForm from './components/form';
import Table from './components/table';
import Modal from './components/modal';
import { message } from 'antd';
import { IForm } from './types/form.interface';
import { ITable } from './types/table.interface';
import { IFormModal } from './types/modal.interface';

type openType = 'page' | 'modal'; // 打开新增 | 编辑 | 查看的方式

interface ITemp {
  search?: IForm;
  table?: ITable;
  modal?: IFormModal;
  request?: {
    callListApi?: (params: object) => {list: object[], total: number};
    callDeleteApi?: (dataSource: object) => {};
    callSaveApi?: (params: object, dataSource?: object) => {};
  },
  openType?: openType;
  pushRouter?: (row: object) => void;
};

const Template: FC<ITemp> = ({search, table, modal, request, openType='modal', pushRouter}) => {
  /**
   * 所有的请求和内部状态管理在父组件处理
   * 不要通过ref的方式获取子组件的实例
   */
  const [listLoading, setListLoading] = useState(false); // table 加载的loading
  const [saveLoading, setSaveLoading] = useState(false); // 保存按钮加载的loading
  const [modalVisible, setModalVisible] = useState(false); // 控制弹窗显示
  const [detailData, setDetailData] = useState({}); // 选中的数据
  const [current, setCurrent] = useState(1); // 页码
  const [pageSize, setPageSize] = useState(10); // 每页条数
  const [conditions, setCondition] = useState({}); // 查询条件
  const [list, setList] = useState<object[]>();
  const [total, setTotal] = useState(0);
  /**
   * 获取列表数据
   * 后台列表页必须要分页
   * @param conditions 查询条件
   * @returns {void}
   */
  const getList = (argCurrent?: number, argPageSize?: number, argConditions?: object) => {
    try {
      setListLoading(true);
      const params = {
        ...(argConditions || conditions),
        current: argCurrent || current,
        pageSize: argPageSize || pageSize,
      };
      if (request?.callListApi) {
        const res = request.callListApi({...params});
        setList(res.list);
        setTotal(res.total);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setListLoading(false);
    }
  };

  /**
   * 切换分页
   */
  const changePagination = (current: number, pageSize?: number) => {
    setCurrent(current);
    pageSize && setPageSize(pageSize);
    getList(current, pageSize);
  };

  /**
   * 根据查询条件获取列表，包括重置操作
   * @param conditions 查询条件
   * @returns {void}
   */
  const searchData = (conditions: object) => {
    // 搜索重置时页码改为第 1 页
    setCondition(conditions);
    setCurrent(1);
    getList(1, pageSize, conditions);
  };

  /**
   * mounted 获取 table 数据
   */
  useEffect(() => {
    getList();
  }, [])

  /**
   * 显示弹窗或打开新的页面
   * 获取当前的数据
   */
  const showModal = (row?: object) => {
    const type = openType ? openType : 'modal';
    if (type === 'modal') {
      if (typeof row === 'undefined') {
        setDetailData({});
      } else {
        setDetailData(row);
      }
    } else if (type === 'page') {
      // 打开新的页面
      row && pushRouter && pushRouter(row);
    }
    setModalVisible(true);
  };

  /**
   * 取消显示数据
   */
  const closeModal = (form: any) => {
    setModalVisible(false);
    form.resetFields();
  };

  /**
   * 保存数据
   */
  const saveFields = async (form: any, values: object, dataSource?: object) => {
    setSaveLoading(true);
    try {
      if (request?.callSaveApi) {
        if (typeof dataSource !== 'undefined') {
          await request.callSaveApi({...values}, {...dataSource});
        } else {
          await request.callSaveApi({...values});
        }
        message.success('保存成功');
        closeModal(form);
        getList(1, pageSize);
      }
    } catch (err) {
      console.log('err ==', err);
      message.error(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="form-main-wrapper">
      {
        search &&
        <SearchForm
          onSearch={searchData}
          {...search}
        />
      }
      {
        table &&
        <Table
          onAdd={() => showModal()}
          loading={listLoading}
          onView={(row) => showModal(row)}
          onEdit={(row) => showModal(row)}
          dataSource={list}
          pagination={{
            current, pageSize, total, onChange: changePagination
          }}
          {...table}
        />
      }
      {
        modal &&
        <Modal
          width={800}
          formFields={modal.formFields}
          loading={saveLoading} 
          visible={modalVisible}
          initialValues={detailData}
          ok={saveFields}
          cancel={closeModal}
          {...modal}
        />
      }
    </div>
  );
};
export default Template;