import '../../scss/app.scss';
import { FC } from 'react';

interface ModalWindowProps {
  open: boolean,
  closeModalWindow: () => void,
  children: React.ReactNode
}

export const ModalWindow: FC<ModalWindowProps> = ({open, closeModalWindow, children }) => {
  const show = open ? 'show': '';
  return(
    <div className={`overlay animated ${show}`}>
      <div className="modal">
        <svg height="200" viewBox="0 0 200 200" width="200" onClick={closeModalWindow}>
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        {children} 
      </div>
    </div>
  );
}