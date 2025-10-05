import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import HeadeSeo from "../../common/HeadeSeo";
import { useTranslation } from 'react-i18next';
function AboutUs() {
    const { t, i18n } = useTranslation("aboutus", { returnObjects: true });
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, });
    }, [])


    return (
        <Container>
            <HeadeSeo title={`Enouza - ${t("about.title")}`} />
            <div className="about_container">
                <div className="about_section">
                    <h1>{t("about.title")}</h1>
                    {t("about.paragraphs").map((p, idx) => (
                        <p key={idx}>{p}</p>
                    ))}
                </div>
            </div>
        </Container>

    )

}

export default AboutUs
const Container = styled.div`
     
     min-height: 80vh;
     margin:25px auto;
     background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width:95%;
    border-radius:4px;
    

  h1{
    display:flex;
     align-items:center;
     justify-content:center;
  }
.about_section{
   
    height: fit-content;
    padding:20px;
}
.about_section p{
    letter-spacing: 1px;
    line-height: 2rem;
    font-size: 1rem;
    font-weight: 600;
    font-size:15px;
}

`