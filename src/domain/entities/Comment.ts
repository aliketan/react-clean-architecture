import type { IEntity } from "../contracts/IEntity";

export interface Comment extends IEntity {
    postId: number;
    name: string;
    email: string;
    body: string;
}