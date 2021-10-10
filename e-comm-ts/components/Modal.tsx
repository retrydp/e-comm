import React from 'react';
import classNames from 'classnames';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ success, payload, onClose }): JSX.Element => {
  const wrapper = React.createRef<HTMLDivElement>();

  /**
   * Close modal window, according to click out of modal window, or pressing "close" button.
   * @param {MouseEvent} event
   */
  const closeHandler = (event: MouseEvent): void => {
    ![...event['path']].includes(wrapper.current) && onClose();
  };

  React.useEffect(() => {
    document.body.addEventListener('click', closeHandler);
    return () => document.body.removeEventListener('click', closeHandler);
  }, []);

  return (
    <div className="modal">
      <div className="modal__wrapper" ref={wrapper}>
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
              {payload.map((errorItem) => (
                <li key={errorItem}>{errorItem}</li>
              ))}
            </ul>
          ) : (
            payload
          )}
        </div>
        <button className="modal__btn" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Modal;
