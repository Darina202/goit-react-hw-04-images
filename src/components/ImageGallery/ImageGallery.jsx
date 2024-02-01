import styles from './image-gallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showModal }) => {
  return (
    <ul className={styles.gallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} showModal={showModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
