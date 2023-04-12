import { CreateCategory, EditCategory, DynamicBody, DynamicHead, ICategory, Popup, Category, CategoryList } from "@/components"
import { transferTypes } from "@/constants/transferTypes";
import { useAppDispatch, useAppSelector } from "@/redux"
import { useEffect, useState } from "react";
// import * as categoryLogos from "../../public/static/img/categories/SVG"
import styles from "./styles/categories.module.scss"

export default function Categories() {

    const { income, outcome } = useAppSelector(state => state.categoryReducer.categories);
    // const { setCategories } = categorySlice.actions;
    // const dispatch = useAppDispatch();
    const [creatingCategory, setCreatingCategory] = useState<transferTypes | boolean>(false);
    const [editingCategory, setEditingCategory] = useState<ICategory | boolean>(false);
    // useEffect(()=>{
    //     dispatch(setCategories(LocalStoreService.GetFromStore('categories')));
    // },[])

    const content = (
        <div className={styles.content}>
            <div className={styles.title}>
                <h3 className={styles.header}>income</h3>
                <div className={styles.add} onClick={() => setCreatingCategory(transferTypes.income)}>+</div>
            </div>
            <div>
                {<CategoryList categories={income} onClick={setEditingCategory} />}
                {/* <button onClick={() => setCreatingCategory(transferTypes.income)}>add new</button> */}
            </div>
            <div className={styles.title}>
                <h3 className={styles.header}>outcome</h3>
                <div className={styles.add} onClick={() => setCreatingCategory(transferTypes.outcome)}>+</div>
            </div>
            <div>
                {<CategoryList categories={outcome} onClick={setEditingCategory} />}
                {/* <button onClick={() => setCreatingCategory(transferTypes.outcome)}>add new</button> */}
            </div>
        </div>);

    const title = creatingCategory ? `New ${creatingCategory} category` : `Edit category ${(editingCategory as ICategory)?.title}`

    return <>
        <DynamicHead />
        <DynamicBody>
            {content}
        </DynamicBody>
        {creatingCategory &&
            <Popup
                onClose={() => setCreatingCategory(false)}
                title={title}>
                <CreateCategory
                    creatingCategory={!!creatingCategory ? creatingCategory as transferTypes : undefined}
                    onClose={() => setCreatingCategory(false)} />
            </Popup>}
        {editingCategory &&
            <Popup
                onClose={() => setEditingCategory(false)}
                title={title}>
                <EditCategory
                    editingCategory={!!editingCategory ? editingCategory as ICategory : undefined}
                    onClose={() => setEditingCategory(false)} />
            </Popup>}
    </>
}