import * as React from 'react'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Heading from '../../Library/Heading'
import HeadingSelector from '../../Library/HeadingSelector'
import Constraints from './Constraints'
import ForeignKeys from './ForeignKeys'
import ForeignKey from './ForeignKey'
import Fields from './Fields'
import Field from './Field'
import { useStore } from '../store'

export default function Elements() {
  return (
    <Box>
      <Header />
      <Content />
    </Box>
  )
}

function Header() {
  const elementIndex = useStore((state) => state.elementIndex)
  return elementIndex === undefined ? <ListingHeader /> : <ItemHeader />
}

function ListingHeader() {
  return (
    <Heading variant="h6">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TypeSelect />
        </Grid>
        <Grid item xs={6}>
          <AddButton />
          <GridButton />
        </Grid>
        <Grid item xs={3}>
          <SearchInput />
        </Grid>
      </Grid>
    </Heading>
  )
}

function ItemHeader() {
  return (
    <Heading variant="h6">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <BackButton />
            </Grid>
            <Grid item xs={6}>
              <ItemSelect />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RemoveButton />
          <ModeButton />
        </Grid>
      </Grid>
    </Heading>
  )
}

function TypeSelect() {
  const elementType = useStore((state) => state.elementType)
  const setElementType = useStore((state) => state.setElementType)
  const setElementIndex = useStore((state) => state.setElementIndex)
  return (
    <HeadingSelector
      select
      fullWidth
      label="Select"
      margin="none"
      value={elementType}
      onChange={(ev) => {
        setElementType(ev.target.value)
        setElementIndex()
      }}
    >
      <MenuItem value="field">Fields</MenuItem>
      <MenuItem value="foreignKey">Foreign Keys</MenuItem>
    </HeadingSelector>
  )
}

export function ItemSelect() {
  const descriptor = useStore((state) => state.descriptor)
  const elementType = useStore((state) => state.elementType)
  const elementIndex = useStore((state) => state.elementIndex)
  const setElementIndex = useStore((state) => state.setElementIndex)
  // TODO: remove
  if (elementType !== 'field') return null
  if (elementIndex === undefined) return null
  return (
    <HeadingSelector
      select
      fullWidth
      label="Select"
      type="number"
      value={elementIndex}
      onChange={(ev) => setElementIndex(parseInt(ev.target.value))}
    >
      {descriptor.fields.map((field, index) => (
        <MenuItem key={index} value={index}>
          {field.name}
        </MenuItem>
      ))}
    </HeadingSelector>
  )
}

function AddButton() {
  const elementType = useStore((state) => state.elementType)
  const addElement = useStore((state) => state.addElement)
  return (
    <Button onClick={() => addElement()}>
      Add {elementType === 'field' ? 'Field' : 'Foreign Key'}
    </Button>
  )
}

function GridButton() {
  const isElementGrid = useStore((state) => state.isElementGrid)
  const toggleIsElementGrid = useStore((state) => state.toggleIsElementGrid)
  return (
    <Button
      color={isElementGrid ? 'warning' : 'info'}
      onClick={() => toggleIsElementGrid()}
    >
      Grid View
    </Button>
  )
}

function BackButton() {
  const setElementIndex = useStore((state) => state.setElementIndex)
  return (
    <Button
      fullWidth
      color="info"
      variant="outlined"
      onClick={() => setElementIndex()}
      sx={{
        m: 0,
        height: '100%',
        textTransform: 'inherit',
        fontSize: '18px',
        fontWeight: 500,
        textAlign: 'left',
        justifyContent: 'flex-start',
        // textDecoration: 'underline !important',
        borderColor: 'info.main',
        mt: '-3px',
      }}
    >
      Fields
    </Button>
  )
}

function RemoveButton() {
  const elementType = useStore((state) => state.elementType)
  const removeElement = useStore((state) => state.removeElement)
  return (
    <Button onClick={() => removeElement()}>
      Remove {elementType === 'field' ? 'Field' : 'Foreign Key'}
    </Button>
  )
}

function ModeButton() {
  const elementType = useStore((state) => state.elementType)
  const setElementMode = useStore((state) => state.setElementMode)
  if (elementType !== 'field') return null
  return <Button onClick={() => setElementMode('constraints')}>Constraints</Button>
}

function SearchInput() {
  const elementQuery = useStore((state) => state.elementQuery)
  const setElementQuery = useStore((state) => state.setElementQuery)
  return (
    <InputBase
      type="text"
      placeholder="Search..."
      value={elementQuery || ''}
      onChange={(ev) => setElementQuery(ev.target.value)}
      sx={{
        height: '100%',
        paddingLeft: 1,
        paddingRight: 1,
        borderRadius: '4px',
        border: 'solid 1px #ccc',
        '&:focus': {
          outline: 'none',
        },
      }}
    />
  )
}

function Content() {
  const elementType = useStore((state) => state.elementType)
  const elementMode = useStore((state) => state.elementMode)
  const elementIndex = useStore((state) => state.elementIndex)
  switch (elementType) {
    case 'field':
      if (elementIndex === undefined) return <Fields />
      if (elementMode === 'constraints') return <Constraints />
      return <Field />
    case 'foreignKey':
      if (elementIndex === undefined) return <ForeignKeys />
      return <ForeignKey />
    default:
      return null
  }
}
