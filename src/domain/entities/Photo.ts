import type { IEntity } from "../contracts/IEntity";

export interface Photo extends IEntity {
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}