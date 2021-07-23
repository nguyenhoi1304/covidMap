import { Box, makeStyles, Paper, Select } from "@material-ui/core";
import React, { useState } from "react";
import { SelectOptionSearchEnum } from "../../enum";
import AreaSearch from "../areaSearch";
import PlaceSearch from "../placeSearch/placeSearch";

const useStyles = makeStyles({
  select: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: '#000000DE',
    fontWeight: 600,
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #13131328',
    fontSize: '0.875rem',
    '& > fieldset': {
      display: 'none'
    },
    '& .MuiSelect-outlined': {
      padding: '0.625rem 1.875rem 0.625rem 1rem',
      minWidth:'7.625rem',
    },
    '& .MuiSelect-icon': {
      top: 'unset !important',
      right: '0 !important',
    }
  },
  boxSelected: {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const labelOptionSearch = {
  [SelectOptionSearchEnum.place]: 'Tìm theo địa điểm',
  [SelectOptionSearchEnum.area]: 'Tìm theo khu vực',
}

function SelectOptionSearch() {

  const classes = useStyles()
  const [optionSearch, setOptionSearch] = useState(SelectOptionSearchEnum.place)

  const onChangeOptionSearch = (event) => {
    let newOption = event.target.value
    setOptionSearch(newOption)
  }

  return (
    <>
      <Paper elevation={12} className={classes.paper}>
        <Select
          className={classes.select}
          variant='outlined'
          native
          value={optionSearch}
          onChange={onChangeOptionSearch}
        >
          <option value={SelectOptionSearchEnum.place}>{labelOptionSearch[SelectOptionSearchEnum.place]}</option>
          <option value={SelectOptionSearchEnum.area}>{labelOptionSearch[SelectOptionSearchEnum.area]}</option>
        </Select>
        <Box className={classes.boxSelected}>
          {
            SelectOptionSearchEnum.place == optionSearch ?
              <PlaceSearch />
              :
              <AreaSearch />
          }
        </Box>
      </Paper>
    </>
  )
}

export default SelectOptionSearch;
