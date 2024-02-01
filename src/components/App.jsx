import SearchForm from './SearchForm/SearchForm';
export const App = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <SearchForm />
    </div>
  );
};
