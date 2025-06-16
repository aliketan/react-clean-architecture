import type { IEntity } from "../contracts/IEntity";

export interface Todo extends IEntity {
    userId: number;
    title: string;
    completed: boolean;
}