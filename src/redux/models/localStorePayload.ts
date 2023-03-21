export type localStoreDataType = 'categories' | 'transactions'

export interface IPayload {
    name: localStoreDataType;
    data: Object;
}