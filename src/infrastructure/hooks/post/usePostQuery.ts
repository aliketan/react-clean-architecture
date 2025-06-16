import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../../domain/entities/Post";
import type { PostRepository } from "../../../data/repositories/PostRepository";

export const usePostQuery = (respository:PostRepository) => {

    const STORAGE_KEY =  "posts";
    
    const { data, isLoading } = useQuery<Post[]>({
        queryKey: [STORAGE_KEY],
        queryFn: () => respository.getAll()
    });

    return {
        data: data || [],
        isLoading:isLoading
    };
};