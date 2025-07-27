import { useState } from "react";
import emailjs from "emailjs-com";
import { useI18n } from "../providers/language";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const { t } = useI18n();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <section id="contact" className="card">
      <div className="container">
        <div className="col-md-8">
          <div className="row">
            <div className="section-title">
              <h2>{t("contact-title")}</h2>
            </div>
            {/* Mapa do Google */}
            <div className="col-md-6">
              <div className="map-responsive">
                <iframe
                  title="Google Map"
                  rel="noreferrer"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.4044134290182!2d-9.200271599999999!3d38.7036261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ecb574df6ed31%3A0x3357e735eff457c0!2sR.%20Paz%20%C3%A0%20Ajuda%2044%2C%201300-566%20Lisboa!5e0!3m2!1sen!2spt!4v1753617839009!5m2!1sen!2spt"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <form name="sentMessage" validate onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder={t("name")}
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder={t("email")}
                      required
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder={t("message")}
                      required
                      onChange={handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                                <button type="submit" className="btn btn-custom btn-lg">
                {t("contact-send-message")}
              </button>
                </div>
              </div>


            </form>
          </div>
        </div>
        <div className="col-md-3 col-md-offset-1 contact-info">
          <div className="contact-item">
            <h3>{t("contact-title")}</h3>
            <p>
              <span>
                <i className="fa fa-map-marker"></i> {t("address")}
              </span>
              {props.data ? props.data.addresses.map((address, index) => (
                <div key={index}>
                  <strong>{address.name}:</strong> {address.address}
                </div>
              )) : "loading"}
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-phone"></i> {t("phone")}
              </span>{" "}
              {props.data ? props.data.phone : "loading"}
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-envelope"></i> {t("email")}
              </span>{" "}
              {props.data ? props.data.email : "loading"}
            </p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="social">
              <ul>
                <li>
                  <a href={props.data ? props.data.instagram : "/"}
                   rel="noreferrer"
                    target="_blank">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href={props.data ? props.data.whatsapp : "/"}
                   rel="noreferrer"
                    target="_blank">
                    <i className="fa fa-whatsapp"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


