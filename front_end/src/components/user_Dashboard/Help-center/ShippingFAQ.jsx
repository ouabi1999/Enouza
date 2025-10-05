import React, { useState } from "react";
import { Container } from "./ReturnFAQ";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ShippingFAQ() {
  const { t } = useTranslation("shippingFaq", { returnObjects: true });
  const [activeQuestion, setActiveQuestion] = useState("");

  // ✅ load array directly from i18n
  const data = t("shippingFaq");

  const showAnswer = (id) => {
    setActiveQuestion(activeQuestion === id ? "" : id);
  };

  return (
    <Container>
      <div>
        {Array.isArray(data) &&
          data.map((item, index) => (
            <div className="content" key={index}>
              <button
                className="button-container"
                onClick={() => showAnswer(item.id)}
              >
                <span>
                  {activeQuestion === item.id ? (
                    <KeyboardArrowDownIcon className="arrow-icon" />
                  ) : (
                    <KeyboardArrowRightIcon className="arrow-icon" />
                  )}
                </span>
                <span>{item.question}</span>
              </button>

              {activeQuestion === item.id && (
                <div className="show">
                  {item.answer?.paragraphe?.map((p, idx) => (
                    <div className="text" key={idx}>
                      <p>{p}</p>
                    </div>
                  ))}

                  <ul>
                    {item.answer?.list?.map((li, idx) => (
                      <li key={idx}>{li}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
}

export default ShippingFAQ;
