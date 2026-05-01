import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { Refresh as RefreshIcon, Warning as WarningIcon } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component that catches rendering errors in child components.
 * Displays a recovery UI instead of crashing the entire application.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400, p: 4 }}>
        <Card sx={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <CardContent sx={{ p: 4 }}>
            <WarningIcon sx={{ fontSize: 56, color: "error.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              An unexpected error occurred. You can try again or reload the page.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="outlined" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </Box>
            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1,
                  textAlign: "left", fontSize: "0.75rem", fontFamily: "monospace",
                  overflow: "auto", maxHeight: 150,
                }}
              >
                <Typography variant="caption" fontWeight={600}>Dev Error:</Typography>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {this.state.error.message}
                </pre>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
}
