import React, { useLayoutEffect} from 'react'
import styled from 'styled-components'
import HeadeSeo from "../../common/HeadeSeo";

 function AboutUs() {
    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0,});
      }, [])
 

        return (
                <Container>
                    <HeadeSeo title = " Enouza - about us"/>
                <div className="about_container">
                    
                    <div className="about_section">
                    <h1>About us</h1>
                        <p>
                        Welcome to Enouza, your trusted marketplace for trading essentials and beyond. At Enouza, we believe in empowering our customers by offering high-quality products designed to provide value and benefits every single day.
                        </p>
                        <p>
                        Our mission is simple: to deliver reliable solutions that cater to your needs, whether you're diving into trading or seeking innovative tools to enhance your lifestyle. Each product we offer is carefully selected to ensure it aligns with our commitment to quality and customer satisfaction.
                        </p>
                        <p>
                        Enouza is more than just a store—it's a platform dedicated to your success. We understand that each day brings new opportunities, and with the right products, you can seize them effortlessly.
                        </p>
                        <p>
                        Thank you for choosing Enouza. We're here to support your journey with excellent products, seamless shopping experiences, and a commitment to your satisfaction.
                        </p>

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