import { useI18n } from "../../providers/language";

const WhatsAppButton = () => {
    const { t } = useI18n();
    const phone = "351910831473"; // Seu número com código do país
    const message = "Gostaria de agendar um horário";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <a href={url} target="_blank" className="btn btn-custom btn-lg page-scroll">
            {t("booking")}
        </a>
    );
};

export default WhatsAppButton;