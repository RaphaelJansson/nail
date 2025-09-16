
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

    generateMultipleServicesMessage(services, localization, date, time, t) {
        const servicesList = services.map(service =>
            `  - ${t(service.service)} (${service.price[localization]})`
        ).join('\n');

        const totalLabel = services.length === 1 ? t("service") : t("services");

        this.message = `${t("default-message")}

* ${totalLabel}:
${servicesList}

* ${t("location")}: ${localization}
* ${t("date")}: ${new Date(date).toLocaleDateString("pt-PT")}
* ${t("time")}: ${time}`;
    }

    getUrl() {
        return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
    }

    sendMessage() {
        window.open(this.getUrl(), "_blank");
    }
}
