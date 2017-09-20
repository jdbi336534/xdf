import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon } from 'antd'
import queryString from 'query-string'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import TablePlate from 'components/plate/tableplate';
import ConfirmModel from 'components/ConfirmModal/confirm'
import styles from './list.less'

const confirm = Modal.confirm

const List = ({location,onAdd,onEditItem,onDeleteItem,onReset, ...tableProps,confirmProp}) => {
    location.query = queryString.parse(location.search)
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          width:'15%'
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width:'15%'
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width:'20%',
            render: (text,record) => ('992042912@qq.com')
        },
        {
          title: '学科组',
          dataIndex: 'subject',
          key: 'subject',
          width:'15%'
        }, {
          title: '职位',
          dataIndex: 'role',
          key: 'role',
          width:'15%',
          render: (text,record) => {
            if(String(text)==='0'){
              return '助理主管';
            } else {
              return '主管';
            }
          }
        },  
         {
          title: '操作',
          key: 'operation',
          width:'20%',
          render: (text,record) => (<div><a href="javascript:;" onClick={()=>onReset(record)}>重置密码</a><a href="javascript:;" style={{marginLeft:10}} onClick={()=>onEditItem(record)}>修改</a> <a href="javascript:;" style={{marginLeft:10}} onClick={()=>onDeleteItem(record)}>删除</a></div>),
        },
      ]
    const getBodyWrapperProps = {
        page: location.query.page,
        current: tableProps.pagination.current,
      }
    
    const getBodyWrapper = (body) => { return  <AnimTableBody {...getBodyWrapperProps} body={body} /> }
    
    return (
    <div>
       <TablePlate title="用户列表">
       <div className={styles.add_plate}>
             <a href="javascript:;" onClick={onAdd}><Icon type="plus" />新增用户</a>
            </div>
        <Table
          {...tableProps}
          className={classnames({ [styles.table]: true })}
         
          scroll={{ y: true }}
          columns={columns}
          size='small'
          rowKey={record => record._id}
          getBodyWrapper={getBodyWrapper}
        />
        </TablePlate>
        <ConfirmModel {...confirmProp}/>
    </div>
    );
}

List.propTypes = {
    onAdd: PropTypes.func,
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onReset:PropTypes.func,
    location: PropTypes.object,
  }

  export default List
