import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../../domain/entities/Post";
import type { PostRepository } from "../../../data/repositories/PostRepository";

export const usePostQueryById = (respository:PostRepository, id:number) => {

    const STORAGE_KEY =  `post-${id}`;
    
    const { data, isLoading } = useQuery<Post>({
        queryKey: [STORAGE_KEY],
        queryFn: () => respository.getById(id)
    });

    return {
        data: data,
        isLoading:isLoading
    };
};