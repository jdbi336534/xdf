import React from 'react'
import PropTypes from 'prop-types'
import styles from './plate.less';


function Plate({title,children}) {

	return(

		<div className={styles.ant_plan}>
        	<div className={styles.ant_plan_top}>{title}</div>
        	<div className={styles.ant_plan_btm}>
        	{children}
        	</div>
        	
        </div>
			
		);
}

export default Plate;