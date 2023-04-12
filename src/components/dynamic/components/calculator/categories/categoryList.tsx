import { Category, ICategoryList } from "@/components"
import styles from '../../../styles/categoryList.module.scss'

export function CategoryList(props: ICategoryList) {

    const { categories, onClick } = props;
    return <div className={styles.categoryList}>
        {categories.map(cat => {
            const { id, title, picture } = cat;
            return <Category
                key={`${id}_${title}`}
                onClick={() => { onClick(cat); }}
                title={title}
                picture={picture} />
        })}
    </div>
}