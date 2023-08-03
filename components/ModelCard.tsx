// ModelCard.tsx
import React from 'react';
import { Typography, Box, IconButton, Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ModelCardProps {
  model: { name: string; popularity: number; RUNS: number; };
  onSelect: (model: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', cursor: 'pointer', '&:hover': { backgroundColor: '#eee' }, }}>
      <Typography>{model.name}</Typography>
      <Box sx={{ width: '150px', height: '150px', backgroundColor: '#ddd', marginBottom: '1rem', position: 'relative', boxShadow: model.popularity > 7 ? '0 0 10px #ff0' : 'none' }}>
        <IconButton size="large" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <PlayCircleOutlineIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary" sx={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}>
          {model.RUNS} RUNS
        </Typography>
      </Box>
      {!isMobile && <Button variant="contained" color="primary" sx={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.2)', alignSelf: 'center' }} onClick={() => onSelect(model.name)}>Select</Button>}
    </Box>
  );
};

export default ModelCard;