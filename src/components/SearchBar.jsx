export default function SearchBar({ search, onSearchChange, category, onCategoryChange, location, onLocationChange, categories, locations }) {
  return (
    <div className="filter-bar" aria-label="Filter internship opportunities">
      <label className="search-field">
        <span aria-hidden="true">⌕</span>
        <span className="sr-only">Search by job title or company</span>
        <input
          type="search"
          placeholder="Search jobs or companies"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      <label className="select-field">
        <span className="sr-only">Filter by category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label className="select-field">
        <span className="sr-only">Filter by location</span>
        <select value={location} onChange={(event) => onLocationChange(event.target.value)}>
          <option value="">All locations</option>
          {locations.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );
}