import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
// import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

const initalMessage = "# Type your markdown note's title here"

export default function App() {
    // localStorage.clear();
    const [notes, setNotes] = React.useState( () => JSON.parse(localStorage.getItem('notes')) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    React.useEffect(()=>{
      localStorage.setItem('notes',JSON.stringify(notes))

    },[notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: initalMessage,
            url: getURL(initalMessage)
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
      setNotes(oldNotes => {
        const newArray = [];
        for(let i = 0; i < oldNotes.length; i++){
          if( oldNotes[i].id === currentNoteId ){
            const newUrl = getURL(text);
            // const file = new Blob([text],{type:'text/plain'});
            // const newUrl = URL.createObjectURL(file);
            newArray.unshift({...oldNotes[i], body: text, url: newUrl});
          }
          else {
            newArray.push(oldNotes[i]);
          }
        }

        return newArray;
      })
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function handleDelete(event,id) {
      event.stopPropagation();
      let index;
      for(let i = 0;i < notes.length; i++){
        if(notes[i].id === id){
          index = i;
        }
      }
      const newArr = [...notes];
      newArr.splice(index,1);
      setNotes(newArr);
    }

    function getURL(text) {
      const file = new Blob([text],{type:'text/plain'});
      const newUrl = URL.createObjectURL(file);

      return newUrl;
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    delete={handleDelete}
                    // download={handleDownload}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

// export default App;
