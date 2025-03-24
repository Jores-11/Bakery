import React, { useState, useRef, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {
  Grid,
  IconButton,
  Avatar,
  Divider,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  IoSend,
  IoCall,
  IoVideocam,
  IoAttach,
  IoSearch,
  IoSettings,
  IoHappy,
  IoPersonAdd,
  IoPeople,
} from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import VuiAvatar from "components/VuiAvatar";
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "firebase.js"; // Import from centralized firebase.js

function Teams() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddContact, setOpenAddContact] = useState(false);
  const [openGroupChat, setOpenGroupChat] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const fileInputRef = useRef(null);

  // Fetch and persist contacts from Firestore
  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedContacts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(fetchedContacts);
      if (!selectedContact && fetchedContacts.length > 0) setSelectedContact(fetchedContacts[0]);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages for selected contact or group chat
  useEffect(() => {
    if (selectedContact && !openGroupChat) {
      const q = query(collection(db, `chats/${selectedContact.id}/messages`), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          time: doc.data().timestamp?.toDate() || new Date(),
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    } else if (openGroupChat) {
      const q = query(collection(db, "groupChat/messages"), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          time: doc.data().timestamp?.toDate() || new Date(),
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [selectedContact, openGroupChat]);

  // Handle contact selection
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setOpenGroupChat(false);
  };

  // Send message (individual or group)
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        sender: "CEO Arnold Ngong", // Replace with authenticated user
        timestamp: serverTimestamp(),
      };
      if (openGroupChat) {
        await addDoc(collection(db, "groupChat/messages"), { ...messageData, recipients: contacts.map((c) => c.id) });
      } else if (selectedContact) {
        await addDoc(collection(db, `chats/${selectedContact.id}/messages`), {
          ...messageData,
          recipient: selectedContact.id,
        });
      }
      setNewMessage("");
    }
  };

  // Emoji handling
  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setEmojiOpen(false);
  };

  // File upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "Image" : file.type.startsWith("video") ? "Video" : "File";
      const messageData = {
        text: `${fileType}: ${file.name}`,
        sender: "CEO Arnold Ngong",
        timestamp: serverTimestamp(),
      };
      if (openGroupChat) {
        await addDoc(collection(db, "groupChat/messages"), { ...messageData, recipients: contacts.map((c) => c.id) });
      } else if (selectedContact) {
        await addDoc(collection(db, `chats/${selectedContact.id}/messages`), {
          ...messageData,
          recipient: selectedContact.id,
        });
      }
    }
  };

  // Simulated call (replace with WebRTC for real calls)
  const handleCall = (type) => {
    alert(`Starting ${type} call with ${selectedContact.name}... (Simulated)`);
    // For real calls, integrate WebRTC here (e.g., simple-peer)
  };

  // Settings menu
  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);

  // Add new contact
  const handleAddContact = async () => {
    if (newContactName.trim() && newContactNumber.trim()) {
      const newContact = {
        name: newContactName,
        number: newContactNumber,
        role: "Employee",
        avatar: "https://bit.ly/3pM5X8p",
      };
      await addDoc(collection(db, "contacts"), newContact);
      setNewContactName("");
      setNewContactNumber("");
      setOpenAddContact(false);
    }
  };

  return (
    <DashboardLayout>
      <VuiBox sx={{ height: "100vh", display: "flex", p: 0, background: "linear-gradient(135deg, #1A1E3A 0%, #2A2F5A 100%)" }}>
        {/* Left Sidebar: Contact List */}
        <VuiBox
          sx={{
            width: { xs: "100%", md: "320px" },
            background: "rgba(255, 255, 255, 0.05)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            overflowY: "auto",
            p: 2,
          }}
        >
          <VuiBox display="flex" alignItems="center" mb={2}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Team Messaging
            </VuiTypography>
            <IconButton sx={{ ml: "auto", color: "white" }} onClick={() => setOpenAddContact(true)}>
              <IoPersonAdd />
            </IconButton>
            <IconButton sx={{ color: "white" }} onClick={() => setOpenGroupChat(true)}>
              <IoPeople />
            </IconButton>
            <IconButton sx={{ color: "white" }} onClick={handleSettingsClick}>
              <IoSettings />
            </IconButton>
          </VuiBox>
          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
          {contacts.map((contact) => (
            <VuiBox
              key={contact.id}
              display="flex"
              alignItems="center"
              p={1.5}
              sx={{
                cursor: "pointer",
                backgroundColor: selectedContact?.id === contact.id && !openGroupChat ? "rgba(255, 255, 255, 0.15)" : "transparent",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.2s",
              }}
              onClick={() => handleContactSelect(contact)}
            >
              <VuiAvatar src={contact.avatar} alt={contact.name} size="md" sx={{ mr: 2 }} />
              <VuiBox>
                <VuiTypography color="white" variant="body1" fontWeight="medium">
                  {contact.name}
                </VuiTypography>
                <VuiTypography color="text" variant="caption">
                  {contact.role}
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          ))}
        </VuiBox>

        {/* Right Side: Chat Area */}
        <VuiBox sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {(selectedContact || openGroupChat) ? (
            <>
              {/* Chat Header */}
              <VuiBox
                display="flex"
                alignItems="center"
                p={2}
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {openGroupChat ? (
                  <>
                    <VuiAvatar src="https://bit.ly/3oM5X8p" alt="Group" size="md" sx={{ mr: 2 }} />
                    <VuiTypography color="white" variant="h6" fontWeight="bold">
                      Company Group Chat
                    </VuiTypography>
                  </>
                ) : (
                  <>
                    <VuiAvatar src={selectedContact.avatar} alt={selectedContact.name} size="md" sx={{ mr: 2 }} />
                    <VuiBox>
                      <VuiTypography color="white" variant="h6" fontWeight="bold">
                        {selectedContact.name}
                      </VuiTypography>
                      <VuiTypography color="text" variant="caption">
                        {selectedContact.role} | {selectedContact.number}
                      </VuiTypography>
                    </VuiBox>
                    <VuiBox ml="auto" display="flex" gap={1}>
                      <IconButton sx={{ color: "white" }} onClick={() => handleCall("voice")}>
                        <IoCall />
                      </IconButton>
                      <IconButton sx={{ color: "white" }} onClick={() => handleCall("video")}>
                        <IoVideocam />
                      </IconButton>
                      <IconButton sx={{ color: "white" }}>
                        <IoSearch />
                      </IconButton>
                    </VuiBox>
                  </>
                )}
              </VuiBox>

              {/* Messages Area */}
              <VuiBox
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 3,
                  background: "transparent",
                }}
              >
                {messages.map((msg) => (
                  <VuiBox
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.sender === "CEO Arnold Ngong" ? "flex-end" : "flex-start",
                      mb: 2,
                    }}
                  >
                    <VuiBox
                      sx={{
                        maxWidth: "60%",
                        p: 1.5,
                        borderRadius: "16px",
                        backgroundColor: msg.sender === "CEO Arnold Ngong" ? "#007BFF" : "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                        "&:hover": { boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)" },
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <VuiTypography color="white" variant="body2">
                        {msg.sender !== "CEO Arnold Ngong" && `${msg.sender}: `}{msg.text}
                      </VuiTypography>
                      <VuiTypography color="text" variant="caption">
                        {msg.time.toLocaleTimeString()}
                      </VuiTypography>
                    </VuiBox>
                  </VuiBox>
                ))}
              </VuiBox>

              {/* Message Input Area */}
              <VuiBox
                p={2}
                display="flex"
                alignItems="center"
                gap={2}
                sx={{ background: "rgba(255, 255, 255, 0.05)", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
              >
                <IconButton sx={{ color: "white" }} onClick={() => setEmojiOpen(!emojiOpen)}>
                  <IoHappy />
                </IconButton>
                {emojiOpen && (
                  <VuiBox sx={{ position: "absolute", bottom: "70px", left: "20px", zIndex: 1000 }}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </VuiBox>
                )}
                <IconButton sx={{ color: "white" }} onClick={() => fileInputRef.current.click()}>
                  <IoAttach />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  accept="image/*,video/*"
                />
                <TextField
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      borderRadius: "12px",
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                    },
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <VuiButton
                  color="primary"
                  sx={{ borderRadius: "50%", minWidth: "40px", height: "40px" }}
                  onClick={handleSendMessage}
                >
                  <IoSend />
                </VuiButton>
              </VuiBox>
            </>
          ) : (
            <VuiBox sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <VuiTypography color="text" variant="h6">
                Select a contact or start a group chat
              </VuiTypography>
            </VuiBox>
          )}
        </VuiBox>

        {/* Settings Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSettingsClose}>
          <MenuItem onClick={() => { handleSettingsClose(); setOpenSettings(true); }}>Profile Settings</MenuItem>
          <MenuItem onClick={() => { handleSettingsClose(); setOpenGroupChat(true); }}>Group Chat</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Stickers</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Logout</MenuItem>
        </Menu>

        {/* Add Contact Dialog */}
        <Dialog open={openAddContact} onClose={() => setOpenAddContact(false)}>
          <DialogTitle>
            <VuiTypography color="white" variant="h6">Add New Contact</VuiTypography>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }}
            />
            <TextField
              label="Phone Number"
              value={newContactNumber}
              onChange={(e) => setNewContactNumber(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }}
            />
          </DialogContent>
          <DialogActions>
            <VuiButton color="error" onClick={() => setOpenAddContact(false)}>Cancel</VuiButton>
            <VuiButton color="primary" onClick={handleAddContact}>Save</VuiButton>
          </DialogActions>
        </Dialog>

        {/* Profile Settings Dialog */}
        <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
          <DialogTitle>
            <VuiTypography color="white" variant="h6">Profile Settings</VuiTypography>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Your Name"
              defaultValue="CEO Arnold Ngong"
              fullWidth
              margin="normal"
              sx={{ "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }}
            />
            <TextField
              label="Phone Number"
              defaultValue="+237696074749"
              fullWidth
              margin="normal"
              sx={{ "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }}
            />
          </DialogContent>
          <DialogActions>
            <VuiButton color="error" onClick={() => setOpenSettings(false)}>Cancel</VuiButton>
            <VuiButton color="primary" onClick={() => setOpenSettings(false)}>Save</VuiButton>
          </DialogActions>
        </Dialog>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Teams;