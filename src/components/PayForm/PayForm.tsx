import { useForm } from 'react-hook-form';
import { PayFormType } from './PayFormType';
import '../../scss/app.scss';

export const PayForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PayFormType>({ mode: 'onBlur' });
  const onSubmit = (data: PayFormType) => console.log(data);
  console.log(errors);

  return (
    <form  className="pay" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="ФИО"
        {...register('FIO', {
          required: true,
          pattern: { value: /^[A-Z]+ [A-Z]+ ?[A-Z]+$/i, message: 'некорректный ввод данных' },
        })}
      />
      <input
        type="tel"
        placeholder="Номер телефона"
        {...register('PhoneNumber', {
          required: true,
          pattern: { value: /^((\+7|7|8)+([0-9]){10})$/i, message: 'некорректный ввод данных' },
        })}
      />
      <input
        type="text"
        placeholder="Номер карты"
        {...register('CardNumber', {
          required: true,
          pattern: { value: /[0-9]{13,16}/i, message: 'некорректный ввод данных' },
        })}
      />
      <input
        type="text"
        placeholder="Дата"
        {...register('CartDate', {
          required: true,
          maxLength: {
            value: 4,
            message: 'некорректный ввод данных',
          },
          pattern: /^[1-9]+[0-9]*$/i
        })}
      />
      {errors?.CartDate && <p>{errors?.CartDate.message}</p>}
      <input
        type="text"
        placeholder="Код"
        {...register('Code', {
          required: true,
          maxLength: {
            value: 3,
            message: 'некорректный ввод данных',
          },
        })}
      />
      {errors?.Code && <p>{errors?.Code.message}</p>}
      {!isValid && <div>Все поля обязательны для заполнения!</div>}
      <button className='button pay-btn' type="submit" disabled={!isValid}>
        Оплатить
      </button>
    </form>
  );
};
