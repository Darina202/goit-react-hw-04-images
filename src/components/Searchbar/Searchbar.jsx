import styles from './searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({
    query: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          <span className={styles.button_label}>Search</span>
        </button>

        <input
          className={styles.input}
          value={state.query}
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
};

export default Searchbar;
