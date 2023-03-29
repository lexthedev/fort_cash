export interface ICategoryIconSelector {
    onSelect: (src: string) => void;
    selected: string;
}