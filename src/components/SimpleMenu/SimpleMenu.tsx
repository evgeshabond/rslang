import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    console.log((event.target as HTMLElement).textContent);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Уровень
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>1</MenuItem>
        <MenuItem onClick={handleClose}>2</MenuItem>
        <MenuItem onClick={handleClose}>3</MenuItem>
        <MenuItem onClick={handleClose}>4</MenuItem>
        <MenuItem onClick={handleClose}>5</MenuItem>
        <MenuItem onClick={handleClose}>6</MenuItem>
      </Menu>
    </div>
  );
}
