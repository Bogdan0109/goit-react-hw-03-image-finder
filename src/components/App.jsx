import React, { Component } from 'react';
import { Wrapper } from './App.styled';
// import { nanoid } from 'nanoid/non-secure';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// const id = nanoid(); //=> "Uakgb_J5m9g-0JDMbcJqLJ"

export class App extends Component {
  state = { filter: '' };

  formSubmitHandler = filter => {
    this.setState({ filter });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <Wrapper className="Reviews">
          <ImageGallery query={filter} />
        </Wrapper>
      </>
    );
  }
}
