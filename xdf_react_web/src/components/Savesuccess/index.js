import React from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'antd';
import styles from './index.less';

const Savesuccess = ({
	content,
	visibleSave,
  handleOk
}) => {
	return(
        <Modal title={'提示'}
          visible={visibleSave}
          onOk={handleOk}
          footer={[
            <Button key="submit" type="primary" size="large"  onClick={() => handleOk()}>
              确定
            </Button>
          ]}
          closable={false}
          maskClosable={false}
          className={styles.modal}
          wrapClassName="vertical-center-modal"
        >
        <p className={styles.titlecenter}>
           <b><i className={styles.scimg}></i>{content}</b>
        </p>
        </Modal>
		    );
}

Savesuccess.propTypes = {
  makeSure:PropTypes.func,
  handleCancel:PropTypes.func,
  visibleSure: PropTypes.bool
};

export default Savesuccess;