import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
export const BackButtom: React.FC = (): React.ReactElement => {
  const history = useHistory();
  const handleClickButton = () => {
    history.goBack();
  };
  return (
    <IconButton
      onClick={handleClickButton}
      style={{ marginRight: '30px', padding: '0px' }}
      color="primary">
      <ArrowBackIcon />
    </IconButton>
  );
};
