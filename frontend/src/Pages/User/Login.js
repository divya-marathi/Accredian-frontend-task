import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Alert,
  InputAdornment,
} from "@mui/material";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

function Login() {
  const navigate = useNavigate();
  const [isErrorMessages, setErrorMessages] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isPassword, setPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handling input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessages(true);
      return;
    }
    setErrorMessages(false);

    if (formData.password.length < 3) {
      setPassword(true);
      return;
    }
    setPassword(false);

    try {
      let response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      if (response.status === 200) {
        alert("Login success");
        window.localStorage.setItem("token", response.data.token);
        navigate("/");
      } else if (response.status === 203) {
        setPassword(true);
        return;
      } else {
        setEmail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card sx={{ maxWidth:500, margin: "auto", marginTop: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" mb={4}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                id="email"
                label="Email address"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
              />
              {isEmail && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  User not found!
                </Alert>
              )}

              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <RiEyeLine onClick={() => setShowPassword(false)} />
                      ) : (
                        <RiEyeOffLine onClick={() => setShowPassword(true)} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              {isPassword && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  Invalid!
                </Alert>
              )}
            </div>
            {isErrorMessages && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                All fields are required
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="success"              
              sx={{ marginTop: 2, marginLeft:25 }}
            >
              Log In
            </Button>
            <Typography variant="body2" mt={2}>
              Don't have an account?{" "}
              <MuiLink component={Link} to="/signup" color="primary">
                Sign up
              </MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
