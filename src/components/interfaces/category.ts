import { transferTypes } from "@/constants/transferTypes";

export interface ICategory {
    id?:string;
    title: string,
    type: transferTypes,
    picture: string,
}