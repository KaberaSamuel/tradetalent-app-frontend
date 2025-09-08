import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Spinner({ isButton }: { isButton?: boolean }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isButton ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        <CircularProgress sx={{ color: "#00bba7" }} />
      )}
    </Box>
  );
}
