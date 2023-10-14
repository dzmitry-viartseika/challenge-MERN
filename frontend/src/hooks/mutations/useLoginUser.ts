import {routes} from "constants/routes";
import {useNavigate} from "react-router-dom";
import UserService from "services/UserService";

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useCreateFutureTender = () => {
  // const { showMessageTopLevel, showMessageBottomLevel } = useMessage();

  const navigate = useNavigate();

  const mutationResult = useMutation<
    NoticeViewDto[],
    ApiError,
    FutureTenderGroupSaveDto
  >({
    mutationFn: (userData) =>
      UserService.loginUser(userData),

    onSuccess: (data) => {
      // showMessageTopLevel(
      //   Messages.createSuccessfulMessage(
      //     t('alertMessages.noticeSavedSuccessfully')
      //   )
      // );
      //
      // navigate(
      //   `${routes.DATA_ENRICHMENT}/future-tender/${data[0].organizationId}?mode=${displayModeNotice.VIEW}`
      // );
      // reset();

      navigate('/dashboard');
    },
    onError: (error) => {
      // if (futureTendersErrors.BUDGET_TITLES_NOT_UNIQUE === error.body?.code) {
      //   showMessageBottomLevel(
      //     Messages.createErrorMessage(t('alertMessages.notUniqueBudgetTitles'))
      //   );
      // } else {
      //   navigate(routes.HOME);
      // }
      navigate('/login');
    },
  });
  const { mutate: loginUser } = mutationResult;

  return { loginUser };
};