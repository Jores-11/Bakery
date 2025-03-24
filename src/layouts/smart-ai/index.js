import React, { useState, useRef, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { TextField, CircularProgress } from "@mui/material";
import { IoSend } from "react-icons/io5";

// Proxy API call to backend
const deepSeekApi = async (query) => {
  try {
    const response = await fetch("http://localhost:5000/api/deepseek", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (response.ok) return data.response;
    throw new Error(data.error);
  } catch (error) {
    console.error("Proxy API Error:", error);
    return "Sorry, I couldn’t process your request.";
  }
};

function SmartAI() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Handle AI query
  const handleQuery = async () => {
    if (query.trim()) {
      setLoading(true);
      const aiResponse = await deepSeekApi(query);
      setChatHistory((prev) => [...prev, { query, response: aiResponse, timestamp: new Date() }]);
      setQuery("");
      setLoading(false);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  return (
    <DashboardLayout>
      <VuiBox
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#252F5A", // Night blue, less shiny, inspiring
          p: 3,
        }}
      >
        {/* Header */}
        <VuiBox mb={3}>
          <VuiTypography
            variant="h4"
            color="white" // White text for contrast
            fontWeight="bold"
            textAlign="center"
            sx={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Smart AI
          </VuiTypography>
          <VuiTypography
            variant="body2"
            color="white" // White subtitle
            textAlign="center"
            sx={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Powered by DeepSeek
          </VuiTypography>
        </VuiBox>

        {/* Chat Area */}
        <VuiBox
          sx={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.1)", // Light overlay on night blue
            borderRadius: "16px",
            p: 3,
            overflowY: "auto",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {chatHistory.length === 0 ? (
            <VuiBox
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VuiTypography
                color="white"
                variant="h6"
                sx={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Start chatting with me!
              </VuiTypography>
            </VuiBox>
          ) : (
            chatHistory.map((chat, index) => (
              <VuiBox key={index} mb={3}>
                {/* User Message */}
                <VuiBox
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 1,
                  }}
                >
                  <VuiBox
                    sx={{
                      maxWidth: "70%",
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: "#ffffff", // White for user messages
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      "&:hover": { boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)" },
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <VuiTypography
                      color="#252F5A" // Night blue text on white
                      variant="body2"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {chat.query}
                    </VuiTypography>
                    <VuiTypography
                      color="#666" // Gray timestamp
                      variant="caption"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {chat.timestamp.toLocaleTimeString()}
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
                {/* AI Response */}
                <VuiBox
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <VuiBox
                    sx={{
                      maxWidth: "70%",
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly lighter overlay
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      "&:hover": { boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)" },
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <VuiTypography
                      color="white"
                      variant="body2"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {chat.response}
                    </VuiTypography>
                    <VuiTypography
                      color="rgba(255, 255, 255, 0.7)" // Light white timestamp
                      variant="caption"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {chat.timestamp.toLocaleTimeString()}
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </VuiBox>
            ))
          )}
          {loading && (
            <VuiBox sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={24} sx={{ color: "#FFD700" }} /> {/* Gold spinner */}
            </VuiBox>
          )}
          <div ref={chatEndRef} />
        </VuiBox>

        {/* Input Area */}
        <VuiBox
          display="flex"
          gap={2}
          mt={2}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            p: 2,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: "12px",
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                fontFamily: "'Roboto', sans-serif",
              },
            }}
            onKeyPress={(e) => e.key === "Enter" && handleQuery()}
          />
          <VuiButton
            sx={{
              backgroundColor: "#ffffff", // White button
              color: "#252F5A", // Night blue icon
              borderRadius: "12px",
              minWidth: "48px",
              height: "48px",
              "&:hover": { backgroundColor: "#e6e6e6" }, // Light gray hover
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleQuery}
            disabled={loading}
          >
            <IoSend size={20} />
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default SmartAI;