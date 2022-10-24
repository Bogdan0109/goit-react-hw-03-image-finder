import React, { Component } from 'react';
import { Wrapper } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { addMaterial } from 'services/Pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import scrollToNewImages from 'services/Scroll-to-new-images';

export class App extends Component {
  state = {
    query: '',
    photos: [],
    page: 1,
    endOfCollection: 0,
    isLoading: false,
    error: null,
    totalHits: null,
    pageHight: null,
    waitingSearched: true,
  };

  formSubmitHandler = query => {
    this.setState({ query, photos: [], page: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const {
      query: prevQuery,
      page: prevPage,
      pageHight: prevPageHight,
    } = prevState;

    const {
      query: newQuery,
      page: newPage,
      pageHight: newPageHight,
    } = this.state;

    if (newQuery === '') return;

    if (newPageHight !== prevPageHight) {
      setTimeout(() => scrollToNewImages(newPageHight), 500);
    }

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ isLoading: true, waitingSearched: false });

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

          if (totalHits === 0) {
            this.setState({ waitingSearched: true });
          }
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
    const {
      photos,
      endOfCollection,
      isLoading,
      totalHits,
      waitingSearched,
      error,
    } = this.state;
    return (
      <>
        {error && (
          <div style={{ margin: '0 auto', color: 'red' }}>
            <h1>Ошибка запроса:</h1>
            <h2
              style={{
                textDecoration: 'underline',
                fontStyle: 'italic',
                color: '#a10000',
              }}
            >
              !!! {error}
            </h2>
          </div>
        )}
        <Searchbar onSubmit={this.formSubmitHandler} />
        <Wrapper className="Reviews">
          {waitingSearched && (
            <h1 style={{ margin: '0 auto' }}>Let's find some images</h1>
          )}

          {totalHits !== 0 && <ImageGallery photos={photos} />}

          {isLoading && <Loader />}

          {endOfCollection > 0 && !isLoading ? (
            <Button onClick={this.loadMore} />
          ) : null}
        </Wrapper>
      </>
    );
  }
}
