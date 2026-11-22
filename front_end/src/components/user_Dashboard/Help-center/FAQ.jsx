import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO/SEO"
function FAQ() {
  const { t: globalT, i18n } = useTranslation();

  const { t: shippingT } = useTranslation();
  const { t: returnT } = useTranslation();

  const [activeShipping, setActiveShipping] = useState(null);
  const [activeReturn, setActiveReturn] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const shippingFaqData = shippingT("shippingFaq", {
    returnObjects: true,
  });

  const returnFaqData = returnT("returnFaq", {
    returnObjects: true,
  });

  const isRTL = i18n.dir() === "rtl";

  const toggleShipping = (id) => {
    setActiveShipping((current) =>
      current === id ? null : id
    );
  };

  const toggleReturn = (id) => {
    setActiveReturn((current) =>
      current === id ? null : id
    );
  };

  return (
    <Container dir={isRTL ? "rtl" : "ltr"}>
      
     <SEO
      title="Frequently Asked Questions"
      description="Find answers to common questions about Enouza shipping, returns, refunds, orders, and our luxury lighting products."
      canonical="/faq"
    />

      <Header>
        <MainHeader>
          {globalT("profile.enouza_faq")}
        </MainHeader>

        <HeaderDescription>
          {globalT("footer.help.enouza_faq_description", {
            defaultValue:
              "Find answers to the questions we receive most often.",
          })}
        </HeaderDescription>
      </Header>

      <FAQSection>

        <SectionHeading>

          <SectionTitle>
            {globalT("footer.help.shipping", {
              defaultValue: "Shipping",
            })}
          </SectionTitle>
        </SectionHeading>

        {Array.isArray(shippingFaqData) &&
          shippingFaqData.map((item, index) => {
            const isOpen =
              activeShipping === item.id;

            return (
              <FAQItem
                key={item.id || index}
              >

                <QuestionButton
                  type="button"
                  onClick={() =>
                    toggleShipping(item.id)
                  }
                  aria-expanded={isOpen}
                >

                  <span>{item.question}</span>
                  <KeyboardArrowDownIcon aria-hidden="true" />

                </QuestionButton>


                {isOpen && (
                  <Answer>

                    {item.answer?.paragraphe?.map(
                      (paragraph, idx) => (
                        <p key={idx}>
                          {paragraph}
                        </p>
                      )
                    )}

                    {item.answer?.list?.length > 0 && (
                      <AnswerList>
                        {item.answer.list.map(
                          (listItem, idx) => (
                            <li key={idx}>
                              {listItem}
                            </li>
                          )
                        )}
                      </AnswerList>
                    )}

                  </Answer>
                )}

              </FAQItem>
            );
          })}

      </FAQSection>

      <FAQSection>

        <SectionHeading>

          <SectionTitle>
            {globalT("footer.help.returns", {
              defaultValue: "Returns",
            })}
          </SectionTitle>
        </SectionHeading>

        {Array.isArray(returnFaqData) &&
          returnFaqData.map((item, index) => {
            const isOpen =
              activeReturn === item.id;

            return (
              <FAQItem
                key={item.id || index}
              >

                <QuestionButton
                  type="button"
                  onClick={() =>
                    toggleReturn(item.id)
                  }
                  aria-expanded={isOpen}
                >

                  <span>{item.question}</span>
                  <KeyboardArrowDownIcon aria-hidden="true" />

                </QuestionButton>


                {isOpen && (
                  <Answer>

                    {item.answer?.paragraphe?.map(
                      (paragraph, idx) => (
                        <p key={idx}>
                          {paragraph}
                        </p>
                      )
                    )}

                    {item.answer?.list?.length > 0 && (
                      <AnswerList>
                        {item.answer.list.map(
                          (listItem, idx) => (
                            <li key={idx}>
                              {listItem}
                            </li>
                          )
                        )}
                      </AnswerList>
                    )}

                  </Answer>
                )}

              </FAQItem>
            );
          })}

      </FAQSection>

    </Container>
  );
}

export default FAQ;


const Container = styled.main`
  --faq-line: #e6e0d7;
  --faq-muted: #625d55;
  width: min(calc(100% - 32px), 760px);
  margin-inline: auto;
  padding-block: clamp(32px, 6vw, 72px);
  color: #24211e;
`;

const Header = styled.header`
  margin-block-end: clamp(32px, 5vw, 52px);
  text-align: center;
`;

const MainHeader = styled.h1`
  margin: 0;
  font: 400 clamp(28px, 5vw, 46px) / 1.15 Georgia, serif;
`;

const HeaderDescription = styled.p`
  max-width: 52ch;
  margin: 12px auto 0;
  color: var(--faq-muted);
  font-size: 15px;
  line-height: 1.65;
`;

const FAQSection = styled.section`
  overflow: hidden;
  border: 1px solid var(--faq-line);
  border-radius: 10px;
  background: #fff;

  & + & {
    margin-block-start: 24px;
  }
`;

const SectionHeading = styled.div`
  padding: 14px clamp(16px, 4vw, 26px);
  background: #f7f5f0;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font: 400 22px / 1.25 Georgia, serif;
`;

const FAQItem = styled.div`
  border-block-start: 1px solid var(--faq-line);
`;

const QuestionButton = styled.button`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 54px;
  padding: 13px clamp(16px, 4vw, 26px);
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
  text-align: start;
  cursor: pointer;

  &:hover {
    background: #faf8f5;
  }

  &:focus-visible {
    outline: 2px solid #806547;
    outline-offset: -3px;
  }

  svg {
    color: var(--faq-muted);
    font-size: 20px;
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const Answer = styled.div`
  padding: 0 clamp(16px, 4vw, 26px) 18px;
  color: var(--faq-muted);
  font-size: 14px;
  line-height: 1.7;
  overflow-wrap: anywhere;

  p {
    margin: 0;
  }

  p + p {
    margin-block-start: 10px;
  }
`;

const AnswerList = styled.ul`
  margin: 10px 0 0;
  padding-inline-start: 20px;

  li + li {
    margin-block-start: 4px;
  }
`;
