import { transferTypes } from "@/constants/transferTypes";

export interface ICategory {
    title: string,
    type: transferTypes,
    picture?: string,
}