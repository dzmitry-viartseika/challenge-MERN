// import { useMutation } from '@tanstack/react-query';
// import { UseFormReset } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
//
// import {
//   FutureTenderGroupSaveDto,
//   FutureTendersService,
//   NoticeViewDto,
// } from '../../api/generated';
// import { ApiError } from '../../api/generated/core/ApiError';
// import { Messages } from '../../app/components/Messages/Messages';
// import { displayModeNotice } from '../../constants/displayModeNotice';
// import { routes } from '../../constants/routes';
// import { useMessage } from '../../context/MessageContext';
// import useTranslationDAEN from '../../i18n/useTranslation';
// import { futureTendersErrors } from '../../ts/enums/futureTendersErrors';
//
// interface IProps {
//   reset: UseFormReset<FutureTenderGroupSaveDto>;
// }
//
// export const useCreateFutureTender = ({ reset }: IProps) => {
//   const { t } = useTranslationDAEN();
//   const { showMessageTopLevel, showMessageBottomLevel } = useMessage();
//
//   const navigate = useNavigate();
//
//   const mutationResult = useMutation<
//     NoticeViewDto[],
//     ApiError,
//     FutureTenderGroupSaveDto
//   >({
//     mutationFn: (newNotice) =>
//       FutureTendersService.createFutureTenders(newNotice),
//
//     onSuccess: (data) => {
//       showMessageTopLevel(
//         Messages.createSuccessfulMessage(
//           t('alertMessages.noticeSavedSuccessfully')
//         )
//       );
//
//       navigate(
//         `${routes.DATA_ENRICHMENT}/future-tender/${data[0].organizationId}?mode=${displayModeNotice.VIEW}`
//       );
//       reset();
//     },
//     onError: (error) => {
//       if (futureTendersErrors.BUDGET_TITLES_NOT_UNIQUE === error.body?.code) {
//         showMessageBottomLevel(
//           Messages.createErrorMessage(t('alertMessages.notUniqueBudgetTitles'))
//         );
//       } else {
//         // any other unexpected and not covered error case which user can't fix
//         navigate(routes.ERROR_BAD_REQUEST);
//       }
//     },
//   });
//   const { mutate: saveFutureTenders } = mutationResult;
//
//   return { saveFutureTenders };
// };
