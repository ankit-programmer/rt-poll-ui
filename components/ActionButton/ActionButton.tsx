import Button from '@mui/material/Button';
import styles from './ActionButton.module.css';
import { BiShare } from 'react-icons/bi';
import { CircularProgress } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
type ActionButtonProps = {
    progress: boolean,
    [key: string]: any
};

const MainActionButton = (props: ActionButtonProps) => {
    const { progress = false, message = "SHARE", icon } = props;
    return (
        <>
            <Button style={{
                background: 'linear-gradient(135deg, #5651e5 0%, #709dff 100%)',
                color: '#fff',
                borderRadius: '999px',
                fontSize: '17px',
                fontWeight: 700,
                fontFamily: 'inherit',
                padding: '10px 28px',
                letterSpacing: '3px'
            }} onClick={props?.onClick} disabled={progress} className={styles.PrimaryActionButton} endIcon={
                progress ? <CircularProgress style={{ color: '#fff' }} size="1.5rem" /> : icon || <BiShare style={{
                    transform: 'scaleX(-1)',
                    opacity: '90%'
                }} size="1.4rem" />

            }>
                {message}
            </Button>
        </>
    )
}

export default MainActionButton;