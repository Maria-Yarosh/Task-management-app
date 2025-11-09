import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectRegisterError, selectRegisterLoading } from "../model/selectors";
import { registerUser } from "../model/thunks";
import { AuthSchema } from "../../../shared/lib/validation/auth";

export const RegisterForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorValidate, setErrorValidate] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectRegisterLoading)
  const error = useAppSelector(selectRegisterError)

  const resetState = () => {
    setEmail("")
    setPassword("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = AuthSchema.safeParse({ email, password })
    if (!result.success) {
      const firstIssue = result.error.issues[0]
      setErrorValidate(firstIssue.message)
      return
    }

    setErrorValidate(null)

    const resultAction = await dispatch(registerUser({ email, password }))

    if (registerUser.fulfilled.match(resultAction)) {
      console.log("Успешно:", resultAction.payload)
      resetState()
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Введите ваш email"
      />
      <input
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </button>

      {(errorValidate || error) && <p>{errorValidate || error}</p>}
    </form>
  )
}