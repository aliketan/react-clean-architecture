import { useMutation } from "@tanstack/react-query";
import type { PostRepository } from "../../../data/repositories/PostRepository";
import logService from "../../services/LogService";
import notificationService from "../../services/NotificationService";
import { handleApiResponse } from "../../../shared/utils/results/ResponseHandler";
import type { AddPostDto } from "../../../domain/dtos/AddPostDto";
import { Mapper } from "../../../domain/mappers/DtoToEntityMapper";
import type { Post } from "../../../domain/entities/Post";

export const useAddPostMutation = (repository: PostRepository) => {
  const logger = logService();
  const notify = notificationService();

  const result = useMutation({
    mutationFn: (item:AddPostDto) => repository.add(Mapper<Post, AddPostDto>(item)),
    onSuccess: (res) => {
      handleApiResponse({ status: res.status, response: res.response }, () => {
          notify.success(res.response);
        }, () => {
          notify.error(res.response);
        })
    },
    onError: (err) => {
      logger.error(err.message);
    },
  });
  
  return result;
};