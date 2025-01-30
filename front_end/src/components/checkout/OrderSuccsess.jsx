import styled from "styled-components";
import { Link } from "react-router-dom";



const OrderSuccess = () => {
  return (
    <SuccessContainer>
      <Message>🎉 Order Placed Successfully! 🎉</Message>
      <SubText>Thank you for shopping with us. Your order is being processed.</SubText>
      <Button to="/">Back to Home</Button>
    </SuccessContainer>
  );
};

export default OrderSuccess;
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f9f9f9;
  text-align: center;
`;

const Message = styled.h1`
  font-size: 2rem;
  color: #28a745;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const Button = styled(Link)`
  text-decoration: none;
  background: #007bff;
  color: #fff;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 20px;
  &:hover {
    background: #0056b3;
  }
`;
