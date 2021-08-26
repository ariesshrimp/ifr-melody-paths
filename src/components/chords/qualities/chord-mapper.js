export default (notes = []) => {
  return notes.map((note) => ({
    [note]: true
  }));
};
