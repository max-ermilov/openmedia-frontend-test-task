import React, {useRef, useState} from "react";

export default function Input({link}) {
  const [isError, setIsError] = useState(false);
  const [inputError, setInputError] = useState('')
  const input = useRef();

  function onSubmitHandler(e) {
    e.preventDefault();
    const linkValue = input.current.value.trim().toLowerCase();
    if (e.target.closest("form").checkValidity()) {
      link(linkValue);
      setIsError(false);
      setInputError('');
    } else {
      setIsError(true);
      setInputError(input.current.validationMessage);
    }
  }

  return (
    <>
      <h2 className="media__label">Insert the link</h2>
      <form
        className="form"
        onSubmit={onSubmitHandler}
        noValidate
      >
        <div className={`form__input-wrapper ${isError ? "form__input-wrapper_error" : ""}`}>
          <input
            className="form__input"
            type="url"
            required
            placeholder="https://"
            aria-label="Insert the link"
            ref={input}
            onChange={() => {
              setIsError(false);
            }}
          />
          <div className={`form__warning-icon ${isError ? "active" : ""}`}></div>
          <button
            className="button form__submit-button"
            type="submit"
            name="submit"
          >Submit
          </button>
        </div>
        <span className={`form__error ${isError ? "active" : ""}`}>{inputError}</span>
      </form>
    </>
  )
}
