import type { IEntity } from "../contracts/IEntity";
import type { Photo } from "./Photo";

export interface Album extends IEntity {
    userId: number;
    title: string;
    photo:Photo[]
}