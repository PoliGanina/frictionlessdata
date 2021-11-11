import * as React from 'react'
import { alpha, styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import HelpOutline from '@mui/icons-material/HelpOutline'
import InputBase from '@mui/material/InputBase'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export interface HeaderProps {
  dispatch: any
}

export default function Header(props: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={3}>
              <Typography
                variant="h5"
                sx={{ ml: 2, mt: '4px', cursor: 'pointer' }}
                onClick={() => props.dispatch({ type: 'SET_PAGE', page: 'home' })}
              >
                <strong>Frictionless Application</strong>
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Search>
                <SearchIconWrapper>
                  <UploadFileIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  type="file"
                  placeholder="Select File…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    props.dispatch({
                      type: 'UPLOAD_FILE',
                      files: ev.target.files,
                    })
                  }
                />
              </Search>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent="flex-end">
                <Button color="inherit">
                  <HelpOutline />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& ::file-selector-button': {
    display: 'none',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))
