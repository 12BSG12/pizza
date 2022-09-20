import { FC } from 'react';
import '../../../scss/app.scss';
import { LoginForm } from './LoginForm';
import { LoginProps } from './ILogin';

export const Login:FC<LoginProps> = ({onClick}) => {
  return (
    <div>
      <h2 className="modal__title">Login</h2>
      <LoginForm />
      <h5 className='modal__bottom' onClick={() => onClick(false)}>Create new account</h5>
    </div>
  )
}
