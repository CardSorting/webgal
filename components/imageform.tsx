import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Slider,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiCellphone, mdiImageArea, mdiSquare, mdiDiceMultiple } from '@mdi/js';
import styles from '../styles/ImageForm.module.css';
import ModelsForm from './ModelsForm';
import axios from 'axios';
// Block type interface
interface Block {
  aspectRatio: string;
  dimensions: { width: number; height: number };
}

// Block data
const blocks: Block[] = [
  { aspectRatio: 'portrait', dimensions: { width: 512, height: 768 } },
  { aspectRatio: 'landscape', dimensions: { width: 768, height: 512 } },
  { aspectRatio: 'square', dimensions: { width: 640, height: 640 } },
];

// ImageForm component
const ImageForm: React.FC = () => {
  // State management
  const [prompt, setPrompt] = useState<string>('');
  const [negative, setNegative] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [seed, setSeed] = useState<string>('');
  const [samplingStep, setSamplingStep] = useState<number>(1);
  const [cfgScale, setCfgScale] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block>(blocks[0]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  // Event handlers
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNegative(event.target.value);
  };

  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  const handleSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  const handleSamplingStepChange = (event: any, newValue: number | number[]) => {
    setSamplingStep(newValue as number);
  };

  const handleSamplingStepInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSamplingStep(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleCfgScaleChange = (event: any, newValue: number | number[]) => {
    setCfgScale(newValue as number);
  };

  const handleCfgScaleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCfgScale(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlockSelect = (block: Block) => {
    setSelectedBlock(block);
  };

  const randomizeSeed = () => {
    const newSeed = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    setSeed(newSeed);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setIsLoading(true);
  setError(null);

  // Create the parameters object to send to the server
  const params = {
    prompt,
    negative_prompt: negative, // Assuming this is the negative prompt
    width: selectedBlock.dimensions.width,
    height: selectedBlock.dimensions.height,
    override_settings: {
      sd_model_checkpoint: selectedModel, // Assuming this is the correct model selection
    },
    cfg_scale: cfgScale,
    num_inference_steps: samplingStep, // Assuming this is the correct number of inference steps
  };

  try {
    // Make the API call
    const response = await axios.post('/api/generate-image', params);

    // Process the response (the specifics will depend on how your backend is set up)
    setImageUrl(response.data.imageUrl);
  } catch (error) {
    setError(`Failed to generate image: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};


  const renderImageBlocks = () => {
    return blocks.map((block, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          onClick={() => handleBlockSelect(block)}
          className={selectedBlock === block ? styles.selectedBlock : styles.block}
        >
          <CardActionArea>
            <CardContent>
              <Icon
                path={
                  block.aspectRatio === 'portrait'
                    ? mdiCellphone
                    : block.aspectRatio === 'landscape'
                    ? mdiImageArea
                    : mdiSquare
                }
                size={1}
              />
              <Typography>
                {`${block.aspectRatio} (${block.dimensions.width}x${block.dimensions.height})`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  // JSX return for ImageForm component
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <ModelsForm onModelSelect={handleModelSelect} />
            {selectedModel && (
              <div>
                <Typography variant="body1">Selected Model: {selectedModel}</Typography>
              </div>
            )}
            <TextField
              type="text"
              value={prompt}
              onChange={handleInputChange}
              placeholder="Enter your prompt..."
              label="Positive Prompt"
              multiline
              rows={4}
              fullWidth
              required
            />
            <TextField
              type="text"
              value={negative}
              onChange={handleNegativeChange}
              placeholder="Enter negative prompt..."
              label="Negative Prompt"
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              type="text"
              value={seed}
              onChange={handleSeedChange}
              placeholder="Enter seed..."
              label="Seed"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={randomizeSeed}>
                      <Icon path={mdiDiceMultiple} size={1} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="h6">Aspect Ratio</Typography>
            <Grid container spacing={2}>
              {renderImageBlocks()}
            </Grid>
            <Typography variant="h6">Render Settings</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>SAMPLING STEP:</Typography>
                <Slider
                  value={samplingStep}
                  onChange={handleSamplingStepChange}
                  min={1}
                  max={50}
                  valueLabelDisplay="auto"
                />
                <TextField
                  value={samplingStep}
                  onChange={handleSamplingStepInputChange}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: 50,
                    },
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>CFG SCALE:</Typography>
                <Slider
                  value={cfgScale}
                  onChange={handleCfgScaleChange}
                  min={1}
                  max={18}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
                <TextField
                  value={cfgScale}
                  onChange={handleCfgScaleInputChange}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: 18,
                      step: 0.1,
                    },
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box sx={{ py: 2 }}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
                Generate Image
              </Button>
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            p: '1rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {isLoading && <Typography>Loading...</Typography>}
          {imageUrl && !isLoading && (
            <Box>
              <Typography variant="h6">Most Recent Generation</Typography>
              <img src={imageUrl} alt="Generated" className={styles.image} />
            </Box>
          )}
          {error && !isLoading && <Typography color="error">{error}</Typography>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImageForm;