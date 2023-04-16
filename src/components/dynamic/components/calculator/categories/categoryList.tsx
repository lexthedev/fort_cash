import { Category, ICategoryList } from "@/components"
import styles from '@/components/dynamic/styles/category/categoryList.module.scss'

export function CategoryList(props: ICategoryList) {

    const { categories, onClick } = props;
    return <div className={styles.categoryList}>
        {categories.map(cat => {
            const { id, title, picture } = cat;
            return <Category
                key={`${id}`}
                onClick={() => { onClick(cat); }}
                title={title}
                picture={picture} />
        })}
    </div>
}