import { CssBaseline, styled } from "@mui/material";
import PlaceToVisit from "components/mui_styled/PlaceToVisit";
import React from "react";
import Header from "./../components/mui_styled/Header";

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const LandingPage = () => {
  return (
    <Root>
      <CssBaseline/>
      <Header />
      <PlaceToVisit />
    </Root>
  );
};
export default LandingPage;
