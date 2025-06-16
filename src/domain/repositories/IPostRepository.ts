import type { IDataResult } from "../../shared/types/IDataResult";
import type { IDialogResult } from "../../shared/types/IDialogResult";
import type { Post } from "../entities/Post";

export interface IPostRepository {
    getAll():Promise<Post[]>;
    getById(id:number):Promise<Post>;
    add(item:Post):Promise<IDataResult<Post>>;
    update(item:Post):Promise<IDataResult<Post>>;
    delete(id:number):Promise<IDialogResult>;
}