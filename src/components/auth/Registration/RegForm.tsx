import { useForm } from 'react-hook-form';
import { FormType } from './FormType';
import styles from '../Login/LoginForm.module.scss';
import '../../../scss/app.scss';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useSetUserMutation } from '../../../redux';

export const RegForm = () => {
  const [ setUser ] = useSetUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: 'onBlur' });
  const onSubmit = (data: FormType) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.Email, data.Password)
      .then(({user}) => {
        setUser({
          id: user.uid,
          email: user.email,
          token: user.refreshToken,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Your name..." {...register('Name', {})} />
      <input
        type="text"
        placeholder="Your email..."
        {...register('Email', { pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i })}
      />
      <input type="password" placeholder="Your password..." {...register('Password', {})} />
      <button className="button" type="submit">
        Send
      </button>
    </form>
  );
};
