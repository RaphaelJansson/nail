import React from "react";
import { InlineWidget } from "react-calendly";

export const Booking = () => (
  <section id="agendamento" className="card">
    <div className="container">
      <h2>Agende sua sessão</h2>
      <div style={{ height: "700px" }}>
      <InlineWidget url="https://calendly.com/raphaeljansson/30min"
      prefill={{
        customAnswers: {
          a1: `Serviço selecionado: `,
        },
      }}
      styles={{
        height: "100%",
      }} 
      pageSettings={{
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: 'dd4f3c',
        textColor: '4d5055'
      }}/>
    </div>
    </div>
  </section>
);