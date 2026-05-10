import { forwardRef } from 'react';

const SearchBar = forwardRef(function SearchBar({ value, onChange, placeholder }, ref) {
  return (
    <input
      ref={ref}
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
    />
  );
});

export default SearchBar;