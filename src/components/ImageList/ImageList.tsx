import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Clear';

import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles({
  imagesList: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imageListItem: {
    position: 'relative',
    width: 50,
    height: 50,
    '&:hover': { '& $removeImgBtn': { backgroundColor: 'red', opacity: 1 } },
    marginRight: 10,
    '& svg': { fill: 'white', fontSize: 20 },
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      borderRadius: 6,
    },
  },

  removeImgBtn: {
    top: -3,
    right: -5,
    position: 'absolute',
    width: 5,
    height: 5,
    padding: 10,
    opacity: 0,
  },
});
interface ImageListProps {
  images: string[];
  removeImage?: (url: string) => void;
}
export const ImageList: React.FC<ImageListProps> = ({
  images,
  removeImage,
}): React.ReactElement => {
  const classes = useStyles();
  if (!images.length) {
    return <></>;
  }
  return (
    <div className={classes.imagesList}>
      {images.map((url) => (
        <div key={url} className={classes.imageListItem}>
          <img src={url} alt="Photo" />
          {removeImage && (
            <IconButton
              className={classes.removeImgBtn}
              onClick={(): void => removeImage(url)}>
              <RemoveIcon />
            </IconButton>
          )}
        </div>
      ))}
    </div>
  );
};
