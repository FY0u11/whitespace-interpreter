export interface IOperation {
    run (arg?: string | number, inputStream?: string | null): void | string
}
