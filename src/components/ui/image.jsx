import { useState, useEffect } from "react";
import { useI18n } from "../../providers/language";

export const Image = ({ title, smallImage, hover = false, price = false }) => {
  const [hoverActive, setHoverActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

     const { t } = useI18n();

  useEffect(() => {
    // detecta se está em mobile
    setIsMobile(window.innerWidth <= 767);
  }, []);

  function handleClick() {
    if (isMobile && !hoverActive) {
      setHoverActive(true);
    }
  }

  return (
    <div
      className="portfolio-item"
      style={{ position: "relative" }}
      onClick={handleClick}
    >
      <div className={hover ? "hover-bg" : undefined}>
        {hover && (
          <div className="hover-text">
            <h4>{title}</h4>
            {(!isMobile || hoverActive) && (
             <a 
             href="#booking" 
             className="btn btn-custom page-scroll"
             style={{ padding: "7px 17px", fontSize: "11px" }}>
                {t("consult")}
              </a>
            )}
          </div>
        )}
        <img src={smallImage} className="img-responsive" alt={title} />
        {price && <div className="euro-overlay">€</div>}
      </div>
    </div>
  );
};
