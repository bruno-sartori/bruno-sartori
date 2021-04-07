export const validateLoginForm = (values: ILoginFormFields) => {
  const errors: any = {};

  if (!values.userName)
    errors.userName = 'Campo obrigatório!';

  if (!values.password) {
    errors.password = 'Campo obrigatório';
  } else if (values.password.length < 8) {
    errors.password = 'Senha precisa ter pelo menos 8 dígitos!'
  }

  return errors;
}
