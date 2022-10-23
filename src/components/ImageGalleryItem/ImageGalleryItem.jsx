import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import './ImageGalleryItem.scss';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { largeImageURL, webformatURL } = this.props;
    const { showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="asdasdasdasd"
          onClick={this.toggleModal}
        />
      </>
    );
  }
}
