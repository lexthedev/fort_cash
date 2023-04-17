import { ICategory } from "./category";

export interface ICategoryList {
    categories: ICategory[];
    selected?: string;
    onClick: (category: ICategory) => void;
}