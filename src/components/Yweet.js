import React, { useState } from "react";
import { dbService } from "fbase";

const Yweet = ({ yweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newYweet, setNewYweet] = useState(yweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this yweet?");
    if (ok) {
      //delete
      await dbService.doc(`yweets/${yweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`yweets/${yweetObj.id}`).update({ text: newYweet });
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewYweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your yweet"
                  value={newYweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Yweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{yweetObj.text}</h4>
          {yweetObj.attachmentUrl && (
            <img
              alt="attachment"
              src={yweetObj.attachmentUrl}
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Yweet</button>
              <button onClick={toggleEditing}>Edit Yweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Yweet;
