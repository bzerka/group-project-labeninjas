import React from "react";
import styled from "styled-components";
import { Button, Icon } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";

const Container = styled.div`
  height: 100%;
  min-height: 89vh;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  gap: 30px;
`;

const TextTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #3c719f;
`;

const TextDatePrice = styled.p`
  font-size: 22px;
`;

const ContainerDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 450px;
  font-size: 20px;
`;

const ContainerFormasDePagamento = styled.div`
  display: flex;
  width: 450px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
`;

const FormasDePagamento = styled.p`
  background-color: #3c719f;
  border-radius: 20px;
  padding: 0 15px;
  color: white;
  font-size: 16px;
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 450px;
`;

export default class DetalhesJob extends React.Component {
  arrumarData = (data) => {
    return `${data.slice(8, -14)}-${data.slice(5, -17)}-${data.slice(0, -20)}`;
  };

  render() {
    const formas = this.props.formasPagamento.map((formas, index) => {
      return <FormasDePagamento key={index}>{formas}</FormasDePagamento>;
    });

    const renderizarDetalhes = this.props.detalhesJob.map((job) => {
      return (
        <MainContainer key={job.id}>
          <TextTitle>{job.title}</TextTitle>
          <TextDatePrice>
            {" "}
            Até <u>{this.arrumarData(job.dueDate)}</u> por{" "}
            <strong>R${job.price},00</strong>
          </TextDatePrice>
          <ContainerDescription>
            <p>{job.description}</p>
          </ContainerDescription>
          <ContainerFormasDePagamento>
            <p>Aceitamos:</p>
            {formas}
          </ContainerFormasDePagamento>
          <ContainerBotoes>
            {job.taken && (
              <Button
              isDisabled
                bg="#3c719f"
                color="white"
                colorScheme="blue"
                height="40px"
                width="450px"
                variant="solid"
                fontWeight="normal"
                fontSize="19"
                leftIcon={<Icon as={MdAddShoppingCart} w={5} h={5} />}
              >
                Serviço adicionado
              </Button>
            )}
            {job.taken || (
              <Button
                bg="#3c719f"
                color="white"
                colorScheme="blue"
                height="40px"
                width="450px"
                variant="solid"
                fontWeight="normal"
                fontSize="19"
                leftIcon={<Icon as={MdAddShoppingCart} w={5} h={5} />}
                onClick={() => this.props.updateJobTaken(job)}
              >
                Adicionar ao carrinho
              </Button>
            )}
            <Button
              color="#3c719f"
              colorScheme="blue"
              height="40px"
              width="450px"
              variant="outline"
              fontWeight="normal"
              fontSize="19"
              leftIcon={<Icon as={BsArrowLeftShort} w={5} h={5} />}
              onClick={() => this.props.mudarTela("contratarjob")}
            >
              Voltar para a lista
            </Button>
          </ContainerBotoes>
        </MainContainer>
      );
    });

    return <Container>{renderizarDetalhes}</Container>;
  }
}
