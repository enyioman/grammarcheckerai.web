import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useLogin = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_LOGIN,
    queryKey: 'login',
    showSuccessToast: false,
  });
};

const login = useLogin();

login.mutateAsync({
  email: '',
  password: '',
});
export default useLogin;
