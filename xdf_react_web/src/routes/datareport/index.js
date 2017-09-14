import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import Searchform from './search'
import List from './List'

const Datareport = ({location, dispatch, datareport, loading }) => {
    location.query = queryString.parse(location.search);
    const { list, pagination} = datareport;
    const { pageSize } = pagination;
    const listProps = {
        dataSource: list,
        loading: loading.effects['datareport/reportlist'],
        pagination,
        location,
        onChange (page) {
          const { query, pathname } = location
          console.log('1',pagination,JSON.stringify(location,null,4));
          dispatch(routerRedux.push({
            pathname,
            query: {
              ...query,
              page: page.current,
              pageSize: page.pageSize,
            },
          }));
          console.log('2',pagination,JSON.stringify(location,null,4));
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

Datareport.propTypes = {
  datareport: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }

  export default connect(({ datareport, loading }) => ({ datareport, loading }))(Datareport)
