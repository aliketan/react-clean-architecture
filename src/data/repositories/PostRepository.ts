import type { Post } from "../../domain/entities/Post";
import type { IPostRepository } from "../../domain/repositories/IPostRepository";
import type { IDataResult } from "../../shared/types/IDataResult";
import type { IDialogResult } from "../../shared/types/IDialogResult";
import type { PostDataSource } from "../datasources/PostDataSource";


export class PostRepository implements IPostRepository {

    datasource: PostDataSource;

    constructor(datasource: PostDataSource) {
        this.datasource = datasource;
    }
    
    async getAll(): Promise<Post[]> {
        return await this.datasource.getAll();
    }

    async getById(id: number): Promise<Post> {
        return await this.datasource.getById(id);
    }

    async add(item: Post): Promise<IDataResult<Post>> {
        return await this.datasource.add(item);
    }

    async update(item: Post): Promise<IDataResult<Post>> {
        return await this.datasource.update(item);
    }

    async delete(id:number): Promise<IDialogResult> {
        return await this.datasource.delete(id);
    }

}