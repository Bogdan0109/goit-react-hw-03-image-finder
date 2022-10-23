import React, { Component } from 'react';
import './Searchbar.scss';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = { filter: '' };

  handleChange = e => {
    e.preventDefault();

    const { value } = e.target;

    this.setState({ filter: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.filter.trim());

    this.reset();
  };

  reset = () => {
    this.setState({ filter: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch width="30" height="30" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.filter}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
