import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon } from 'antd'
import queryString from 'query-string'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import TablePlate from 'components/plate/tableplate';
import styles from './List.less'

const List = ({location, ...tableProps}) => {
    location.query = queryString.parse(location.search)

    const columns = [
        {
          title: '助理主管',
          dataIndex: 'name',
          key: 'name',
          width:'8%'
        }, {
          title: '学科组',
          dataIndex: 'subject',
          key: 'subject',
          width:'8%'
        }, {
          title: '本月预排',
          dataIndex: 'prescheduling',
          key: 'prescheduling',
          width:'8%',
          render: (text,record) => (<span>{text+'%'}</span>),
        }, {
          title: '本月结转',
          dataIndex: 'carryover',
          key: 'carryover',
          width:'8%',
          render: (text,record) => (<span>{text+'%'}</span>),
        }, {
          title: 'Q1预排',
          dataIndex: 'Q1prescheduling',
          key: 'Q1prescheduling',
          width:'8%',
          render: (text,record) => (<span>{text+'%'}</span>),
        }, {
          title: 'Q1结转',
          dataIndex: 'Q1carryover',
          key: 'Q1carryover',
          width:'8%',
          render: (text,record) => (<span>{text+'%'}</span>),
        }, {
          title: '预排速度',
          dataIndex: 'prespeed',
          key: 'prespeed',
          width:'8%',
          render: (text,record) => {
            if(text==='fast'){
              return (<span style={{color:'green'}}>较快</span>);
            } else if(text==='slow'){
              return (<span style={{color:'red'}}>较慢</span>);
            } else {
              return (<span>正常</span>);
            }
          }
        }, {
          title: '结转速度',
          dataIndex: 'speed',
          key: 'speed',
          width:'8%',
          render: (text,record) => {
            if(text==='fast'){
              return (<span style={{color:'green'}}>较快</span>);
            } else if(text==='slow'){
              return (<span style={{color:'red'}}>较慢</span>);
            } else {
              return (<span>正常</span>);
            }
          }
        }, {
          title: '教研情况',
          dataIndex: 'isresearch',
          key: 'isresearch',
          width:'8%',
          render: (text,record) => (<span>{text==='true'?'已教研':'未教研'}</span>),
        }, {
          title: '时间',
          dataIndex: 'create_time',
          key: 'create_time',
          width:'16%',
          render: (text,record) => {return moment(text).format('YYYY-MM-DD hh:mm:ss');},
        }, 
         {
          title: '操作',
          key: 'operation',
          width:'12%',
          render: (text,record) => (<div><Link to={`datareport/${record._id}`}>查看</Link> <a href="javascript:;" style={{marginLeft:10}}>删除</a></div>),
        },
      ]
    const getBodyWrapperProps = {
        page: location.query.page,
        current: tableProps.pagination.current,
      }
    
      const getBodyWrapper = (body) => { return  <AnimTableBody {...getBodyWrapperProps} body={body} /> }
    
    return (
    <div>
       <TablePlate title="汇报列表">
       <div className={styles.add_plate}>
             <a><Icon type="plus" />新增汇报</a>
            </div>
        <Table
          {...tableProps}
          className={classnames({ [styles.table]: true })}
         
          scroll={{ y: 'calc(100vh - 338px)' }}
          columns={columns}
          size='small'
          rowKey={record => record._id}
          getBodyWrapper={getBodyWrapper}
        />
        </TablePlate>
    </div>
    );
}

List.propTypes = {
    // onDeleteItem: PropTypes.func,
    // onEditItem: PropTypes.func,
    location: PropTypes.object,
  }

  export default List
