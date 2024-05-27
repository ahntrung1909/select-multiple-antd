import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

export const SelectBox = ({
  optItems,
  handleChangeOptItems,
  handleDeleteOptItems,
  handleClearAll,
}) => {
  const [filter, setFilter] = useState("");
  const [optBox, setOptBox] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);
  const selectInputRef = useRef(null);
  const selectOptionRef = useRef(null);
  const wrapperRef = useRef(null);
  const handleFocus = () => {
    selectInputRef.current.classList.add("focus");
    selectOptionRef.current.classList.add("show");
    setIsFocus(true);
  };

  const handleBlur = (e) => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) {
      console.log("blur");
      selectInputRef.current.classList.remove("focus");
      selectOptionRef.current.classList.remove("show");
      setIsFocus(false);
    }
  };

  const handleClick = () => {
    if (!selectInputRef.current.classList.contains("focus")) {
      inputRef.current.focus();
    }
  };
  const handleSearchBtn = (e) => {
    e.stopPropagation();
    if (isFocus) {
      selectInputRef.current.classList.remove("focus");
      selectOptionRef.current.classList.remove("show");
      setIsFocus(false);
      handleClearAll(e);
    } else {
      handleFocus();
    }
  };
  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (optBox?.length || filter === "") {
        e.target.value = "";
        handleChangeOptItems(e, optBox[0].id);
        setFilter("");
      }
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      const newArr = optItems.filter((optItem) => {
        return optItem.status;
      });
      if (newArr?.length) {
        if (inputRef.current.value === "") {
          handleDeleteOptItems(e, newArr[newArr.length - 1]?.id);
        }
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  });
  useEffect(() => {
    setOptBox(optItems);
  }, []);
  useEffect(() => {
    console.log(optItems);
    let newArr;
    if (filter === "") {
      newArr = optItems?.map((optItem) => optItem);
    } else {
      newArr = optItems?.filter((optItem) => {
        return optItem.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            filter
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          );
      });
    }

    setOptBox(newArr);
  }, [optItems, filter]);
  return (
    <div ref={wrapperRef}>
      <div className="select-input" ref={selectInputRef} onClick={handleClick}>
        {optItems?.map((optItem) => {
          if (optItem.status) {
            return (
              <div className="select-item" key={optItem.id}>
                <span>{optItem.name}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="btn-delete"
                  onClick={(e) => {
                    handleDeleteOptItems(e, optItem.id);
                  }}
                />
              </div>
            );
          }
        })}
        <input
          className="input"
          ref={inputRef}
          onFocus={handleFocus}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        ></input>
        <FontAwesomeIcon
          icon={isFocus ? faXmark : faMagnifyingGlass}
          onClick={handleSearchBtn}
          className="search-icon"
        />
      </div>
      <div className="select-option" ref={selectOptionRef}>
        {optBox === null || !optBox.length ? (
          <div className="option-item">
            Không có dữ liệu
          </div>
        ) : (
          optBox?.map((optItem) => {
            return (
              <div
                className={
                  !optItem?.status ? "option-item" : "option-item checked"
                }
                key={optItem?.id}
                data_id={optItem?.id}
                onMouseDown={(e) => {
                  handleChangeOptItems(e, optItem?.id);
                }}
              >
                {optItem?.name}
                {optItem?.status ? (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                ) : (
                  ""
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
