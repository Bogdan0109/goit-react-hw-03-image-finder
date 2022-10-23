import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeydown);
  }

  onCloseModal = () => {
    this.props.onClose();
  };

  handlerKeydown = e => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.onCloseModal}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
