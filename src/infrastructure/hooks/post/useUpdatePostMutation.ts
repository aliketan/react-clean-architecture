import { useMutation } from "@tanstack/react-query";
import type { PostRepository } from "../../../data/repositories/PostRepository";
import logService from "../../services/LogService";
import notificationService from "../../services/NotificationService";
import { handleApiResponse } from "../../../shared/utils/results/ResponseHandler";
import type { UpdatePostDto } from "../../../domain/dtos/UpdatePostDto";
import { Mapper } from "../../../domain/mappers/DtoToEntityMapper";
import type { Post } from "../../../domain/entities/Post";

export const useUpdatePostMutation = (repository: PostRepository) => {
  const logger = logService();
  const notify = notificationService();

  const result = useMutation({
    mutationFn: (item:UpdatePostDto) => repository.update(Mapper<Post, UpdatePostDto>(item)),
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