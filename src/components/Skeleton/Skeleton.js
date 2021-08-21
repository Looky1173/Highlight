import classNames from 'classnames';

import styles from './Skeleton.module.css';

console.log(styles)

const Skeleton = ({ type, margin, style }) => {
	const skeletonClasses = classNames({
		[styles.skeleton]: true,
		[styles['skeleton-header']]: type === 'header' ? true : false,
		[styles['skeleton-noMargin']]: margin === 'none' ? true : false,
	});

	//styles.skeleton = [styles.skeleton, ...extraStyles]

	return <p className={skeletonClasses} style={style}></p>;
};

export default Skeleton;
