import styles from './searchbar.module.css';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <span className={styles.button_label}>Search</span>
          </button>

          <input
            className={styles.input}
            value={query}
            onChange={handleChange}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
