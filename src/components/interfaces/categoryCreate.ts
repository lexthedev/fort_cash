import { transferTypes } from "@/constants/transferTypes";
import { ICategory } from "./category";

export interface ICategoryCreateForm {
    creatingCategory?: transferTypes;
    editingCategory?: ICategory;
    onClose: () => void;
}