import { Navbar } from "../Navbar/Navbar";
import styles from "./LayoutHeader.module.scss";

export const LayoutHeader = ({children}) => {
    return <div className={styles.layout_header_container}>
        <Navbar/>
        {children}
    </div>
}