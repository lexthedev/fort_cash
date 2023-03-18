import { CreateCategory, DynamicBody, DynamicHead, Popup } from "@/components"
import { transferTypes } from "@/constants/transferTypes";
import { useAppSelector } from "@/redux"
import { useState } from "react";
import styles from "./styles/categories.module.scss"

export default function Categories() {

    const { income, outcome } = useAppSelector(state => state.categoryReducer.categories);
    const [creatingCategory, setCreatingCategory] = useState<transferTypes | boolean>(false);

    const content = (
        <div className={styles.content}>
            <h3>income</h3>
            <div>
                {income.map(cat => <div>{cat.title}</div>)}
                <button onClick={() => setCreatingCategory(transferTypes.income)}>add new</button>
            </div>
            <h3>outcome</h3>
            <div>
                {outcome.map(cat => <div>{cat.title}</div>)}
                <button onClick={() => setCreatingCategory(transferTypes.outcome)}>add new</button>
            </div>
        </div>);

    return <>
        <DynamicHead />
        <DynamicBody>
            {content}
        </DynamicBody>
        {creatingCategory &&
            <Popup
                onClose={() => setCreatingCategory(false)}
                title={`New ${creatingCategory} category`}>
                <CreateCategory
                    creatingCategory={!!creatingCategory ? creatingCategory as transferTypes : undefined}
                    onClose={() => setCreatingCategory(false)} />
            </Popup>}
    </>
}