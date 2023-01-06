import { Grid } from  'react-loader-spinner'
import styles from './Loader.module.css'

export function Loader() {
    return (
        <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass={styles.grid}
            visible={true}
        />
    )  
}  