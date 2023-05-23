import { EditCategory, DynamicBody, DynamicHead, ICategory, Popup, Category, CategoryList, IPopup } from "@/components"
import { transferTypes } from "@/constants/transferTypes";
import useShowAsPopup from "@/hooks/useShowAsPopup";
import { useAppDispatch, useAppSelector } from "@/redux"
import { useEffect, useState } from "react";
// import * as categoryLogos from "../../public/static/img/categories/SVG"
import styles from "./styles/categories.module.scss"

export default function Categories() {

    // const { addPopup } = useShowAsPopup();
    const { addPopup, popups } = useShowAsPopup();

    const { income, outcome } = useAppSelector(state => state.categoryReducer.categories);

    function showPopup(type: transferTypes, category?: ICategory) {
        const title = category ? `Edit category ${(category as ICategory)?.title}` : `New ${type} category`

        const popup: IPopup = {
            title: title,
            children: <EditCategory
                type={type}
                category={category} />
        }
        addPopup(popup);
    }
    function editCategory(category: ICategory) {
        console.log(category);

        showPopup(category.type, category)
    }

    const content = (
        <div className={styles.content}>
            <div className={styles.title}>
                <h3 className={styles.header}>income</h3>
                <div className={styles.add} onClick={() => showPopup(transferTypes.income)}>+</div>
            </div>
            <div>
                {<CategoryList categories={income} onClick={editCategory} />}
            </div>
            <div className={styles.title}>
                <h3 className={styles.header}>outcome</h3>
                <div className={styles.add} onClick={() => showPopup(transferTypes.outcome)}>+</div>
            </div>
            <div>
                {<CategoryList categories={outcome} onClick={editCategory} />}
            </div>
        </div>);


    return <>
        <DynamicHead />
        <DynamicBody popups={popups}>
            {content}
        </DynamicBody>
    </>
}