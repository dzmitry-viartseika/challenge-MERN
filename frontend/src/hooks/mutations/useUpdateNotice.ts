// import { useMutation } from '@tanstack/react-query';
// import { useNavigate, useParams } from 'react-router-dom';
//
// import {
//   NoticeSaveDto,
//   NoticesService,
//   NoticeViewDto,
// } from '../../api/generated';
// import { ApiError } from '../../api/generated/core/ApiError';
// import { Messages } from '../../app/components/Messages/Messages';
// import { displayModeNotice } from '../../constants/displayModeNotice';
// import { routes } from '../../constants/routes';
// import { useMessage } from '../../context/MessageContext';
// import useTranslationDAEN from '../../i18n/useTranslation';
//
// export const useUpdateNotice = () => {
//   const noticeId = useParams()['noticeId'] || '';
//
//   const { showMessageTopLevel } = useMessage();
//   const navigate = useNavigate();
//   const { t } = useTranslationDAEN();
//
//   const resultMutate = useMutation<NoticeViewDto, ApiError, NoticeSaveDto>({
//     mutationFn: (formData) =>
//       NoticesService.updateNoticeById(noticeId, formData),
//     onSuccess: (data) => {
//       showMessageTopLevel(
//         Messages.createSuccessfulMessage(
//           t('alertMessages.noticeUpdatedSuccessfully')
//         )
//       );
//
//       navigate(
//         `${routes.DATA_ENRICHMENT}/${data.noticeId}?mode=${displayModeNotice.VIEW}`
//       );
//     },
//   });
//
//   const { mutate: updateNotice } = resultMutate;
//
//   return { updateNotice, noticeId };
// };
