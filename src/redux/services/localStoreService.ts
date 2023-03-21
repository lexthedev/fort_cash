import { IPayload, localStoreDataType } from "../models/localStorePayload";

export abstract class LocalStoreService {

    private static storeName = 'data-store'

    /**
     * GetStore
     * @param none
     */
    private static GetStore(): { [s in localStoreDataType]: Object | Object[] } | undefined {
        if (typeof window !== 'undefined') {
            const storeString = localStorage.getItem(this.storeName);
            return JSON.parse(storeString as string);
        }
    }

    /**
     * SaveToStore
     */
    public static SaveToStore(payload: IPayload) {
        const { name, data } = payload;
        const currentStore = this.GetStore();
        const newStore = { ...currentStore, [name]: data };
        localStorage.setItem(this.storeName, JSON.stringify(newStore));
    }

    /**
     * GetFromStore
     */
    public static GetFromStore(name: localStoreDataType): any | any[] {
        // public static GetFromStore(name: localStoreDataType): Object | Object[] | null {
        const currentStore = this.GetStore();
        if (!!currentStore && currentStore.hasOwnProperty(name)) {
            return currentStore[name];
        } else {
            return null;
        }
    }
}