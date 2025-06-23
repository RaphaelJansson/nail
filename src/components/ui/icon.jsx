export const Icon = ({ desc, title, image, width}) => {
  return (
    <div className="icon">
          <img  style={{ width: width }} src={image} className="img-responsive" alt={title} />
          {title && <h3>{title}</h3>}
          {desc && <p>{desc}</p>}
    </div>
  );
};
