import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  textDanger: {
    color: '#e3342f',
    fontWeight: 600,
  },
  iconPlace: {
    minWidth: '36px'
  }
})

function PatientInfo({ data }) {

  const classes = useStyles()

  return (
    <Box>

      <Typography variant='subtitle2' className={classes.textDanger}>Loại địa điểm:</Typography>
      <Typography variant='body2'>{"Khu vực nhà bệnh nhân"}</Typography>

      {
        data?.code &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Mã bệnh nhân:</Typography>
          <Typography variant='body2'>{data?.code}</Typography>
        </>
      }

      {
        data?.address &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Địa chỉ:</Typography>
          <Typography variant='body2'>{data?.address}</Typography>
        </>
      }

      {
        data?.description &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Liên quan ổ dịch:</Typography>
          <Typography variant='body2'>{data?.description}</Typography>
        </>
      }

      {
        data?.listBlockadeAreas?.length > 0 &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Khu vực phong tỏa liên quan:</Typography>
          <Box>
            {
              data?.listBlockadeAreas?.map((area, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar className={classes.iconPlace}>
                      <img src={area?.iconUrl} alt='icon' width={12} height={12} />
                    </ListItemAvatar>

                    <ListItemText
                      title={area?.name}
                      primary={<Typography variant='body2'>{`${area?.name}`}</Typography>}
                      primaryTypographyProps={
                        {
                          noWrap: true,
                        }
                      }
                    />
                  </ListItem>
                )
              })
            }
          </Box>
        </>
      }

      {
        data?.listRelatedPlace?.length > 0 &&
        <>
          <Typography variant='subtitle2' className={classes.textDanger}>Địa điểm dịch tể liên quan:</Typography>
          <Box>
            {
              data?.listRelatedPlace?.map((place, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar className={classes.iconPlace}>
                      <img src={place?.iconUrl} alt='icon' width={24} height={24} />
                    </ListItemAvatar>

                    <ListItemText
                      title={place?.name}
                      primary={<Typography variant='body2'>{`${place?.name}`}</Typography>}
                      primaryTypographyProps={
                        {
                          noWrap: true,
                        }
                      }
                    />
                  </ListItem>
                )
              })
            }
          </Box>
        </>
      }

    </Box>
  )
}

PatientInfo.propTypes = {
  //
};

export default PatientInfo;
