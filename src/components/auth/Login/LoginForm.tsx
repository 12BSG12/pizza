import { useForm } from 'react-hook-form';
import { FormType } from './FormType';
import styles from './LoginForm.module.scss';
import '../../../scss/app.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useSetUserMutation } from '../../../redux';

export const LoginForm = () => {
  const [ setUser ] = useSetUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: 'onBlur' });
  const onSubmit = (data: FormType) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.Email, data.Password)
      .then(({ user }) => {
        setUser({
          id: user.uid,
          email: user.email,
          token: user.refreshToken,
        });
        navigate('/cart');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Your email..."
        {...register('Email', { pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i })}
      />
      <input type="password" placeholder="Your password..." {...register('Password', {})} />
      <button className="button" type="submit">
        Login
      </button>
    </form>
  );
};
