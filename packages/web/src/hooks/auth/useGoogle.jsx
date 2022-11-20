import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useGoogle = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_INITIATE_GOOGLE,
    queryKey: 'google',
    showSuccessToast: false,
  });
};

export default useGoogle;