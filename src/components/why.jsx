import React from "react";
import { useI18n } from "../providers/language";
import { Icon } from "./ui/icon";

export const Why = (props) => {
  const { t } = useI18n();
  return (
    <div id="why" className="text-center card">
      <div className="container">
        <div className="section-title">
          <h2>{t("why-title")}</h2>
        </div>
        <div className="row justify-content-center text-center">
          {props.data
            ? props.data.map((d, i) => (
              <div key={i} className="col-xs-6 col-sm-4 col-md-4 col-lg-3 mb-4">
                <Icon
                  title={t(d.title)}
                  desc={t(d.paragraph)}
                  image={d.image}
                  width="100px"
                />
                <h3>{d.service}</h3>
              </div>
            ))
            : "loading"}
        </div>

      </div>
    </div>

  );
};
