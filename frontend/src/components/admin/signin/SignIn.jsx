import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "../../../Redux/store";
import { setAdminDetails } from "../../../Redux/features/adminSlice";
import instance from "../../../axios";


export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submit behavior

    try {
      const response = await instance.post(
        "/admin",
        formData
      ); // send the form data to the backend using axios.post
      console.log(response.data); // log the response data
      const json = response.data;
      localStorage.setItem("admin", JSON.stringify(json));

      dispatch(setAdminDetails(json));
    } catch (error) {
      console.error(error); // handle the error
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img
          src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                id="email"
                name="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
              <Input
                type="password"
                label="Password"
                size="lg"
                id="password"
                name="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                fullWidth
                className="text-gray-700"
                type="submit"
              >
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}

export default SignIn;
