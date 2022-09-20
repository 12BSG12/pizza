import { FC, useState } from 'react';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { AuthProps } from './IAuth';
import { Login } from './Login/Login';
import { Registration } from './Registration/Registration';

export const Auth: FC<AuthProps> = ({ openPay, closePayForm }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <ModalWindow open={openPay} closeModalWindow={closePayForm}>
      {isLogin ? <Login onClick={setIsLogin} /> : <Registration onClick={setIsLogin} />}
    </ModalWindow>
  );
};
