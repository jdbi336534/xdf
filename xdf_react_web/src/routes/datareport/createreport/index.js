import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import Reportform from './form'

const Createreport = ({location, dispatch, createreport, loading }) => {
    const { } = createreport;
    
    
    const reportProps={
        reportData(data){

        },
        getImagepathArr(imgarr){
          dispatch({
            type:'createreport/Change',
            payload:{
              imgpath:imgarr
            }
          });
        },
        getFilepathArr(filearr){
          dispatch({
            type:'createreport/Change',
            payload:{
              filepath:filearr
            }
          });
        },
        deleteImage(img){
          // 传入图片路径，调用删除图片或文件接口
        },
        deleteFile(file){
          // 传入图片路径，调用删除图片或文件接口
        }
    }

    

    
    return (
      <Page inner>
        <Reportform {...reportProps}/>
      </Page>
    );
}

Createreport.propTypes = {
    createreport: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }

  export default connect(({ createreport, loading }) => ({ createreport, loading }))(Createreport)
