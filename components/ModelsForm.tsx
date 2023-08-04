// ModelsForm.tsx
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useFilteredModels from './useFilteredModels';
import ModelCard from './ModelCard';

const models = [
  { name: 'model1', style: 'realistic', popularity: 5, rating: 3.5, RUNS: 100 }, // Change RUNS to runs
  { name: 'model2', style: 'anime', popularity: 7, rating: 4.5, RUNS: 200 }, // Change RUNS to runs
  { name: 'model3', style: 'realistic', popularity: 10, rating: 5.0, RUNS: 300 }, // Change RUNS to runs
];

const styleFilters = ['all', 'anime', 'realistic'];
const sortFilters = ['A-Z', 'most popular', 'top rated'];

const ModelsForm: React.FC<{ onModelSelect: (model: string) => void }> = ({ onModelSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const {
    search,
    setSearch,
    styleFilter,
    setStyleFilter,
    sortFilter,
    setSortFilter,
    filteredModels,
  } = useFilteredModels(models);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModelClick = (model: string) => {
    onModelSelect(model);
    handleClose();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Models</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Select a model</DialogTitle>
        <DialogContent>
          <TextField variant="outlined" size="small" label="Search" value={search} onChange={handleSearchChange} fullWidth />
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '1rem' }}>
            <InputLabel>Filter by Style</InputLabel>
            <Select value={styleFilter} onChange={(event) => setStyleFilter(event.target.value)}>
              {styleFilters.map(filter => (
                <MenuItem value={filter} key={filter}>{filter}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '1rem' }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortFilter} onChange={(event) => setSortFilter(event.target.value)}>
              {sortFilters.map(filter => (
                <MenuItem value={filter} key={filter}>{filter}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            {filteredModels.map((model, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ModelCard model={model} onSelect={handleModelClick} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModelsForm;