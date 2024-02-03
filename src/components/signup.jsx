import { AppData } from "../App";
import { useContext, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const { mobile } = useContext(AppData);
  const navigate = useNavigate();
  const[signupValues,setSignupValues]=useState({
    username:'',
    email:'',
    password:''
  })
  const signup_validation=()=>{
    if(Object.values(signupValues).includes("")){
      return null
    }
    else{
      axios.post("http://localhost:3000/signup",{signup:signupValues})
      .then(res=>{
       if(res.statusText=="OK"){
        document.startViewTransition(()=>{
          navigate("/userpage")
        })
       }
      })
      .catch(err=>console.log(err))
    }
  }
  const inputStyles = {
    width:mobile?'100%':400,
    height:mobile?38:32,
    paddingLeft: 2,
    border: "none",
    boxShadow: 2,
    borderRadius: 0.8,
    backgroundColor: "#FFFFFB",
    "&::placeholder": {
      color: "grey",
      fontFamily: "helvetica",
      fontSize: 15,
    },
  };
  const buttonStyles={
    width:inputStyles.width,
    backgroundColor:'#449DD1',
    "&:hover":{
        backgroundColor:'#449DD1'
    }
  }
  const login_in_page = (
    <Box
      component="a"
      sx={{
        cursor: "pointer",
        textDecoration:'underline'
      }}
      onClick={() => document.startViewTransition(() => navigate("/login"))}
    >
      Login
    </Box>
  );
  return (
    <Container
      sx={{
        marginBlockStart: 8,
      }}
    >
      <Box
        sx={{
          width: mobile ? "100%" : 1000,
          height: mobile ? 300 : 600,
          boxShadow: mobile ? 0 : 4,
          display: "block",
          margin: "auto",
        }}
      >
        <Grid container>
          {!mobile && (
            <Grid item xs={6} lg={6} spacing={1.2}>
              <LazyLoadImage
                src="https://eyesome.netlify.app/static/media/bannerHero.b913ee7a0754b4966295.jpg"
                height="79.80%"
                width="100%"
                alt=""
                style={{
                  objectFit: "cover",
                  aspectRatio: 2 / 3,
                }}
              />
            </Grid>
          )}
          <Grid item lg={6} xs={12} sx={{ marginTop: mobile ? 5 : 22}}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
                 <Box
                component="input"
                type="name"
                placeholder="Username"
                sx={inputStyles}
                value={signupValues.username}
                onChange={(e)=>{
                  setSignupValues({...signupValues,username:e.target.value})
                }}
              />
              <Box
                component="input"
                type="email"
                placeholder="Email"
                sx={inputStyles}
                value={signupValues.email}
                onChange={(e)=>{
                  setSignupValues({...signupValues,email:e.target.value})
                }}
              />
              <Box
                component="input"
                type="password"
                placeholder="Password"
                sx={inputStyles}
                value={signupValues.password}
                onChange={(e)=>{
                  setSignupValues({...signupValues,password:e.target.value})
                }}
              />
              <br />
              <Button
                variant="contained"
                size="small"
                sx={buttonStyles}
                onClick={signup_validation}
              >
                Create Account
              </Button>
              <Typography variant="body1"sx={{color:'#828c97'}}>
                Already have an account? {login_in_page}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Signup;
