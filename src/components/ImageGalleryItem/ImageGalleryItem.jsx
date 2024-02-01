import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, showModal }) => {
  return (
    <li
      className={styles.galleryItem}
      onClick={() => {
        showModal(largeImageURL);
      }}
    >
      <img className={styles.galleryItemImage} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
