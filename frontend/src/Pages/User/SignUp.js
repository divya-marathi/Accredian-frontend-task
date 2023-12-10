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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function SignUp() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle password 
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // handle confirm password 
  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessages(true);
      return;
    }
    setErrorMessages(false);

    if (formData.password.length <= 3 || formData.password !== formData.confirmPassword) {
      setisPassword(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      if (response.status === 200) {
        alert("Registration success");
        window.localStorage.setItem("token", response.data.token);
        navigate("/");
      } else if (response.status === 204) {
        setEmail(true);
        return;
      } else {
        setisPassword(true);
        return;
      }
    } catch (error) {
      console.error("Error while registration:", error);
    }
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 500, margin: "auto", marginTop: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" mb={2}>
            Sign up now
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                id="username"
                label="User Name"
                variant="outlined"
                margin="normal"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                id="email"
                label="Email address"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={isEmail}
                helperText={isEmail && "Email already exists"}
              />

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
                error={isPassword}
                helperText={isPassword && "Passwords must match and be more than 3 characters"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={isPassword}
                helperText={isPassword && "Passwords must match and be more than 3 characters"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <FaEye/> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {errorMessages && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                All fields are required
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ maxWidth: 200, marginTop: 2, marginLeft: 25 }}
            >
              Sign up
            </Button>
            <Typography variant="body2" mt={2}>
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" color="primary">
                Login
              </MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignUp;
