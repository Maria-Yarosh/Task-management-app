import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAuthError, selectAuthStatus } from "../model/selectors";
import { loginUser } from "../model/thunks";
import { AuthSchema } from "../../../shared/lib/validation/auth";
import type z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";


type LoginFormData = z.infer<typeof AuthSchema>

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(AuthSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      console.log('Успешный вход:', resultAction.payload);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <Input
        type="email"
        label="Email"
        placeholder="Введите ваш email"
        error={errors.email}
        {...register('email')}
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        error={errors.password}
        {...register('password')}
      />

      <Button
        type="submit"
        disabled={!isValid || isSubmitting || status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? 'Вход...' : 'Войти'}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};