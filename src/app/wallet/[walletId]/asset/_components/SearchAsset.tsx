import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchAsset({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useDebouncedCallback(handleOnChange, 600);

  return (
    <div>
      <label htmlFor="search">Search assets</label>
      <input
        id="search"
        type="text"
        placeholder="Type asset name or ticker..."
        onChange={debouncedChangeHandler}
      />
    </div>
  );
}
