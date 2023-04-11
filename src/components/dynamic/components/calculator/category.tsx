import { ICategory } from "@/components/interfaces/category"
import { Icons } from "../../../../../public/static/img/categories";

interface ICategoryElement extends ICategory {
    onClick?: () => void;
}

export function Category(props: ICategoryElement) {
    const { title, picture, onClick } = props;
    return <div onClick={!!onClick ? onClick : undefined}>
        {Icons[picture as keyof typeof Icons]({ className: 'styles.icon', viewBox: '0 0 50 50' })}
        <div>{title}</div>
    </div>
}