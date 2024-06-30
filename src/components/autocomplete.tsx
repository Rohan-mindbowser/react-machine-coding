import { useEffect, useRef, useState } from "react";
import { data } from "../common";

const AutoComplete = () => {
  const [showList, setShowList] = useState(false);
  const [filteredList, setFilteredList] = useState<any>(data);
  const [selectedInput, setSelectedInput] = useState<any>("");
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const filterData = (e: any) => {
    setSelectedInput(e.target.value);
    if (e.target.value) {
      const searchInput = e.target.value.trim()?.toLowerCase();
      setFilteredList(
        data.filter((item: any) => {
          return item?.employee_name?.toLowerCase()?.includes(searchInput);
        })
      );
    }
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== inputRef.current && e.target !== suggestionRef.current) {
        setShowList(false);
      }

      return () => {
        window.removeEventListener("click", () => {});
      };
    });
  });
  console.log(selectedInput);
  return (
    <div className="auto-container">
      <input
        ref={inputRef}
        className="input"
        onFocus={() => setShowList((prev) => !prev)}
        onChange={filterData}
        value={selectedInput}
      />
      {showList && (
        <div className="list-container" ref={suggestionRef}>
          {filteredList?.length > 0 &&
            filteredList?.map((data: any, key: number) => {
              return (
                <div
                  className="list-item"
                  key={key}
                  onClick={() => {
                    setSelectedInput(data?.employee_name);
                  }}
                >
                  {data?.employee_name}
                </div>
              );
            })}
          {filteredList?.length === 0 && <div>No data found</div>}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
