import { transferTypes } from "@/constants/transferTypes";

export interface ICategoryCreateForm {
    creatingCategory?: transferTypes;
    onClose: () => void;
}