import React, { useRef, useState } from "react";

export default function Form({link}) {
  const [isError, setIsError] = useState(false);
  const [inputError, setInputError] = useState('')
  const [urlToCheck, setUrlToCheck] = useState('')
  const [isPending, setIsPending] = useState(false)
  const input = useRef();
  // const testAudio = React.createRef();
  const testAudio = useRef(null);

  const errorsList = [
    'Unknown error',
    'The fetching of the associated resource was aborted by the user\'s request.',
    'Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.',
    'Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.',
    'The associated resource or media provider object (such as a MediaStream) has been found to be unsuitable.'
  ]

  const handleCanPlay = e => {
    e.preventDefault()
    link(urlToCheck);
    setIsError(false);
    setInputError('');
    setIsPending(false);
  };

  const handleError = e => {
    e.preventDefault()
    setIsError(true);
    setInputError(`${errorsList[e.target.error.code]} ${e.target.error.message || ''}`);
    setIsPending(false);
    setUrlToCheck('');
    setTimeout(() => {
      setIsError(false);
      setInputError('');
    }, 4000);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const linkValue = input.current.value.trim().toLowerCase();
    setIsPending(true);
    if (e.target.closest("form").checkValidity()) {
      setUrlToCheck(linkValue);
    } else {
      setIsPending(false);
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
            disabled={isPending}
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
          disabled={isPending}
          className="button form__submit-button"
          type="submit"
          name="submit"
        >Submit
        </button>
        {/*now check if link provides an audio content*/}
        {(urlToCheck !== '') && <audio
          ref={testAudio.current}
          src={urlToCheck}
          onCanPlay={handleCanPlay}
          onError={handleError}
          style={{display: 'none !important'}}
          muted
        /> }
      </form>
      <span className={`form__error ${isError ? "active" : ""}`}>{inputError}</span>
    </div>
  )
}
