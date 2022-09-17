import { Link } from "react-router-dom";
import successImg from '../../assets/img/success.svg'
import '../../scss/app.scss';

export const Success = () => {
  return (
    <div className="success-block">
      <img src={successImg} alt="Success" />
      <h3>Оплата прошла успешно!</h3>
      <Link to='/'>
        <button className="button button--outline button--add go-back-btn">Назад</button>
      </Link>
    </div>
  );
};