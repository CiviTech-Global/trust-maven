import { useState, useRef, useEffect } from "react";
import {
  Box, Typography, TextField, IconButton, Paper, Avatar, Chip, CircularProgress,
} from "@mui/material";
import { Send as SendIcon, AutoAwesome as AiIcon, Person as PersonIcon } from "@mui/icons-material";
import { queryCopilot, type CopilotResponse } from "../../../infrastructure/api/copilot.api";

interface Message {
  role: "user" | "assistant";
  content: string;
  data?: any;
  suggestedQueries?: string[];
}

const SUGGESTIONS = [
  "What frameworks do we have?",
  "Show my compliance status",
  "What risks are we tracking?",
  "How many controls are there?",
  "Show recent evidence",
  "What integrations do we have?",
  "Which controls lack evidence?",
  "Show high severity risks",
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your GRC assistant. I can help you understand your compliance posture, find information about frameworks and controls, check risk status, and more. Try asking me something!",
      suggestedQueries: SUGGESTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (q?: string) => {
    const query = q || input.trim();
    if (!query || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);

    try {
      const result = await queryCopilot(query);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.answer,
          data: result.data,
          suggestedQueries: result.suggestedQueries,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err?.response?.data?.message || err.message || "Something went wrong"}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", maxWidth: 900, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <AiIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h1">GRC Assistant</Typography>
      </Box>

      <Paper
        sx={{
          flex: 1,
          overflow: "auto",
          mb: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.default",
        }}
      >
        {messages.map((msg, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1.5, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: msg.role === "user" ? "primary.main" : "secondary.main" }}>
              {msg.role === "user" ? <PersonIcon sx={{ fontSize: 18 }} /> : <AiIcon sx={{ fontSize: 18 }} />}
            </Avatar>
            <Box sx={{ maxWidth: "75%" }}>
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: msg.role === "user" ? "primary.main" : "background.paper",
                  color: msg.role === "user" ? "primary.contrastText" : "text.primary",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{msg.content}</Typography>
                {msg.data && (
                  <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider", opacity: 0.8 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Data available</Typography>
                  </Box>
                )}
              </Paper>
              {msg.suggestedQueries && msg.suggestedQueries.length > 0 && !loading && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                  {msg.suggestedQueries.map((sq, j) => (
                    <Chip
                      key={j}
                      label={sq}
                      size="small"
                      variant="outlined"
                      onClick={() => handleSend(sq)}
                      sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
              <AiIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={bottomRef} />
      </Paper>

      <Paper sx={{ p: 1, display: "flex", gap: 1 }} elevation={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask me anything about your compliance..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          multiline
          maxRows={3}
        />
        <IconButton color="primary" onClick={() => handleSend()} disabled={loading || !input.trim()}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
