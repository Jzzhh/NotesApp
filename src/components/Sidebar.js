import React from "react"
import {AiOutlineDelete, AiOutlineDownload} from "react-icons/ai"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {
        const title = note.body.split('\n')[0].replace('#',' ').trim()

        return (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{title}</h4>
                <div className="icon-container">
                    <a href={note.url} download={`${title}.md`}>
                        <button
                            className="download-btn"
                            // onClick={(event) => props.download(event,note.id)}    
                        >
                            <AiOutlineDownload className="download-icon icon"/>
                        </button>
                    </a>
                    <button 
                        className="delete-btn"
                        onClick={(event) => props.delete(event,note.id)}
                    >
                        <AiOutlineDelete className="delete-icon icon"/>
                    </button>
                </div>
            </div>
        </div>
    )})

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}