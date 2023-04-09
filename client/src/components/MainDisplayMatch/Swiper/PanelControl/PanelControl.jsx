import styles from './PanelControl.module.scss';
import { AiOutlineCloseCircle as RejectIcon } from 'react-icons/ai';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { AiFillStar as StarIcon } from 'react-icons/ai';

const PanelControl = () => {
  return (
    <div className={styles.panelControl}>
      <CloseIcon className={styles.reject} />
      <StarIcon className={styles.star} />
      <HeartIcon className={styles.heart} />
    </div>
  );
};

export default PanelControl;
