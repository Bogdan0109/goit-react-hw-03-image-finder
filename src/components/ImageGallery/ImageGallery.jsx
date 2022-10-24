import './ImageGallery.scss';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className="ImageGallery">
      {photos.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className="ImageGalleryItem">
            <ImageGalleryItem
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
};
