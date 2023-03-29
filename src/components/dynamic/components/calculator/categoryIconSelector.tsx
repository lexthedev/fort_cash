import { ICategoryIconSelector } from "@/components";
import { Icons } from "../../../../../public/static/img/categories";
import styles from "../../styles/categoryIconSelector.module.scss"

export default function CategoryIconSelector(props: ICategoryIconSelector) {

    const { selected, onSelect } = props;
    function handleSelect(src: string) {
        onSelect(src);
    }

    return <div >
        select icon below:&nbsp;
        <div className={styles.iconSelector}>
            <div className={styles.iconSet}>
                {Icons.map(({ src }) => {
                    return (
                        <div
                            className={`${styles.icon} ${selected === src ? styles.selected : ''}`}
                            key={src}
                            onClick={() => handleSelect(src)}
                        >
                            <img src={src} />
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
}