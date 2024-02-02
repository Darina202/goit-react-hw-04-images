import styles from './search-form.module.css';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getPictures } from '../../api/pictures';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const SearchForm = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [hiddenBtn, setHiddenBtn] = useState(false);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setLoading(true);
        const { data } = await getPictures(query, page);
        setPictures(prevPictures =>
          data.hits?.length ? [...prevPictures, ...data.hits] : prevPictures
        );
        if (page < Math.ceil(data.totalHits / 12)) {
          setHiddenBtn(true);
        } else {
          setHiddenBtn(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchPictures();
    }
  }, [query, page]);

  const handleSearch = ({ query }) => {
    setQuery(query);
    setPictures([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const showModal = url => {
    setModalOpen(true);
    setLargeImage(url);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImage(null);
  };

  const pictureAre = Boolean(pictures.length);
  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && (
        <ThreeDots
          visible={true}
          height="150"
          width="200"
          color="#2dd6c5"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ marginLeft: '40%' }}
        />
      )}
      {pictureAre && <ImageGallery items={pictures} showModal={showModal} />}
      {pictureAre && hiddenBtn && (
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      )}
      {modalOpen && <Modal url={largeImage} closeModal={closeModal} />}
    </>
  );
};

export default SearchForm;
