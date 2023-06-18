import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import styles from "./LayoutHeader.module.scss";
import imgBg from "../../assets/svg_planet.svg";

export const LayoutHeader = ({ children }) => {
    return <div className={styles.layout_header_container}>
        <div className={styles.layout_container}>
            <img src={imgBg} className={styles.img_bg}/>
            <Navbar />
            {children}
        </div>
        <Footer />
    </div>
}