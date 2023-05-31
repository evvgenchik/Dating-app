import {
  AiFillHeart as HeartIcon,
  AiFillStar as StarIcon,
} from 'react-icons/ai';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';

import styles from './PanelControl.module.scss';

function PanelControl() {
  return (
    <div className={styles.panelControl}>
      <CloseIcon className={styles.reject} />
      <StarIcon className={styles.star} />
      <HeartIcon className={styles.heart} />
    </div>
  );
}

export default PanelControl;
