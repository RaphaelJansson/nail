import React from "react";
import { Image } from "./image";

export const Services = (props) => {
  return (
    <div id="services" className="text-center card">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div >
          {props.data
            ? props.data.map((d, i) => (
              <div
                key={`${d.title}-${i}`}
                className="col-sm-5 col-md-4 col-lg-4"
              >
                <div className="card-item">
                <Image
  title={d.title}
  largeImage={d.largeImage}
  smallImage={d.smallImage}
  servicePrice={d.price}
/>
                  <h3 style={{ color: "#dd4f3c" }}>{d.service}</h3>
                </div>
              </div>
            ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
