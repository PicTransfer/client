import React, { useState, useEffect } from "react";
import {
  createSpace,
  addMember,
  uploadFile,
  getFiles,
  updateRole,
} from "../services/apiService";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

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
  }, [selectedSpace, fetchFiles]); // Ajoutez fetchFiles comme dépendance

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Spaces
      </Typography>
      <form onSubmit={handleCreateSpace}>
        <TextField
          label="Space Name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Space
        </Button>
      </form>

      <Typography variant="h6" gutterBottom>
        Available Spaces
      </Typography>
      <List>
        {spaces.map((space) => (
          <ListItem
            button
            key={space._id}
            onClick={() => setSelectedSpace(space)}
          >
            <ListItemText primary={space.name} />
          </ListItem>
        ))}
      </List>

      {selectedSpace && (
        <div>
          <Typography variant="h6" gutterBottom>
            Selected Space: {selectedSpace.name}
          </Typography>
          <form onSubmit={handleAddMember}>
            <TextField
              label="New Member ID"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="primary">
              Add Member
            </Button>
          </form>

          <form onSubmit={handleUpdateRole}>
            <TextField
              label="Member ID"
              value={updateMember}
              onChange={(e) => setUpdateMember(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Select
              value={updateMemberRole}
              onChange={(e) => setUpdateMemberRole(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="primary">
              Update Role
            </Button>
          </form>

          <form onSubmit={handleUploadFile}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button type="submit" variant="contained" color="primary">
              Upload File
            </Button>
          </form>

          <Typography variant="h6" gutterBottom>
            Files in {selectedSpace.name}
          </Typography>
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
};

export default Spaces;
