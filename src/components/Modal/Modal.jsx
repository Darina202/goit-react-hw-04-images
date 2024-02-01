import styles from './modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeThisModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeThisModal);
  }

  closeThisModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeThisModal } = this;
    return createPortal(
      <div onClick={closeThisModal} className={styles.overlay}>
        <div className={styles.modal}>
          <img src={this.props.url} alt={this.props.url} width="800" height="600" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
