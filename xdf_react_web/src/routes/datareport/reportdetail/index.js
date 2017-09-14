import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Spin } from 'antd';
import moment from 'moment'
import Plate from 'components/plate/plate';
import styles from './index.less'

const Detail = ({ reportDetail,loading}) => {
  const { data } = reportDetail;
  const filesrc = [];
  const imgsrc = [];
//   for (let key in data) {
//     if ({}.hasOwnProperty.call(data, key)) {
//       content.push(<div key={key} className={styles.item}>
//         <div>{key}</div>
//         <div>{String(data[key])}</div>
//       </div>)
//     }
//   }
// const typesOption=types.map((item,key)=>{
//     return(
//      <Option key={key} value={item.value}>{item.label}</Option>
//    );
// });
try{
    if(data.filepath){
        for(let item of data.filepath){
            filesrc.push(
                <Col span={24} key={item}><a target="_blank" href={'http://localhost:3001'+item}>{item.split('/')[4]}</a></Col>
            )
        }
    }
    if(data.imgpath){
        for(let img of data.imgpath){
            imgsrc.push(
                <Col span={24} key={img}><img style={{width:'50%'}} src={'http://localhost:3001'+img}></img></Col>
            )
        }
    }
}catch(err){
    console.error(err.message);
}
  return (
    <Spin size="small" spinning={loading}>
    <div className="content-inner">
        <Plate title="汇报详情">
        <div className={styles.content}>
        <Row>
            <Col span={6}><span className={styles.weight}>姓名：</span>{data.name}</Col>
            <Col span={6}><span className={styles.weight}>用户名：</span>{data.username}</Col>
            <Col span={6}><span className={styles.weight}>学科组：</span>{data.subject}</Col>
            <Col span={6}><span className={styles.weight}>是否教研：</span>{data.isresearch==='true'?'已教研':'未教研'}</Col>
        </Row>
        <Row>
            <Col span={6}><span className={styles.weight}>本月预排完成率：</span>{data.prescheduling}%</Col>
            <Col span={6}><span className={styles.weight}>本月结转完成率：</span>{data.carryover}%</Col>
            <Col span={6}><span className={styles.weight}>Q1预排完成率：</span>{data.Q1prescheduling}%</Col>
            <Col span={6}><span className={styles.weight}>Q1结转完成率：</span>{data.Q1carryover}%</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>预排速度：</span>{data.prespeed==='fast'?'较快':data.prespeed==='normal'?'正常':'较慢'}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>结转速度：</span>{data.speed==='fast'?'较快':data.speed==='normal'?'正常':'较慢'}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>结转前五名：</span>{data.firstfive}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>结转后五名：</span>{data.lastfive}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>上周为增加预排采取的措施：</span>{data.takesteps}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>原因分析：</span>{data.reason}</Col>
        </Row>
        <Row>
            <Col span={24}><span className={styles.weight}>后续措施：</span>{data.takemeasures}</Col>
        </Row>
        
        <Row>
            <Col span={24}><span className={styles.weight}>其他工作详述：</span>{data.others}</Col>
        </Row>
        {
        data.isresearch==='false'?<Row><Col span={24}><span className={styles.weight}>未教研说明：</span>{data.notresearchreason}</Col></Row>
        :<Row><Col span={24}><span className={styles.weight}>已教研说明：</span>{data.researchexp}</Col></Row>
        }
        <Row>
        {data.filepath&&data.filepath.length>0?<Col span={24}><span className={styles.weight}>上传的附件(点击下载)：</span></Col>:''}
        {filesrc}
        {data.imgpath&&data.imgpath.length>0?<Col span={24}><span className={styles.weight}>上传的图片：</span></Col>:''}
        {imgsrc}
        </Row>
        </div>
        </Plate>
    </div>
    </Spin>
  )
}

Detail.propTypes = {
  userDetail: PropTypes.object,
}

export default connect(({ reportDetail, loading }) => ({ reportDetail, loading: loading.models.reportDetail }))(Detail)
