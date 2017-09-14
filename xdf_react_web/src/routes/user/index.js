import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import Searchform from './search'
import List from './list'
const User = ({location, dispatch, user, loading }) => {
    location.query = queryString.parse(location.search);
    const { list, pagination} = user;
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
      }
    
      const searchProps={
        searchData(data){

        }
      }
    return (
      <Page inner>
        <Searchform {...searchProps}/>
        <List {...listProps} />
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
