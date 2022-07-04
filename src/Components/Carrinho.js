import React from "react";
import styled from "styled-components";
import { CloseButton, Icon, Button } from "@chakra-ui/react";
import { TbArrowBackUp } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Container = styled.div`
  height: 100%;
  width: 100%;
  min-height: 89.2vh;
  background-color: #d2e2f1;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 80vh;
  padding: 20px;
  gap: 30px;

  @media screen and (max-width: 480px) {
  width: 100%;
  padding: 0;
  margin: 0;
  gap: 0;
  }  
`;

const ContainerProdutos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 550px;
  height: 60px; 
  font-size: 18px;
  background-color: #bcd8f3;
  border-radius: 4px;
  padding: 0 15px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  
  @media screen and (max-width: 480px) {
  width: 100%;
  }  

`;

const ContainerProdutoPrecoRemover = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ContainerCarrinhoVazio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const TextCarrinhoVazio = styled.p`
  font-size: 24px;
  color: #3c719f;
`;

const ContainerFinalizarCompra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
  width: 100%;
  }  
`
const TextFinalizarCompra = styled.p`
  font-weight: bold;
  font-size: 22px;

  @media screen and (max-width: 480px) {
  font-size: 18px;
  }  
`

const ContainerCarrinhoNaoVazio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 480px) {
  width: 90%;
  }  
`;

export default class Carrinho extends React.Component {
  removerFinalizandoCompra = (array) => {
    for (let job of array) {
      this.props.updateMultipleJobFalse(job);
    }
    alert("Compra finalizada!");
    this.props.getAllJobs();
  };

  render() {
    const arrayJobs = this.props.jobs
      .filter((job) => {
        return job.taken;
      })
      .map((job) => {
        return job;
      });

    const renderizarCarrinho = this.props.jobs
      .filter((job) => {
        return job.taken;
      })
      .map((job) => {
        return (
          <ContainerProdutos key={job.id}>
            <p>{job.title}</p>
            <ContainerProdutoPrecoRemover>
              <p>R$ {job.price}</p>
              <CloseButton onClick={() => this.props.updateJobFalse(job)} />
            </ContainerProdutoPrecoRemover>
          </ContainerProdutos>
        );
      });

    const somaPrecos = this.props.jobs
      .filter((job) => {
        return job.taken;
      })
      .map((job) => job.price)
      .reduce((prev, curr) => prev + curr, 0);

    return (
      <Container>
        <MainContainer>
          {renderizarCarrinho.length === 0 ? (
            <ContainerCarrinhoVazio>
              <Icon
                as={AiOutlineShoppingCart}
                width={230}
                height={230}
                marginRight="5"
                color="#3c719f"
                marginTop="20"
              />
              <TextCarrinhoVazio>Seu carrinho está vazio!</TextCarrinhoVazio>
              <Button
                bg="#3c719f"
                color="white"
                colorScheme="blue"
                height="35px"
                variant="solid"
                fontWeight="thin"
                fontSize="18"
                marginTop="5"
                leftIcon={<Icon as={TbArrowBackUp} w={5} h={5} />}
                onClick={() => this.props.mudarTela("contratarjob")}
              >
                Voltar
              </Button>
            </ContainerCarrinhoVazio>
          ) : (
            <ContainerCarrinhoNaoVazio>
              {renderizarCarrinho}
              <Button
                bg="#3c719f"
                color="white"
                colorScheme="blue"
                height="40px"
                variant="solid"
                fontWeight="thin"
                fontSize="19"
                width="30%"
                marginLeft="70%"
                paddingRight="10"
                leftIcon={<Icon as={TbArrowBackUp} w={7} h={7} />}
                onClick={() => this.props.mudarTela("contratarjob")}
              >
                Voltar
              </Button>
              <ContainerFinalizarCompra>
                <TextFinalizarCompra>Total: R${somaPrecos},00</TextFinalizarCompra>
                <Button
                  bg="#3c719f"
                  color="white"
                  colorScheme="blue"
                  height="40px"
                  variant="solid"
                  fontWeight="thin"
                  fontSize="19"
                  onClick={() => this.removerFinalizandoCompra(arrayJobs)}
                >
                  Finalizar Compra
                </Button>
              </ContainerFinalizarCompra>
            </ContainerCarrinhoNaoVazio>
          )}
        </MainContainer>
      </Container>
    );
  }
}
