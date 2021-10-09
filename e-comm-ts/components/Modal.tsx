import React from 'react';
import classNames from 'classnames';

interface ModalProps {
  success: boolean;
  payload: string | string[];
  modalVisible: boolean;
}

const Modal: React.FC<ModalProps> = ({ success, payload }): JSX.Element => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div
          className={classNames({
            'modal__img-success': success,
            'modal__img-warning': !success,
          })}
        ></div>
        <h2 className="modal__header">{success ? 'Success' : 'Validation failed'}</h2>
        <div className="modal__text">
          {Array.isArray(payload) ? (
            <ul className="modal__list">
              {payload.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          ) : (
            payload
          )}
        </div>
        <button className="modal__btn">Back</button>
      </div>
    </div>
  );
};

export default Modal;
