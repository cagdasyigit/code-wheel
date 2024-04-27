import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { Language } from '../../stores/DataStore/types';
import DataStore from '../../stores/DataStore';

const DataTableToolbar = () => {
  const languageOptions: Language[] = ['Javascript', 'Scala', 'Python'];
  const { language, keywords, setLanguage, setKeywords } = DataStore(
    (state) => state
  );

  const handleSelectedLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as Language);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value as string);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} flex={1}>
        <TextField
          sx={{ width: { xs: '50%', sm: '33%' } }}
          variant={'outlined'}
          size={'small'}
          placeholder={'Search repositories by keywords...'}
          value={keywords}
          onChange={handleKeywordsChange}
        />

        <Tooltip title="Selected Programming Language" placement="top">
          <Select
            size={'small'}
            value={language}
            onChange={handleSelectedLanguageChange}
          >
            {languageOptions.map((lang) => (
              <MenuItem value={lang} key={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
};

export default DataTableToolbar;
