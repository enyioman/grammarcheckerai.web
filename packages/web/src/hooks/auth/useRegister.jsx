import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useRegister = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_INITIATE_SIGNUP,
    queryKey: 'signup',
    showSuccessToast: false,
  });
};

export default useRegister;