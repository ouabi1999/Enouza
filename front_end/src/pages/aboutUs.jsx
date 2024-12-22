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
                            Enouza is a retail experience created for fans of all things Japanese lifestyle and culture.
                            We carry exclusive officially licensed apparel, accessories, and more.
                            The store is run by our namesake herself, Enouza, and her fuzzy little companion,
                            They’re here to make sure you feel welcome and find everything you’re looking for.
                        </p>
                        <p>
                            We carry 100% officially licensed EXCLUSIVE apparel, accessories,
                            and more from the biggest names in anime like Dragon Ball Z,
                            Cowboy Bebop, My Hero Academia, Crunchyroll, and many more.
                            We started Enouza to create one spot for all anime fans
                            to find cool anime goods — because there wasn’t one.
                            We’re all about experience, lifestyle, and bringing anime into the bigger conversation.
                        </p>
                        <p>
                            We are here to make sure you feel welcome and find everything you’re looking for.
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