import { AppData } from "../App";
import { useContext, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import error from "../assets/error.png";
import axios from "axios";
const Login = () => {

  const { mobile,dispatch } = useContext(AppData);
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const [showdialog, setShowdialog] = useState(false);
  const inputStyles = {
    width: mobile ? "100%" : 400,
    height: mobile ? 38 : 40,
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
  const buttonStyles = {
    width: inputStyles.width,
    backgroundColor: "#449DD1",
    "&:hover": {
      backgroundColor: "#449DD1",
    },
  };

  const sign_in_page = (
    <Box
      component="a"
      sx={{
        cursor: "pointer",
        textDecoration: "underline",
      }}
      onClick={() => document.startViewTransition(() => navigate("/signup"))}
    >
      Create-new
    </Box>
  );


  const login_validation = () => {
    if (Object.values(logindata).includes("")) {
      return null;
    } 
    else {
      axios
      .post("http://localhost:3000/login", { logindata })
      .then((res) => {
        console.log(res)
        if (res.data.status == "failed") {
          setShowdialog(true);
        }
        else if(res.data.status=="sucess"){
          navigate("/userpage")
          dispatch({type:'logged-in'})
        }
      })
      .catch((err) => console.log(err))
  }
}
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
          <Grid item lg={6} xs={12} sx={{ marginTop: mobile ? 5 : 22 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Box
                component="input"
                type="email"
                placeholder="Email"
                sx={inputStyles}
                value={logindata.email}
                onChange={(e) => {
                  setLogindata({ ...logindata, email: e.target.value });
                }}
                id="email"
              />
              <Box
                component="input"
                type="password"
                placeholder="Password"
                sx={inputStyles}
                value={logindata.password}
                onChange={(e) => {
                  setLogindata({ ...logindata, password: e.target.value });
                }}
              />
              <br />
              <Button
                variant="contained"
                size="small"
                sx={buttonStyles}
                onClick={login_validation}
              >
                Login
              </Button>
              <Typography variant="body1" sx={{ color: "#828c97" }}>
                Dont have an account? {sign_in_page}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={showdialog} onClose={() => setShowdialog(false)}>
        <DialogContent>
          <LazyLoadImage src={error} height="100%"width="100%"/>
          <Typography variant="body1">
            User not found. Please sign up
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="text"
            onClick={() =>{
              setShowdialog(false);
              setLogindata({
                email:'',
                password:''
              })
            }}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login
