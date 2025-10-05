import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ReturnFAQ() {
  const { t } = useTranslation("returnFaq", { returnObjects: true });
  const [activeQuestion, setActiveQuestion] = useState(null);

  // ✅ Fetch the array from i18n JSON
  const data = t("returnFaq");

  const toggleAnswer = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <Container>
      <div>
        {data?.map((item) => (
          <div className="content" key={item.id}>
            <button
              className="button-container"
              onClick={() => toggleAnswer(item.id)}
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

export default ReturnFAQ;

export const Container = styled.div`
 
 

  h2 {
    color: #130161;
    margin-left: 15px;
    font-size: 1.4rem;
    text-decoration:underline;
  }

  ul {
    margin-left: 20px;
    padding-left: 20px;
  }

  li {
    list-style-type: circle;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .text {
    font-size: 15px;
    margin-left: 15px;
    margin-right:15px;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .button-container {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 10px 0;
    cursor: pointer;
    justify-content: space-between;
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    transition: background 0.3s;
  }

  .button-container:hover {
    background: #f9f9f9;
  }

  .button-container span {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  .show {
    transition: max-height 0.5s ease-in-out, opacity 0.5s;
    overflow: hidden;
    padding: 10px 0;
  }

  .content {
    border-bottom: 1px solid lightgray;
    padding: 15px 0;
    background: #fff;
    margin-bottom: 8px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .content:last-child {
    border-bottom: none;
  }

  .arrow-icon {
    font-size: 1.2rem;
    color: gray;
    margin-right: 10px;
  }

  @media only screen and (max-width: 820px) {
    h2 {
      font-size: 1.5rem;
    }

    .button-container {
      font-size: 0.95rem;
    }

    .text {
      font-size: 14px;
    }

    li {
      font-size: 13px;
    }

    .arrow-icon {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 600px) {
    h2 {
      font-size: 1rem;
      margin-left: 10px;
    }

    .button-container {
      font-size: 0.9rem;
      padding: 8px 0;
    }

    .text {
      font-size: 13px;
    }

    li {
      font-size: 12px;
    }

    .arrow-icon {
      font-size: 0.9rem;
    }
  }

  @media only screen and (max-width: 400px) {
    h2 {
      font-size: 0.9rem;
    }

    .button-container  span{
      font-size: 0.7rem;
      font-weight:bolder;
    }

    .text {
      font-size: 10px;
    }

    li {
      font-size: 9px;
    }

    .arrow-icon {
      font-size: 1rem;
    }
  }
`;
