import { useMutation } from "@tanstack/react-query";
import type { PostRepository } from "../../../data/repositories/PostRepository";
import logService from "../../services/LogService";
import notificationService from "../../services/NotificationService";
import { handleApiResponse } from "../../../shared/utils/results/ResponseHandler";

export const useDeletePostMutation = (repository: PostRepository) => {
  const logger = logService();
  const notify = notificationService();

  const result = useMutation({
    mutationFn: (id:number) => repository.delete(id),
    onSuccess: (res) => {
      handleApiResponse({ status: res.status, response: res.response }, () => {
          notify.success(res.response);
        }, () => {
          notify.error(res.response);
        })

    },
     onError: (err) => {
      logger.error(err.message);
    }
  });

  return result;
};