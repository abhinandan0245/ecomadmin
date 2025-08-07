import React, { useEffect, useState } from 'react';
import { IRootState } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addSlugThunk, suggestionSlugThunk } from '../../../store/thunks/slugThunks';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SlugSuggestionField: React.FC<Props> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const { slugs = [], loading, error } = useAppSelector((state: IRootState) => state.slug);
 console.log("Slug suggestions from Redux:", slugs);
  const [input, setInput] = useState<string>(value ?? '');
  const [showDropdown, setShowDropdown] = useState(false);

  // Utility to check if input is valid
  const isValidInput = (val: any): val is string => typeof val === 'string' && val.trim().length > 0;
  console.log(isValidInput)

  // Sync input with parent prop
  useEffect(() => {
    setInput(value ?? '');
  }, [value]);

  // Fetch suggestions on input change (debounced)
useEffect(() => {
  let cancelled = false;
  const delay = setTimeout(() => {
    if (isValidInput(input) && !cancelled) {
      console.log("Fetching suggestions for:", input); // <== ADD THIS
      dispatch(suggestionSlugThunk(input));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, 300);

  return () => {
    cancelled = true;
    clearTimeout(delay);
  };
}, [input, dispatch]);

  const handleSelect = (val: string) => {
    onChange(val);
    setInput(val);
    setShowDropdown(false);
  };

  const handleAddNew = () => {
    dispatch(addSlugThunk(input)).then((res: any) => {
      if (!res.error) {
        onChange(input);
        setInput(input);
        setShowDropdown(false);
        dispatch(suggestionSlugThunk(input));
      }
    });
  };

  const isSlugInSuggestions = slugs.includes(input);
  

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={input ?? ''}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Slug Name"
        className="form-input w-full border border-gray-300 rounded px-3 py-2"
        onFocus={() => isValidInput(input) && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // Allow click to register
      />

      {isValidInput(input) && showDropdown && (
        <div className="absolute bg-white text-black border w-full mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : slugs.length > 0 ? (
            slugs
              .filter((slug) => slug !== input) // Optional: exclude exact match
              .map((slug: string, idx: number) => (
                <div
                  key={idx}
                  className="px-4 py-2 text-black bg-yellow-100 border-b border-gray-300 cursor-pointer"
                  onClick={() => handleSelect(slug)}
                >
                  {slug}
                </div>
              ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No matching slugs</div>
          )}
        </div>
      )}

      {isValidInput(input) && !loading && !isSlugInSuggestions && (
        <button
          type="button"
          onClick={handleAddNew}
          className="mt-2 text-sm text-green-600 hover:underline"
        >
          + Add "{input}" as a new slug
        </button>
      )}

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {typeof error === 'string' ? error : 'Something went wrong'}
        </div>
      )}
    </div>
  );
};

export default SlugSuggestionField;
