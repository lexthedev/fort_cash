import { ICategory } from "./category";

export interface ICategoryList {
    categories: ICategory[];
    onClick: (category: ICategory) => void;
}