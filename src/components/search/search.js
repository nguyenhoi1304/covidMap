import React, { Component, useEffect, useRef, useState } from "react";
import "./search.css"
import { useHistory, useLocation } from 'react-router-dom';
import { AppConfig, RouterConfig, UrlConfig } from "../../config";
import { v4 } from "uuid";
import { AppData } from './../../data/appData';
import { CodeEnum } from './../../enum/codeEnum';
import { ApiTool } from './../../tool/apiTool';
import { IconConfig } from './../../config/iconConfig';
import { Box, Button, List, ListItem, Typography, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PolygonTool } from './../../tool/polygonTool';

function Search() {
  const [text, setText] = useState('')
  const [showAutoSuggest, setShowAutoSuggest] = useState(false)
  const [listPlace, setListPlace] = useState([])
  const history = useHistory()
  const location = useLocation()
  const inputRef = useRef()
  const currentFetchTimeoutRef = useRef()
  const [loading, setLoading] = useState(false)

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
    if (text) {
      // store.dispatch(showSideBar())
      history.push({
        pathname: RouterConfig.patient.detail.replace(":code", text.trim()),
      });
      inputRef.current?.blur()
    }
  }

  const handleClickClose = (e) => {
    setText('')
  }

  const autosuggest = (text) => {
    if (text) {
      setLoading(true)
      currentFetchTimeoutRef.current && clearTimeout(currentFetchTimeoutRef.current);
      currentFetchTimeoutRef.current = setTimeout(() => {
        const center = AppData.map.getCamera().getTarget();
        let location = `${center.lat},${center.lng}`

        let body = {
          key: AppConfig.mapKey,
          text: text,
          location: location,
          datetime: new Date().getTime()
        }
        ApiTool.queryGetFromJson(UrlConfig.autosuggest, body, (res) => {
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
    if (!id) {
      id = "idnotfound" + v4()
    }
    if (item?.location) {
      let data = JSON.stringify({
        name: item?.name,
        location: item?.location,
        address: item?.address
      })
      history?.push({
        pathname: RouterConfig.location.detail.replace(":id", id),
      })
    }
  }

  return (
    <Box className="searchCpn">
      <Box className="firstRow">
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          value={text}
          onChange={handleChangeText}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          className="inputText"
          placeholder="Tìm kiếm địa điểm hoặc mã bệnh nhân (vd: BN0001)"
        />

        {
          loading ?
            <Button
              className="searchBtn">
              <CircularProgress color="primary" size='20px' />
            </Button>
            :
            (
              text ?
                <Button
                  onClick={handleClickClose}
                >
                  <CloseIcon style={{ color: '#afadad' }} />
                </Button>
                :
                <Button
                  onClick={handleClickSearch}
                  className="searchBtn">
                  <img className="iconSearch" src={IconConfig.search} />
                </Button>

            )

        }

      </Box>

      {
        showAutoSuggest &&
        <Box className="listSuggest">
          {/* {
            (!loading && !(listPlace.length > 0) && text) &&
            <Box p={2}>
              Không có dữ liệu
            </Box>

          } */}
          {
            (!loading && listPlace.length > 0 && text) &&
            <List disablePadding>
              {
                listPlace?.map((item, index) => {
                  return (
                    <ListItem button key={item.id || v4()} onMouseDown={e => { clickItem(index) }}>
                      <ListItemText
                        primary={<Typography variant='subtitle1' style={{ fontWeight: 700 }}>{`${item?.name || "Chưa cập nhật tên"}`}</Typography>}
                        title={item?.name || "Chưa cập nhật tên"}
                        secondary={<Typography variant='body2' component='span'>{item?.address || "Chưa cập nhật địa chỉ"}</Typography>}
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
          }

        </Box >
      }
    </Box >
  )
}

export default Search;
