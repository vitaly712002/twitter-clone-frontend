import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { ModalBlock } from '../../../components/ModalBlock';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { Color } from '@material-ui/lab/Alert';
import { fetchSignIn } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
export interface LoginFormProps {
  email: string;
  password: string;
}
const LoginFormSchema = yup.object().shape({
  email: yup.string().required('Введите почту'),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required('Введите пароль'),
});

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(LoginFormSchema),
  });
  const dispatch = useDispatch();
  const openNotificationRef = React.useRef<(text: string, type: Color) => void>(
    () => {},
  );
  const loadingStatus = useSelector(selectUserStatus);
  const onSubmit = async (data: LoginFormProps) => {
    dispatch(fetchSignIn(data));
  };
  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      openNotificationRef?.current('Авторизация прошла успешно', 'success');
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      openNotificationRef?.current('Неверный логин или пароль', 'error');
    }
  }, [loadingStatus]);
  return (
    <ModalBlock onClose={onClose} visible={open} title={'Войти в Твиттер'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  name="email"
                  autoFocus
                  value={value}
                  margin="dense"
                  id="email"
                  label="Логин или email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{ shrink: true }}
                  variant="filled"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  name="password"
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="password"
                  label="Пароль"
                  type="password"
                  fullWidth
                  variant="filled"
                />
              )}
            />
            <Button
              disabled={loadingStatus === LoadingStatus.LOADING}
              style={{ marginBottom: '20px' }}
              fullWidth
              variant="contained"
              type="submit"
              color="primary">
              Войти
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
};
