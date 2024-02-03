import axios from "axios";
import welcome from "../assets/ecommerce.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Stack,Typography } from "@mui/material";
const Userpage = () => {
    const navigate=useNavigate();
    const[accountname,setAccountname]=useState("");
    useEffect(()=>{
        axios.post("/signup")
        .then(res=>{
          setAccountname(res.data.accountname)
        })
        .catch(err=>console.log(err))
    })
  return (
    <Container
      sx={{
        marginBlockStart: 8,
      }}
    >
     <Stack direction="column"justifyContent="center"alignItems="center"spacing={2}sx={{
        height:'60dvh'
     }}>
     <LazyLoadImage
      src={welcome}
      alt=""
      width="20%"
      height="auto"
     />
     <Typography variant="h4"textAlign="center">
        Hi,{accountname}. Welcome to Eyesome shopping, explore the glasswear now
     </Typography>
     <Button variant="outlined"size="small"onClick={()=>{
        navigate("/")
     }}>
        Shop now
     </Button>
     </Stack>
    </Container>
  );
};
export default Userpage;
