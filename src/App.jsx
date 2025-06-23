import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Contact } from "./components/contact";
import { Booking } from "./components/booking";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { I18nProvider } from "./providers/language";
import "./App.css";
import Register from "./components/register";
import { Why } from "./components/why";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <I18nProvider>
      <Navigation />
      <Header />
      <Why data={landingPageData.Why} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Booking data={{ booking: landingPageData.Booking, services: landingPageData.Services }} />
      <Contact data={landingPageData.Contact} />
      <Register />
    </I18nProvider>
  );
};

export default App;
