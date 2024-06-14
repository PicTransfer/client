import React, { useState, useEffect } from "react";
import {
  createSpace,
  addMember,
  uploadFile,
  getFiles,
  updateRole,
} from "../services/apiService";

const Spaces = ({ token }) => {
  const [spaces, setSpaces] = useState([]);
  const [spaceName, setSpaceName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [updateMember, setUpdateMember] = useState("");
  const [updateMemberRole, setUpdateMemberRole] = useState("member");

  const fetchFiles = async (spaceId) => {
    const response = await getFiles(spaceId, token);
    setFiles(response.data);
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    const response = await createSpace(spaceName, token);
    setSpaces([...spaces, response.data]);
    setSpaceName("");
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    await addMember(selectedSpace._id, newMember, newMemberRole, token);
    setNewMember("");
    setNewMemberRole("member");
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    await updateRole(selectedSpace._id, updateMember, updateMemberRole, token);
    setUpdateMember("");
    setUpdateMemberRole("member");
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    await uploadFile(selectedSpace._id, file, token);
    fetchFiles(selectedSpace._id);
    setFile(null);
  };

  useEffect(() => {
    if (selectedSpace) {
      fetchFiles(selectedSpace._id);
    }
  }, [selectedSpace]);

  return (
    <div>
      <h2>Spaces</h2>
      <form onSubmit={handleCreateSpace}>
        <input
          type="text"
          placeholder="Space Name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <button type="submit">Create Space</button>
      </form>

      <h3>Available Spaces</h3>
      <ul>
        {spaces.map((space) => (
          <li key={space._id} onClick={() => setSelectedSpace(space)}>
            {space.name}
          </li>
        ))}
      </ul>

      {selectedSpace && (
        <div>
          <h3>Selected Space: {selectedSpace.name}</h3>
          <form onSubmit={handleAddMember}>
            <input
              type="text"
              placeholder="New Member ID"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Add Member</button>
          </form>

          <form onSubmit={handleUpdateRole}>
            <input
              type="text"
              placeholder="Member ID"
              value={updateMember}
              onChange={(e) => setUpdateMember(e.target.value)}
            />
            <select
              value={updateMemberRole}
              onChange={(e) => setUpdateMemberRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Update Role</button>
          </form>

          <form onSubmit={handleUploadFile}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload File</button>
          </form>

          <h4>Files in {selectedSpace.name}</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Spaces;
