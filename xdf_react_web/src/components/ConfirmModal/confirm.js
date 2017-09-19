import React from 'react'
import PropTypes from 'prop-types'
import styles from './confirm.less';
import { Button,Modal } from 'antd';

const ConfirmModel = ({
	visibleSure,
  handleCancel,
  confirm,
  confirmLoading,
  title,
  subtitle,
  exp,
  wrapClassName
}) => {
	return(
   
        <Modal title={title}
          visible={visibleSure}
          onOk={confirm}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
          closable={false}
          maskClosable={false}
          className={styles.modal}
          wrapClassName={wrapClassName}
        >
         <p className={styles.titlecenter}><b><i className={styles.scimg}></i>{subtitle}</b></p>
         <p className={styles.center}>{exp}</p>
        </Modal>
        
		    );
}

ConfirmModel.propTypes = {
  confirm:PropTypes.func,
  handleCancel:PropTypes.func,
  visibleSure: PropTypes.bool,
  confirmLoading:PropTypes.bool,
  title:PropTypes.string,
  subtitle:PropTypes.string,
  exp:PropTypes.string
};

export default ConfirmModel;