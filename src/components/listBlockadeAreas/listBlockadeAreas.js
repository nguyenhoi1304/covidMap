import { Box, Dialog, DialogActions, DialogContent, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TablePagination, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useHistory } from 'react-router-dom';
import { AppConfig } from './../../config/appConfig';
import { ColorConfig } from './../../config/colorConfig';
import { RouterConfig } from './../../config/routerConfig';
import { UrlConfig } from './../../config/urlConfig';
import { CodeEnum } from './../../enum/codeEnum';
import { ApiTool } from './../../tool/apiTool';
import DialogTitleCustom from './../common/dialogTitleCustom/dialogTitleCustom';
import "./listBlockadeAreas.css";

const useStyles = makeStyles({
  dialog: {
    width: '600px'
  },
  textTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'uppercase',
    color: ColorConfig.primary
  },
  listBlockadeAreas: {
    textTransform: 'inherit',
    color: '#ec1c1c',
    fontWeight: 600,
    background: '#FFFFFF',
    '&:hover': {
      background: '#FFFFFF',
    }
  }
})

const pageSize = 10
function ListBlockadeAreas(props, ref) {

  const classes = useStyles()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const history = useHistory()

  const [showList, setShowList] = useState(false)
  const [listAreas, setListAreas] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [textSearch, setTextSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fromNumber = pageNumber * pageSize + 1
  const toNumber = (pageNumber + 1) * pageSize

  useEffect(() => {
    let body = {
      placeType: AppConfig.idKhuVucPhongToa,
      searchKey: textSearch?.trim(),
      sortColumn: '',
      sortType: '',
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    setLoading(true)
    var listData
    const timeOut = setTimeout(() => {
      listData = ApiTool.queryGetFromJson(UrlConfig.place.list, body, (res) => {
        setLoading(false)
        if (res?.code == CodeEnum.ok) {
          let arrSort = res?.result.data?.sort(function (a, b) {
            if (!a.endDate && b.endDate) {
              return -1
            }
            else {
              let as = new Date(a.startDate)
              let bs = new Date(b.startDate)
              if (as > bs) {
                return -1
              }
              else {
                return 1
              }
            }
          });
          let newData = {
            ...res?.result,
            data: arrSort
          }
          setListAreas(newData)
        }
      })
    }, 300)

    return () => {
      listData?.cancel()
      clearTimeout(timeOut)
    };
  }, [pageNumber, textSearch])

  const handleShowList = () => {
    setShowList(true)
    setPageNumber(0)
    setTextSearch("")
  }

  const handleCloseList = () => {
    setShowList(false)
  }

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  }

  const handleChangeTextSearch = (event) => {
    setLoading(true)
    let text = event.target.value
    setTextSearch(text)
    setPageNumber(0)
  }

  const onClickArea = (area) => (e) => {
    setShowList(false)
    history.push({
      pathname: RouterConfig.place.detail.replace(":id", area?.id)
    })
  }

  useImperativeHandle(ref, () => ({
    show: () => {
      setShowList(true)
      setPageNumber(0)
      setTextSearch("")
    },
  }))

  return (
    <Box>
      {
        showList &&
        <Dialog
          fullScreen={fullScreen}
          open={true}
          onClose={handleCloseList}
          aria-labelledby="responsive-dialog-title"
          classes={
            {
              paper: (!fullScreen) ? classes.dialog : ""
            }
          }
        >
          <DialogTitleCustom onClose={handleCloseList} alignCenter>
            <Typography className={classes.textTitle}>Danh s??ch ?????a ??i???m phong t???a</Typography>
          </DialogTitleCustom>
          {
             (((!textSearch && (listAreas?.data?.length > 0)) || textSearch) || loading) &&
            <Box p='12px 40px'>
              <TextField
                variant='outlined'
                fullWidth
                size='small'
                placeholder='Nh???p t??? kh??a t??m ki???m ?????a ??i???m'
                onChange={handleChangeTextSearch}
                autoFocus
              />
            </Box>
          }

          <DialogContent dividers>
            {
              !loading ?
                <List disablePadding>
                  {
                    !textSearch && !listAreas?.data?.length > 0 &&
                    <Box textAlign='center'>
                      <Typography variant='subtitle2'>
                        {`Ch??a c?? danh s??ch khu v???c !`}
                      </Typography>
                    </Box>
                  }

                  {
                    listAreas?.data?.length == 0 && textSearch ?
                      <Box textAlign='center'>
                        <Typography variant='subtitle2'>
                          {`Kh??ng t??m th???y k???t qu???!`}
                        </Typography>
                      </Box>
                      :
                      listAreas?.data?.map((area, index) => {
                        let text = "??ang phong t???a"
                        if (area?.endDate) {
                          let now = new Date()
                          let end = new Date(area?.endDate)
                          if (now > end) {
                            text = moment(area?.endDate).format("DD/M/YYYY")
                          }
                        }
                        return (
                          <ListItem onClick={onClickArea(area)} button key={index}>
                            <ListItemAvatar>
                              <LocationOnIcon color='primary' />
                            </ListItemAvatar>

                            <ListItemText
                              primary={<Typography variant='subtitle1' style={{ fontWeight: 700 }}>{`${area?.name}`}</Typography>}
                              title={area?.name + '-' + area?.address}
                              secondary={
                                <>
                                  <Typography variant='body2' component='span'>{'?????a ch???: ' + area?.address}</Typography>
                                  <br></br>
                                  {
                                    area?.startDate &&
                                    <Typography variant='body2' component='span'>{"Th???i gian phong t???a: " + moment(area?.startDate).format("DD/MM/YYYY")}</Typography>
                                  }
                                  <br></br>
                                  <Typography variant='body2' component='span'>{"Th???i gian d??? phong t???a: " + `${text}`}</Typography>
                                </>
                              }
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
                              classes={
                                {
                                  root: classes.padding
                                }
                              }
                            />

                          </ListItem>
                        )
                      })
                  }
                </List>
                :
                <Box m='0 16px'>
                  <LinearProgress />
                </Box>
            }
          </DialogContent>
          <DialogActions>
            <Box p={2} display='flex' alignItems='center' justifyContent='space-between' className='listBlockadeAreas'>
              {
                listAreas?.count <= 10 && listAreas?.count > 0 &&
                <Typography variant='subtitle2'>
                  {`??ang hi???n th??? ${listAreas?.count} k???t qu???`}
                </Typography>
              }
              {
                listAreas?.count > 10 &&
                <>
                  <Typography variant='subtitle2'>
                    {`??ang hi???n th??? k???t qu???: ${fromNumber} - ${toNumber} trong t???ng s??? ${listAreas?.count} ?????a ??i???m`}
                  </Typography>
                  <TablePagination
                    component="div"
                    count={listAreas?.count || 0}
                    rowsPerPage={pageSize}
                    page={pageNumber}
                    labelRowsPerPage=''
                    onChangePage={handleChangePage}
                  />
                </>
              }
            </Box>
          </DialogActions>
        </Dialog>
      }
    </Box >
  )
}
ListBlockadeAreas = forwardRef(ListBlockadeAreas)
export default ListBlockadeAreas;

