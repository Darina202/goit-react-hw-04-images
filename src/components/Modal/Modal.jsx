import styles from './modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ url, closeModal }) => {
  const closeThisModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeThisModal);
    return () => document.removeEventListener('keydown', closeThisModal);
  }, []);

  return createPortal(
    <div onClick={closeThisModal} className={styles.overlay}>
      <div className={styles.modal}>
        <img src={url} alt={url} width="800" height="600" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
