import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

export function UseLogin() {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_LOGIN,
    queryKey: 'login',
    showSuccessToast: false,
  });
}
