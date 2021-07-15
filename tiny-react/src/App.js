import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ListComponent from './ListComponent';
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
import { KEY, TINY_CDN } from "./constants"
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

export default function App() {
  const editorRef = useRef(null);
  //Create initial state, we should update content of editor to state
  const [editorState, setEditor] = useState({ content: '' });
  //Modal state to change display
  const [modal, setModal] = useState(false)
  //Function saveTiny handle save content of editor to state
  const saveTiny = () => {
    if (editorRef.current) {
      setEditor({ content: editorRef.current.getContent() });
    }
  };
  //Handle function modal
  const handleOpen = () => {
    !modal ? setModal(true) : setModal(false)
  }

  //call api post content from editor
  useEffect(() => {
    const url = 'http://localhost:3001/tinyEditor';
    if (editorState.content !== '')
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editorState)
        })
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
  }, [editorState]);
  return (
    <>
      {/* check condition to setup display */}
      {modal ?
        <ListComponent status={modal} />
        :
        <>
          <Editor
            apiKey={KEY}
            tinymceScriptSrc={TINY_CDN}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              skin: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <button onClick={saveTiny}>save editor content</button>
        </>
      }
      {/* check condition to setup display */}
      <button onClick={handleOpen}>{!modal ? 'open list' : 'close list'}</button>
    </>
  );
}