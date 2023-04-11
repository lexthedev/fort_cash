import { CreateCategory, EditCategory, DynamicBody, DynamicHead, ICategory, Popup, Category } from "@/components"
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
            <h3>income</h3>
            <div>
                {income.map(cat => <Category key={cat.title} onClick={() => { setEditingCategory(cat) }} {...cat} />)}
                <button onClick={() => setCreatingCategory(transferTypes.income)}>add new</button>
            </div>
            <h3>outcome</h3>
            <div>
                {outcome.map(cat => <Category key={cat.title} onClick={() => { setEditingCategory(cat) }} {...cat} />)}
                <button onClick={() => setCreatingCategory(transferTypes.outcome)}>add new</button>
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
                onClose={() => setCreatingCategory(false)}
                title={title}>
                <EditCategory
                    editingCategory={!!editingCategory ? editingCategory as ICategory : undefined}
                    onClose={() => setEditingCategory(false)} />
            </Popup>}
    </>
}