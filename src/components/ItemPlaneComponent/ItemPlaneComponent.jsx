import styles from "./ItemPlaneComponent.module.scss";
import planeIcon from "../../assets/plane.png";

export const ItemPlaneComponent = () => {
    return(
        <>
            <div className={styles.item_plane_container}>
                <img src={planeIcon}/>
            </div>
        </>
    );
}