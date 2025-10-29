// import * as React from 'react';
// import Box from '@mui/material/Box';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// type Anchor = 'top' | 'left' | 'bottom' | 'right';

// export default function SwipeableTemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer =
//     (anchor: Anchor, open: boolean) =>
//     (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event &&
//         event.type === 'keydown' &&
//         ((event as React.KeyboardEvent).key === 'Tab' ||
//           (event as React.KeyboardEvent).key === 'Shift')
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

//   const list = (anchor: Anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//         <p>hello</p>
      
//     </Box>
//   );

//   return (
//     <div>
//       {/* {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
//           <SwipeableDrawer
//             anchor={}
//             open={}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {/* {list(anchor)} */}
//           </SwipeableDrawer>
//         {/* </React.Fragment>
//       ))} */}
//     </div>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
// import { BarChart } from "@mui/x-charts";
import Barchat from "./Barchat"
import BarChartIcon from "@mui/icons-material/BarChart";

export default function RightDrawer() {
  // state for drawer open/close
const [open, setOpen] = React.useState(false);
//   const open=localStorage.getItem("open");
//   console.log(open);
  // toggle drawer function
  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
    setOpen(open);
    };

  // content inside the drawer
  const drawerContent = (
    <Box
      sx={{ width: 1000, p: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <p>Welcome! This is your right-side drawer.</p>
      <Barchat/>
       {/* <BarChart
      xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      height={300}
    /> */}
      <Button
        variant="contained"
        color="error"
        onClick={toggleDrawer(false)}
      >
        Close
      </Button>
    </Box>
  );

  return (
    <div>
      {/* Button to open drawer */}
      <Button variant="contained" onClick={toggleDrawer(true)}  startIcon={<BarChartIcon />} 
      sx={{ height: 50}}
      // sx={{ backgroundColor:"#1976d2","&:hover":{backgroundColor:"#1565c0",borderRadius:3,textTransform:"none",fontWeight:"bold",px:2.5}}}
      >
        Stats
      </Button>

      {/* SwipeableDrawer component */}
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drawerContent}
      </SwipeableDrawer>
    </div>
  );
}
