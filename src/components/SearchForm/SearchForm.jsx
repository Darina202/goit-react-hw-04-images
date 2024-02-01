import styles from './search-form.module.css';
import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getPictures } from '../../api/pictures';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class SearchForm extends Component {
  state = {
    pictures: [],
    query: '',
    isLoading: false,
    error: null,
    page: 1,
    modalOpen: false,
    largeImage: null,
    hiddenLoadMoreBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query && (query !== prevState.query || page !== prevState.page)) {
      this.setState({
        isLoading: true,
      });
      try {
        const { data } = await getPictures(query, page);
        this.setState(({ pictures }) => ({
          pictures: data.hits?.length ? [...pictures, ...data.hits] : pictures,
        }));

        if (page < Math.ceil(data.totalHits / 12)) {
          this.setState(() => ({
            hiddenLoadMoreBtn: true,
          }));
        } else {
          this.setState(() => ({
            hiddenLoadMoreBtn: false,
          }));
        }
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSearch = ({ query }) => {
    this.setState({
      query,
      pictures: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showModal = url => {
    this.setState({
      modalOpen: true,
      largeImage: url,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      picturesDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const {
      pictures,
      error,
      isLoading,
      modalOpen,
      largeImage,
      hiddenLoadMoreBtn,
    } = this.state;
    const pictureAre = Boolean(pictures.length);
    return (
      <>
        <Searchbar onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && (
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
        {pictureAre && hiddenLoadMoreBtn && (
          <Button type="button" onClick={loadMore}>
            Load more
          </Button>
        )}
        {modalOpen && <Modal url={largeImage} closeModal={closeModal} />}
      </>
    );
  }
}

export default SearchForm;
