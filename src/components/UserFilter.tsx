import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Clear from "@mui/icons-material/Clear";

interface UserFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ filter, setFilter }) => {
  const handleClear = () => {
    setFilter(""); // Clear the input
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Filter by name, email, phone, or website..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} aria-label="clear search">
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default UserFilter;
