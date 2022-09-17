import { useForm } from 'react-hook-form';
import { PayFormType } from './PayFormType';
import '../../scss/app.scss';
import { Success } from './Success';

export const PayForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<PayFormType>({ mode: 'onChange' });
  const onSubmit = (data: PayFormType) => console.log(data);
  console.log(errors);

  return (
    <>
      {!isSubmitSuccessful ? (
        <form className="pay" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="ФИО"
              {...register('FIO', {
                required: true,
                pattern: /^[A-Z]+ [A-Z]+ ?[A-Z]+$/i,
              })}
            />
            {errors?.FIO && <p>некорректный ввод</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Номер телефона"
              {...register('PhoneNumber', {
                required: true,
                pattern: /^((\+7|7|8)+([0-9]){10})$/i,
              })}
            />
            {errors?.PhoneNumber && <p>некорректный ввод</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Номер карты"
              {...register('CardNumber', {
                required: true,
                pattern: /[0-9]{13,16}/i,
              })}
            />
            {errors?.CardNumber && <p>некорректный ввод</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Дата"
              {...register('CartDate', {
                required: true,
                maxLength: {
                  value: 4,
                  message: 'максимальная длина 4 цифры',
                },
                pattern: /^[1-9]+[0-9]*$/i,
              })}
            />
            {errors?.CartDate && <p>{errors?.CartDate.message}</p>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Код"
              {...register('Code', {
                required: true,
                maxLength: {
                  value: 3,
                  message: 'максимальная длинна 3 цифры',
                },
              })}
            />
            {errors?.Code && <p>{errors?.Code.message}</p>}
          </div>
          <button className="button pay-btn" type="submit" disabled={!isValid}>
            Оплатить
          </button>
        </form>
      ) : (
        <Success />
      )}
    </>
  );
};
