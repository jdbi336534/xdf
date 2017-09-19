import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import Searchform from './search'
import List from './list'
import Modal from './modal'
const User = ({location, dispatch, user, loading }) => {
    location.query = queryString.parse(location.search);
    const { list, pagination,modalVisible,modalType,subject,currentItem,visibleSure} = user;
    const { pageSize } = pagination;
    const listProps = {
        dataSource: list,
        loading: loading.effects['user/query'],
        pagination,
        location,
        confirmProp:{
          title:'提示',
          confirmLoading:loading.effects[`user/${modalType}`],
          subtitle:modalType === 'reset' ?'确认要重置用户密码吗？':'确认要删除吗？',
          exp:modalType === 'reset' ?'重置后，密码将不可回退':'删除后将不可恢复',
          visibleSure,
          wrapClassName: 'vertical-center-modal',
          handleCancel(){
            dispatch({type:'user/Change',payload:{visibleSure:false}})
          },
          confirm(){
            if(modalType==='delete'){
              dispatch({
              type: 'user/delete'
              })
            }else{
              dispatch({
                type: 'user/reset'
                })
            }
          },
        },
        onChange (page) {
          const { query, pathname } = location
          dispatch(routerRedux.push({
            pathname,
            query: {
              ...query,
              page: page.current,
              pageSize: page.pageSize,
            },
          }));
        },
        onAdd(){
            dispatch({
                type: 'user/showModal',
                payload: {
                  modalType: 'create',
                },
              })
        },
        onEditItem(record){
          dispatch({
            type: 'user/showModal',
            payload: {
              modalType: 'update',
              currentItem: record
            },
          })
        },
        onDeleteItem(record){
          // 在确认弹窗关闭的时候让列表出现加载
          dispatch({
            type:'user/Change',
            payload:{
              modalType: 'delete',
              visibleSure:true,
              currentItem: record
            }
          })
        },
        onReset(record){
          dispatch({
            type:'user/Change',
            payload:{
              modalType: 'reset',
              visibleSure:true,
              currentItem: record
            }
          })
          // dispatch({
          //   type: 'user/reset',
          //   payload: {
          //     id:record._id,
          //     name:record.name,
          //     username:record.username,
          //     address:record.email
          //   },
          // })
        }
    }
    
    const searchProps={
        subject,
        searchData(data){

        }
    }

    

    const modalProps = {
        subject,
        item: modalType === 'create' ? {} : {...currentItem,role:String(currentItem.role)},
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects[`user/${modalType}`],
        title: `${modalType === 'create' ? '新增用户' : '修改用户'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `user/${modalType}`,
            payload:data,
          })
        },
        onCancel () {
          dispatch({
            type: 'user/hideModal',
          })
        },
    }

    return (
      <Page inner>
        <Searchform {...searchProps}/>
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    );
}

User.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
     loading: PropTypes.object,
  }

  export default connect(({ user, loading }) => ({ user, loading }))(User)
