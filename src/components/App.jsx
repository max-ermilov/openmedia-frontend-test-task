import React, {useState} from "react";
import Form from "./Form";
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
      <Form link={handleLink}/>
    ) : (
      <Player goBack={goBack} link={link}/>
    )
    // <Player goBack={goBack} link='https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals'/>
  );
}
