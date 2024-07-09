import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { ModalBlock } from '../../../components/ModalBlock';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@material-ui/lab/Alert';
import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';

import { LoadingStatus } from '../../../store/types';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}
export interface RegisterFormProps {
  email: string;
  fullname: string;
  username: string;
  password: string;
  password2: string;
}
const RegisterFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Введите почту'),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required('Введите пароль'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
  username: yup.string().required('Введите логин'),
  fullname: yup.string().required('Введите ваше имя'),
});

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });
  const dispatch = useDispatch();
  const openNotificationRef = React.useRef<(text: string, type: Color) => void>(
    () => {},
  );
  const loadingStatus = useSelector(selectUserStatus);
  const onSubmit = async (data: RegisterFormProps) => {
    dispatch(fetchSignUp(data));
  };
  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      openNotificationRef?.current('Регистрация успешна', 'success');
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      openNotificationRef?.current('Произошла ошибка', 'error');
    }
  }, [loadingStatus]);
  return (
    <ModalBlock
      onClose={onClose}
      visible={open}
      title={'Создайте учетную запись'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="email"
                  label="E-mail"
                  type="email"
                  name="email"
                  value={value}
                  fullWidth
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{ shrink: true }}
                  variant="filled"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="username"
                  name="username"
                  label="Логин"
                  type="text"
                  value={value}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  variant="filled"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="fullname"
                  name="fullname"
                  label="Ваше имя"
                  type="text"
                  value={value}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
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
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="password"
                  label="Пароль"
                  type="password"
                  fullWidth
                  variant="filled"
                  name="password"
                  value={value}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onChange={onChange}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <Controller
              name="password2"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ marginBottom: '25px' }}
                  margin="dense"
                  id="password2"
                  label="Повторите пароль"
                  type="password"
                  fullWidth
                  variant="filled"
                  name="password2"
                  value={value}
                  error={!!errors.password2}
                  helperText={errors.password2?.message}
                  onChange={onChange}
                  InputLabelProps={{ shrink: true }}
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
              Зарегистрироваться
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
};
