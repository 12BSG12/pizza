import { FC } from 'react';
import '../../../scss/app.scss';
import { RegProps } from './IReg';
import { RegForm } from './RegForm';

export const Registration:FC<RegProps> = ({onClick}) => {
  return (
    <div>
      <h2 className="modal__title">Registration</h2>
      <RegForm />
      <h5 className='modal__bottom' onClick={() => onClick(true)}>Login</h5>
    </div>
  )
}