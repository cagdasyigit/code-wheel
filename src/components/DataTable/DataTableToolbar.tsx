import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { Language } from '../../stores/DataStore/types';
import DataStore from '../../stores/DataStore';
import { FilterList, Search } from '@mui/icons-material';

const DataTableToolbar = () => {
  const languageOptions: Language[] = ['Javascript', 'Scala', 'Python'];
  const { language, keywords, setLanguage, setKeywords } = DataStore(
    (state) => state
  );
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchor);

  const handleLanguageClick = (language: Language) => {
    setLanguage(language);
    setMenuAnchor(null);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value as string);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        pt: 1,
        pb: 1,
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} flex={1}>
        <TextField
          sx={{ flex: 1, marginRight: '16px' }}
          variant={'outlined'}
          size={'small'}
          placeholder={'Search repositories by keywords...'}
          value={keywords}
          onChange={handleKeywordsChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Radio buttons on desktop */}
        <FormControl sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <RadioGroup row={true} aria-labelledby="language-selection">
            {languageOptions.map((lang) => (
              <FormControlLabel
                key={lang}
                value={lang}
                control={<Radio size={'small'} />}
                label={lang}
                checked={lang === language}
                onClick={() => handleLanguageClick(lang)}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Menu on mobile */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleFilterClick}
          >
            <FilterList />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={menuAnchor}
            open={open}
            onClose={handleMenuClose}
          >
            {languageOptions.map((lang) => (
              <MenuItem
                key={lang}
                selected={lang === language}
                onClick={() => handleLanguageClick(lang)}
              >
                {lang}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Stack>
    </Toolbar>
  );
};

export default DataTableToolbar;
