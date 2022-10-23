import React, { Component } from 'react';
import './ImageGallery.scss';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { addMaterial } from 'services/Pixabay-api';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import scrollToNewImages from 'services/Scroll-to-new-images';

export class ImageGallery extends Component {
  state = {
    photos: [],
    page: 1,
    query: '',
    totalHits: null,
    endOfCollection: 0,
    isLoading: false,
    error: null,
    pageHight: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;

    if (newQuery === '') return;

    const { page: prevPage, pageHight: prevPageHight } = prevState;
    const { page: newPage, pageHight: newPageHight } = this.state;

    if (prevQuery !== newQuery) {
      this.setState({ photos: [], page: 1 });
    }

    if (newPageHight !== prevPageHight) {
      setTimeout(() => scrollToNewImages(newPageHight), 500);
    }

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ isLoading: true });

      try {
        const { hits, totalHits, endOfCollection } = await addMaterial(
          newQuery,
          newPage
        );

        setTimeout(() => {
          this.setState(prevState => ({
            photos: [...prevState.photos, ...hits],
            totalHits,
            endOfCollection,
            isLoading: false,
          }));
        }, 500);
      } catch (error) {
        this.setState({ error: 'Мы не смогли загрузить фото' });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      pageHight: document.body.scrollHeight,
    }));
  };

  render() {
    const { photos, endOfCollection, isLoading } = this.state;

    return (
      <>
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

        {isLoading && <Loader />}

        {endOfCollection > 0 && !isLoading ? (
          <Button onClick={this.loadMore} />
        ) : null}
      </>
    );
  }
}
