import type { Post } from "../../domain/entities/Post";
import api from "../../infrastructure/network/client/axios-client";
import { API_ENDPOINTS } from "../../shared/constants/EndPointConst";
import logService from "../../infrastructure/services/LogService";
import type { IDataResult } from "../../shared/types/IDataResult";
import { RESPONSE_STATUS } from "../../shared/utils/enums/ResponseStatus";
import type { IDialogResult } from "../../shared/types/IDialogResult";

export class PostDataSource {

    private logger = logService();

    async getAll(): Promise<Post[]> {
        const res = api.get(API_ENDPOINTS.POSTS);
        return res.then(response => {
            return response as Post[];
        }).catch(err => {
            this.logger.error("Error fetching posts", err);
            return Promise.reject(err);
        });
    }

    async getById(id:number): Promise<Post> {
        const res = api.get(`${API_ENDPOINTS.POSTS}/${id}`);
        return res.then(response => {
            return response as Post;
        }).catch(err => {
            this.logger.error("Error fetching post", err);
            return Promise.reject(err);
        });
    }

    async add(item:Post): Promise<IDataResult<Post>> {
        const res = api.post(API_ENDPOINTS.POSTS, item);
        return res.then(response => {
            return {
                status: RESPONSE_STATUS.SUCCESS,
                response: "",
                exception: "",
                data: [response as Post]
            };
        }).catch(err => {
            this.logger.error("Error creating post", err);
            return Promise.reject(err);
        });
    }

    async update(item:Post): Promise<IDataResult<Post>> {
        const res = api.put(API_ENDPOINTS.POSTS, item);
        return res.then(response => {
            return {
                status: RESPONSE_STATUS.SUCCESS,
                response: "",
                exception: "",
                data: [response as Post]
            };
        }).catch(err => {
            this.logger.error("Error updating post", err);
            return Promise.reject(err);
        });
    }

    async delete(id:number): Promise<IDialogResult> {
        const res = api.del(`${API_ENDPOINTS.POSTS}/${id}`);
        return res.then(() => {
            return {
                status: RESPONSE_STATUS.SUCCESS,
                response: "Post has been deleted." 
            };
        }).catch(err => {
            this.logger.error(`Error deleting post: ${id}`, err);
            return Promise.reject(err);
        });
    }
}