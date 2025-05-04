export const Image = ({ title, largeImage, smallImage, servicePrice, hover = false }) => {
  return (
    <div className="portfolio-item" style={{ position: "relative" }}>
      <div className={hover ? "hover-bg" : undefined}>
        <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
          {hover && (
            <div className="hover-text">
              <h4>{title}</h4>
            </div>
          )}
          <img src={smallImage} className="img-responsive" alt={title} />
          {/* Valor sobre a imagem */}
          {servicePrice && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#dd4f3c",
                padding: "6px 10px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {servicePrice}
            </div>
          )}
        </a>
      </div>
    </div>
  );
};
