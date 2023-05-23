import { ReactNode } from "react";
import { IPopup } from "..";

export interface IDynamicBody {
    children: ReactNode;
    popups?: IPopup[];
}