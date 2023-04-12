import { Icons } from "../../../../../../public/static/img/categories";
import styles from "../../../styles/category.module.scss";

interface ICategoryElement {
    title: string;
    picture: string;
    onClick?: () => void;
}

export function Category(props: ICategoryElement) {
    const { title, picture, onClick } = props;
    return <div className={styles.category} onClick={!!onClick ? onClick : undefined}>
        {Icons[picture as keyof typeof Icons]({ className: styles.icon, viewBox: '0 0 60 60' })}
        <div className={styles.title}>{title}</div>
    </div>
}