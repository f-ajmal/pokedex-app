export interface ICapturedContext {
    capturedList: string[];
    capturePokemon: (pokemon: string) => void;
    releasePokemon: (pokemon: string) => void;
};

export interface IPokemon {
    name: string,
    id: number,
    image: string,
    types: string[],
    stats: { [key: string]: number }
}