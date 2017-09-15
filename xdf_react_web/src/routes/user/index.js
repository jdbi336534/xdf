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
    const { list, pagination,modalVisible,modalType,subject} = user;
    const { pageSize } = pagination;
    const listProps = {
        dataSource: list,
        loading: loading.effects['user/query'],
        pagination,
        location,
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
        }
    }
    
    const searchProps={
        subject,
        searchData(data){

        }
    }

    const modalProps = {
        subject,
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        confirmLoading: loading.effects[`user/${modalType}`],
        title: `${modalType === 'create' ? '新增用户' : '修改用户'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `user/${modalType}`,
            payload: data,
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
