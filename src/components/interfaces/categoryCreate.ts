import { transferTypes } from "@/constants/transferTypes";
import { ICategory } from "./category";

export interface ICategoryCreateForm {
    type?: transferTypes;
    category?: ICategory;
    onClose?: () => void;
}