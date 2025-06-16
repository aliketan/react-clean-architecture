import type { IEntity } from "../contracts/IEntity";
import type { Comment } from "./Comment";

export interface Post extends IEntity {
    userId: number;
    title: string;
    body: string;
    comment:Comment[]
}