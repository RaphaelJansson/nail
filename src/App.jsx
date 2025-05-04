import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Contact } from "./components/contact";
import { Booking } from "./components/booking";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { I18nProvider } from "./providers/language";
import "./App.css";
import Register from "./components/register";

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
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Booking />
      <Contact data={landingPageData.Contact} />
      <Register />
    </I18nProvider>
  );
};

export default App;
