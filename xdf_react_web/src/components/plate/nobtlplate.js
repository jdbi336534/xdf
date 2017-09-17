import React from 'react'
import PropTypes from 'prop-types'
import styles from './nobtlplate.less';


function Nobtlplate({title,children}) {

	return(

		<div className={styles.ant_plan}>
        	<div className={styles.ant_plan_top}>{title}</div>
        	{children}
        </div>
			
		);
}

export default Nobtlplate;