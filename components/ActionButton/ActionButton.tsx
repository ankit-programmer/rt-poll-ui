import Button from '@mui/material/Button';
import styles from './ActionButton.module.css';
import { BiShare } from 'react-icons/bi';
import { CircularProgress } from '@mui/material';

type ActionButtonProps = {
    progress: boolean,
    [key: string]: any
};

const MainActionButton = (props: ActionButtonProps) => {
    const { progress = false } = props;
    return (
        <>
            <Button onClick={props?.onClick} disabled={progress} className={styles.PrimaryActionButton} endIcon={
                progress ? <CircularProgress size="2rem" /> : <BiShare style={{
                    transform: 'scaleX(-1)',
                    opacity: '50%'
                }} size="2rem" />

            }>
                SHARE
            </Button>
        </>
    )
}

export default MainActionButton;