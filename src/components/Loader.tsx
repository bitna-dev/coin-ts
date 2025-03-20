import { HashLoader } from "react-spinners";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <HashLoader color="#fdcb6e" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
export default Loader;
