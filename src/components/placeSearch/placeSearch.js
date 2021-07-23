import { Box, CircularProgress, ClickAwayListener, Divider, InputBase, List, ListItem, ListItemText, Paper, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { RouterConfig, UrlConfig } from "../../config";
import { useWindowSize } from "../../useHooks/useWindowSize";
import { CodeEnum } from './../../enum/codeEnum';
import { ApiTool } from './../../tool/apiTool';
import { PolygonTool } from './../../tool/polygonTool';

const useStyles = makeStyles({
  input: {
    flexGrow: 1,
    fontSize: '0.875rem',
  },
  divider: {
    margin: '0 6px'
  },
  padding: {
    padding: '0.53125rem'
  },
  listSearch: {
    borderTop: '1px solid #dad1d1'
  }
})
function PlaceSearch() {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [text, setText] = useState('')
  const [showAutoSuggest, setShowAutoSuggest] = useState(false)
  const [listPlace, setListPlace] = useState([])
  const [loading, setLoading] = useState(false)

  const inputRef = useRef()
  const currentFetchTimeoutRef = useRef()
  const windowSize = useWindowSize()

  useEffect(() => {
    if (location?.pathname == RouterConfig.home) {
      setText('')
    }
  }, [location?.pathname])

  const handleChangeText = (e) => {
    let text = e.target.value
    setText(text)
    autosuggest(text)
  }

  const handleClickSearch = (e) => {
    router()
  }

  const handleKeyPress = (e) => {
    if (e.key.toLowerCase() == "enter") {
      router()
    }
  }

  const router = () => {
    setShowAutoSuggest(false)
    if (text) {
      if (listPlace[0]?.id) {
        history.push({
          pathname: RouterConfig.place.detail.replace(":id", listPlace[0]?.id),
        });
        if (listPlace[0]?.name) {
          setText(listPlace[0]?.name)
        }
      }
      else {
        history.push({
          pathname: RouterConfig.place.detail.replace(":id", 'message'),
        });
      }
      inputRef.current?.blur()
    }
  }

  const handleClickClose = (e) => {
    setText('')
    history?.push({
      pathname: RouterConfig.home,
    })
  }

  const autosuggest = (text) => {
    if (text) {
      setLoading(true)
      currentFetchTimeoutRef.current && clearTimeout(currentFetchTimeoutRef.current);
      currentFetchTimeoutRef.current = setTimeout(() => {
        let body = {
          searchKey: text.trim(),
        }
        ApiTool.queryGetFromJson(UrlConfig.place.search, body, (res) => {
          setLoading(false)
          if (res?.code == CodeEnum.ok) {
            let arrData = res?.result?.filter((item, index) => {
              return PolygonTool.isPointInArea(item.location) && item.id
            })
            setListPlace(arrData)
          }
        })
      }, 300)
    }
    else {
      setListPlace([])
    }
  }

  const onFocusInput = (e) => {
    setShowAutoSuggest(true)
  }

  const onBlurInput = (e) => {
    setShowAutoSuggest(false)
  }

  const clickItem = (index) => {
    let item = listPlace[index]
    let id = item?.id
    if (item?.id) {
      history?.push({
        pathname: RouterConfig.place.detail.replace(":id", id),
      })
      if (item?.name) {
        setText(item?.name)
      }
    }

  }
  let maxHeight = 350
  if ((windowSize.height - 200) < maxHeight) {
    maxHeight = windowSize.height - 200
  }
  return (
    <>
      <ClickAwayListener onClickAway={onBlurInput}>
        <Box position='relative' className={classes.padding}>
          <Box width='100%' display='flex' alignItems='center'>
            <InputBase
              inputRef={inputRef}
              className={classes.input}
              placeholder='Tìm kiếm địa điểm'
              value={text}
              onChange={handleChangeText}
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              onKeyPress={handleKeyPress}
            />

            {
              loading ?
                <Box display="flex" justifyContent="center" alignItems="center" width="24px" height="24px">
                  <CircularProgress size={"14px"} className={classes.loading} />
                </Box>
                :
                (
                  text &&
                  <CloseIcon onClick={handleClickClose} style={{ color: '#afadad' }} />
                )
            }
            <Divider className={classes.divider} orientation="vertical" flexItem />

            <Tooltip title='Tìm kiếm' placement="bottom">
              <SearchIcon onClick={handleClickSearch} color={text ? "primary" : 'disabled'} />
            </Tooltip>
          </Box>

          {
            showAutoSuggest &&
            <Box
              position='absolute'
              left={0}
              top='100%'
              width='100%'
              bgcolor='background.paper'
              zIndex='1000'
              overflow="auto"
              maxHeight={maxHeight + 'px'}
            >
              {
                (!loading && !(listPlace.length > 0) && text) &&
                <Box p={2}>
                  Không tìm thấy kết quả
                </Box>
              }

              {
                (!loading && listPlace.length > 0 && text) &&
                <Paper elevation={12}>
                  <List disablePadding component='div'>
                    {
                      listPlace?.map((item, index) => {
                        return (
                          <ListItem button key={item.id} onMouseDown={e => { clickItem(index) }} className={classes.listSearch}>
                            <ListItemText
                              primary={<Typography variant='subtitle2' style={{ fontWeight: 700 }}>{`${item?.name || "Chưa cập nhật tên"}`}</Typography>}
                              title={item?.name + '-' + item?.address}
                              secondary={<><Typography variant='caption' component='span'>{item?.address || "Chưa cập nhật địa chỉ"}</Typography></>}
                              primaryTypographyProps={
                                {
                                  noWrap: true,
                                }
                              }
                              secondaryTypographyProps={
                                {
                                  noWrap: true,
                                }
                              }
                            />
                          </ListItem>
                        )
                      })

                    }
                  </List>
                </Paper>
              }
            </Box >
          }
        </Box>
      </ClickAwayListener>
    </>
  )
}

export default PlaceSearch;
