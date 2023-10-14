// import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
//
// import { NoticesService } from '../../api/generated';
// import { uriPaths } from '../../constants/uriPaths';
//
// export const useDeleteNotice = () => {
//   const navigate = useNavigate();
//
//   const useMutationResult = useMutation({
//     mutationFn: (noticeId: string) => NoticesService.deleteNotice(noticeId),
//     onSuccess: () => {
//       navigate(uriPaths.DATA_ENRICHMENT);
//     },
//   });
//
//   const { mutate: deleteNotice } = useMutationResult;
//
//   return { deleteNotice };
// };
