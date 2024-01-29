import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { style } from "@mui/system";

export default function GameCard(props) {
  const { roomId, img, title, isPlaying, totalPieceCount, curPlayerCount, maxPlayerCount } =
    props.data;

  const chipMessage = `${parseInt(maxPlayerCount / 2)} : ${parseInt(maxPlayerCount / 2)}`;
  return (
    <MyCard sx={{ display: "flex" }}>
      <CardMedia component="img" sx={{ width: 151 }} image={img} alt={title} />
      <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 2 }}>
        {props.category === "battle" && <MyChip label={chipMessage} />}
        <CardContent sx={{ width: "100%", paddingY: "15%" }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography sx={{ alignSelf: "end" }} component="div" variant="subtitle2">
              {totalPieceCount}pcs
            </Typography>
          </Box>

          <Divider sx={{ marginY: "3%" }} />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <RoomState component="div" variant="h5">
              {isPlaying ? "Playing" : "Waiting"}
            </RoomState>
            <Typography variant="h6" color="text.secondary" component="div">
              {curPlayerCount} / {maxPlayerCount}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </MyCard>
  );
}

const MyCard = styled(Card)`
  position: relative;
  &:hover {
    box-shadow: 5px 5px 10px lightgray;
  }
`;

const MyChip = styled(Chip)`
  position: absolute;
  top: 3%;
  right: 5%;
  align-self: end;
`;

const RoomState = styled(Typography)`
  font-weight: bold;
  color: ${(props) => {
    console.log(props);
    if (props.children === "Playing") {
      return "#f44336";
    } else {
      return "#3f51b5";
    }
  }};
`;
