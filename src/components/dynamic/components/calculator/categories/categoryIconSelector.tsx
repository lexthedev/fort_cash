import { ICategoryIconSelector } from "@/components";
import { Icons } from "../../../../../../public/static/img/categories";
import styles from "@/components/dynamic/styles/category/categoryIconSelector.module.scss"
import React from 'react';

export default function CategoryIconSelector(props: ICategoryIconSelector) {

    const { selected, onSelect } = props;
    function handleSelect(src: string) {
        onSelect(src);
    }

    return <div >
        select icon below:&nbsp;
        <div className={styles.iconSelector}>
            <div className={styles.iconSet}>
                {Object.keys(Icons).map((icon: string) => {
                    return (
                        <div
                            className={`${styles.icon} ${selected === icon ? styles.selected : ''}`}
                            key={icon}
                            onClick={() => handleSelect(icon)}
                        >
                            {Icons[icon as keyof typeof Icons]({ className: styles.icon, viewBox: '0 0 60 60' })}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
}
