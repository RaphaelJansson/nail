
export class WhatsApp {

    phone;
    message;
    
    constructor() {
        this.phone = "351910831473";
    }

    generateMessage(service, localization, date, time, t ) {
        this.message = `${t("default-message")} 
        * ${t("service")}: ${t(service)}
        * ${t("location")}: ${localization}
        * ${t("date")}: ${date}/${time}`
    }

    getUrl() {
        return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
    }

    sendMessage() {
        window.open(this.getUrl(), "_blank");
    }
}
