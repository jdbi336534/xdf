import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { message } from 'antd';
import { routerRedux } from 'dva/router'
import Savesuccess from 'components/Savesuccess/'
import Reportform from './form'

const Createreport = ({location, dispatch, createreport, loading }) => {
    const { report, visibleSave, excelpath } = createreport;
    
    const reportProps={
        Loading:loading.effects['createreport/commit'],
        report,
        reportData(data){
          if(excelpath===''){
            message.warning('请上传四折标课后再保存!');
            return;
          }
          dispatch({
            type:'createreport/commit',
            payload:{...data,excelpath}
          });
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
        },
        isChange(val){
          console.log(val);
          if(val === 'true') {
            dispatch({
              type:'createreport/Change',
              payload:{
                report:true
              }
            });
          } else {
            dispatch({
              type:'createreport/Change',
              payload:{
                report:false
              }
            });
          }
        },
        getExcelData(res){
        console.log(res);
        if(res.code===200){
          dispatch({
            type:'createreport/Change',
            payload:{
              exceldata:res.data,
              excelpath:res.filepath
            }
          });
        }
        },
        deleteExcel(path){

        }
    }


    const modalProps={
      content:'保存成功！',
        visibleSave,
        handleOk(){
         dispatch({
           type:'createreport/hideModal',
           payload:{
            exceldata:[],
            excelpath:''
           }
          });
         dispatch(routerRedux.push('/datareport'));
        }
    }
    

    
    return (
      <Page inner>
        <Reportform {...reportProps}/>
        {visibleSave && <Savesuccess {...modalProps}/>}
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
