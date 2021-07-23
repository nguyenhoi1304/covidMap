import { Box, ThemeProvider, Paper, Button, Dialog, DialogActions, DialogContent, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TablePagination, TextField, Typography, useMediaQuery, useTheme, LinearProgress } from "@material-ui/core";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { ColorConfig } from './../../config/colorConfig';
import { IconConfig } from './../../config/iconConfig';
import { RouterConfig } from './../../config/routerConfig';
import { UrlConfig } from './../../config/urlConfig';
import { CodeEnum } from './../../enum/codeEnum';
import { GenderEnum } from './../../enum/genderEnum';
import { ApiTool } from './../../tool/apiTool';
import DialogTitleCustom from './../common/dialogTitleCustom/dialogTitleCustom';
import "./btnListPatients.css";
import GroupIcon from '@material-ui/icons/Group';
import { createMuiTheme } from '@material-ui/core/styles';
import { useImperativeHandle } from "react";
import { Skeleton } from "@material-ui/lab";

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
  btnListPatient: {
    textTransform: 'inherit',
    color: '#ec1c1c',
    fontWeight: 600,
    background: '#FFFFFF',
    padding: '0.6875rem 0.9375rem',
    '&:hover': {
      background: '#FFFFFF',
    }
  },
  skeleton: {
    height: 10,
    margin: '8px'
  },
})

const pageSize = 10
function BtnListPatients(props, ref) {

  const classes = useStyles()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const history = useHistory()

  const [showList, setShowList] = useState(false)
  const [listPatients, setListPatient] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [textSearch, setTextSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fromNumber = pageNumber * pageSize + 1
  const toNumber = (pageNumber + 1) * pageSize

  useEffect(() => {
    let body = {
      searchKey: textSearch?.trim(),
      sortColumn: 'code',
      sortType: 'desc',
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    var listData
    setLoading(true)
    const timeOut = setTimeout(() => {
      listData = ApiTool.queryGetFromJson(UrlConfig.patient.list, body, (res) => {
        setLoading(false)
        if (res?.code == CodeEnum.ok) {
          setListPatient(res?.result)
        }
      })
    }, 300)

    return () => {
      listData?.cancel()
      clearTimeout(timeOut)
    };
  }, [pageNumber, textSearch])

  useImperativeHandle(ref, () => ({
    show: () => {
      setShowList(true)
      setPageNumber(0)
      setTextSearch("")
    },
  }))

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

  const onClickPatient = (patient) => (e) => {
    setShowList(false)
    history.push({
      pathname: RouterConfig.patient.detail.replace(":code", patient.code)
    })
  }

  return (
    <Box>
      <Button startIcon={<GroupIcon />} className={classes.btnListPatient} variant='contained' onClick={handleShowList}>
        Danh sách bệnh nhân đã cập nhật
      </Button>
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
            <Typography className={classes.textTitle}>Danh sách bệnh nhân đã cập nhật</Typography>
          </DialogTitleCustom>
          {
            (((!textSearch && (listPatients?.data?.length > 0)) || textSearch) || loading) &&
            <Box p='12px 40px'>
              <TextField
                autoFocus
                variant='outlined'
                fullWidth
                size='small'
                placeholder='Nhập từ khóa tìm kiếm Mã BN'
                onChange={handleChangeTextSearch}
              />
            </Box>
          }

          <DialogContent dividers>
            {
              !loading ?
                <List disablePadding>

                  {
                    !textSearch && !listPatients?.data?.length > 0 &&
                    <Box textAlign='center'>
                      <Typography variant='subtitle2'>
                        {`Chưa có danh sách bệnh nhân !`}
                      </Typography>
                    </Box>
                  }

                  {
                    listPatients?.data?.length == 0 && textSearch ?
                      <Box textAlign='center'>
                        <Typography variant='subtitle2'>
                          {`Không tìm thấy kết quả!`}
                        </Typography>
                      </Box>
                      :
                      listPatients?.data?.map((patient, index) => {
                        return (
                          <ListItem onClick={onClickPatient(patient)} button key={index}>
                            <ListItemAvatar>
                              {
                                patient?.gender == GenderEnum.male ?
                                  <img src={IconConfig.gender.male} width={24} height={24} alt='male icon' />
                                  :
                                  <img src={IconConfig.gender.female} width={24} height={24} alt='female icon' />
                              }
                            </ListItemAvatar>

                            <ListItemText
                              primary={<Typography variant='subtitle1' style={{ fontWeight: 700 }}>{`${patient?.code}`}</Typography>}
                              title={patient?.code + '-' + patient?.address}
                              secondary={
                                <>
                                  <Typography variant='body2' component='span'>{"Địa chỉ: " + patient?.address}</Typography>
                                  <br></br>
                                  {
                                    patient?.description &&
                                    <Typography variant='body2' component='span'>{'Liên quan đến ổ dịch: ' + (patient?.description)}</Typography>

                                  }
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
            <Box p={2} display='flex' alignItems='center' justifyContent='space-between' className='listPatientPagination'>
              {
                listPatients?.count <= 10 && listPatients?.count > 0 &&
                <Typography variant='subtitle2'>
                  {`Đang hiển thị ${listPatients?.count} kết quả`}
                </Typography>
              }
              {
                listPatients?.count > 10 &&
                <>
                  <Typography variant='subtitle2'>
                    {`Đang hiển thị kết quả: ${fromNumber} - ${toNumber} trong tổng số ${listPatients?.count} bệnh nhân`}
                  </Typography>
                  <TablePagination
                    component="div"
                    count={listPatients?.count || 0}
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
    </Box>
  )
}
BtnListPatients = forwardRef(BtnListPatients)
export default BtnListPatients;
