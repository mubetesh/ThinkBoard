import { Delete, DeleteIcon, LucideDelete, PenSquareIcon } from "lucide-react";
import React from "react";

import { Link } from "react-router";
import NoteDelete from "../pages/note/NoteDelete";
import {formatDate} from '../lib/utils'

const NoteCard = ({ note, onDeleted }) => {
  return (
    <div className="card bg-secondary text-primary-content w-80 m-2 transition-transform shadow-lg hover:shadow-secondary hover:shadow-md ">
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.description}</p>
        <div className="card-meta flex items-center justify-between mt-4">
          <span className="card-date font-bold text-md">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="card-actions justify-end">
            <Link
              to={`/note/${note._id}`}
              state={{ note }} 
              className="btn btn-ghost text-warning"
            >
              <PenSquareIcon className="size-6" />
            </Link>
            <NoteDelete noteId={note._id} onDeleted={onDeleted} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
