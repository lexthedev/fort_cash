import { Icons } from "../../../../../../public/static/img/categories";
import styles from "@/components/dynamic/styles/category/category.module.scss";

interface ICategoryElement {
    title: string;
    picture: string;
    selected?: boolean;
    onClick?: () => void;
}

export function Category(props: ICategoryElement) {
    const { title, picture, selected, onClick } = props;
    return <div
        className={`${styles.category} ${selected && styles.selected}`}
        onClick={!!onClick ? onClick : undefined}>
        {!!picture && Icons[picture as keyof typeof Icons]({ className: styles.icon, viewBox: '0 0 60 60' })}
        <div className={styles.title}>{title}</div>
    </div>
}