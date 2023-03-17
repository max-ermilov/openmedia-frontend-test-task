import React, {useState} from "react";
import Input from "./Input";
import Player from "./Player";

export function App() {
  const [link, setLink] = useState('');

  function handleLink(link) {
    setLink(link);
  }

  function goBack() {
    setLink('');
  }

  return (
    link === '' ? (
      <Input link={handleLink}/>
    ) : (
      // ''
      <Player goBack={goBack} link={link}/>
    )
  );
}
