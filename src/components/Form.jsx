import React, { useRef, useState } from "react";

export default function Form({link}) {
  const [isError, setIsError] = useState(false);
  const [inputError, setInputError] = useState('')
  const input = useRef();

  function isValidAudioUrl(urlToCheck) {
    return fetch(urlToCheck, {method: 'HEAD', mode: 'cors'})
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unable to play ${res.statusText || 'wrong input'}`);
        }
        if (!res.headers.get('content-type').startsWith('audio')) {
          throw new Error(
            `Unable to play ${res?.headers?.get('content-type')?.split(';')[0] || 'non-audio'} link`
          );
        }
        if (res.ok && res.headers.get('content-type').startsWith('audio')) {
          return urlToCheck;
        }
      });
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    const linkValue = input.current.value.trim().toLowerCase();
    if (e.target.closest("form").checkValidity()) {
      isValidAudioUrl(linkValue)
        .then((res) => {
          link(res);
          setIsError(false);
          setInputError('');
        })
        .catch(err => {
          setTimeout(() => {
            setIsError(false);
            setInputError('');
          }, 4000);
          setIsError(true);
          setInputError(err.message)
        });
    } else {
      setIsError(true);
      setInputError(input.current.validationMessage);
    }
  };

  return (
    <div className="media__wrapper">
      <h2 className="media__label">Insert the link</h2>
      <form
        className="form"
        onSubmit={onSubmitHandler}
        noValidate
        onClick={() => {
          input.current.focus()
        }}
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
        </div>
        <button
          className="button form__submit-button"
          type="submit"
          name="submit"
        >Submit
        </button>
      </form>
      <span className={`form__error ${isError ? "active" : ""}`}>{inputError}</span>
    </div>
  )
}
