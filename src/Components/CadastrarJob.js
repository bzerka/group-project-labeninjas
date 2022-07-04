import React from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  Button,
  ButtonGroup,
  Select,
  Icon,
  FormControl,
  FormLabel,
  CloseButton,
} from "@chakra-ui/react";
import { FaUserNinja } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

const Container = styled.div`
  height: 100%;
  width: 100%;
  min-height: 89.2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: #d2e2f1;
`

const Textoh1 = styled.p`
  margin-top: 40px;
  font-size: 55px;
  color: #3c719f;
  @media screen and (max-width: 480px) {
    font-size: 30px;
  }
`;

const ContainerRenderizarPagamento = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 500px;
  gap: 10px;
  padding-left: 10px;
  margin: 5px 0;
  justify-content: flex-start;

  @media screen and (max-width: 480px) {
    max-width: 200px;
  }
`;

const ContainerFormasPagamento = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: #3c719f;
  color: white;
  padding: 0 0 0 10px;
`;

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 480px) {
    max-width: 250px;
  }
`;

export default class CadastrarJob extends React.Component {
  state = {
    inputTitulo: "",
    inputDescricao: "",
    inputPreco: "",
    inputFormaPagamento: [],
    inputPrazo: "",
  };

  onChangeFormaPagamento = (e) => {
    const formaPagar = e.target.value;
    const formasPagamento = [...this.state.inputFormaPagamento, formaPagar];
    const arrUnique = [...new Set(formasPagamento)];

    this.setState({ inputFormaPagamento: arrUnique });
  };

  removePaymentMethod = (id) => {
    const novoArray = this.state.inputFormaPagamento.filter((forma, index) => {
      return id !== index;
    });
    this.setState({ inputFormaPagamento: novoArray });
  };

  createJob = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";
    const body = {
      title: this.state.inputTitulo,
      description: this.state.inputDescricao,
      price: Number(this.state.inputPreco),
      paymentMethods: this.state.inputFormaPagamento,
      dueDate: this.state.inputPrazo,
    };

    const createJob = axios.post(url, body, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    createJob
      .then((response) => {
        alert("Cadastrado com sucesso.");
      })
      .catch((error) => {
        alert("failed");
      });
    this.setState({
      inputTitulo: "",
      inputDescricao: "",
      inputPreco: "",
      inputFormaPagamento: "",
      inputPrazo: "",
    });
  };

  render() {
    let renderizarPagamento = [];

    if (this.state.inputFormaPagamento.length > 0) {
      renderizarPagamento = this.state.inputFormaPagamento
        .filter((forma) => {
          return forma != "none";
        })
        .map((forma, index) => {
          return (
            <ContainerFormasPagamento key={index}>
              <p>{forma}</p>
              <CloseButton onClick={() => this.removePaymentMethod(index)} />
            </ContainerFormasPagamento>
          );
        });
    }

    return (
      <Container>
        <Textoh1>Cadastre um serviço</Textoh1>
        <ContainerInputs>
          <Stack spacing={5} marginTop="15px">
            <InputGroup>
              <FormControl variant="floating" id="first-name">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserNinja />}
                  color="blue.400"
                />
                <Input
                  paddingLeft="10"
                  isInvalid
                  errorBorderColor="blue.300"
                  border="1px solid blue.300"
                  type="text"
                  placeholder=" "
                  value={this.state.inputTitulo}
                  onChange={(e) =>
                    this.setState({ inputTitulo: e.target.value })
                  }
                />
                <FormLabel color="gray.500" backgroundColor="white">Título</FormLabel>
              </FormControl>
            </InputGroup>
            <InputGroup>
              <FormControl variant="floating" id="first-name">
                <InputLeftElement
                  pointerEvents="none"
                  color="blue.400"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  paddingLeft="10"
                  isInvalid
                  errorBorderColor="blue.300"
                  border="1px solid blue.300"
                  placeholder=" "
                  type="number"
                  value={this.state.inputPreco}
                  onChange={(e) =>
                    this.setState({ inputPreco: e.target.value })
                  }
                />
                <FormLabel color="gray.500">Preço</FormLabel>
              </FormControl>
            </InputGroup>
            <InputGroup>
              <FormControl variant="floating" id="first-name">
                <InputLeftElement
                  pointerEvents="none"
                  color="blue.400"
                  fontSize="1.2em"
                  children={<MdOutlineDescription />}
                />
                <Input
                  paddingLeft="10"
                  isInvalid
                  errorBorderColor="blue.300"
                  border="1px solid blue.300"
                  placeholder=" "
                  type="text"
                  value={this.state.inputDescricao}
                  onChange={(e) =>
                    this.setState({ inputDescricao: e.target.value })
                  }
                />
                <FormLabel color="gray.500">Descrição</FormLabel>
              </FormControl>
            </InputGroup>
            <Select
              fontWeight="thin"
              fontSize="20px"
              isInvalid
              errorBorderColor="blue.300"
              border="1px solid blue.300"
              color="gray.500"
              onChange={this.onChangeFormaPagamento}
            >
              <option value="none">Selecione as formas de pagamento</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Cartão de Credito">Cartão de Crédito</option>
              <option value="Paypal">Paypal</option>
              <option value="Boleto">Boleto</option>
              <option value="Pix">Pix</option>
            </Select>
          </Stack>
          <ContainerRenderizarPagamento>
            {renderizarPagamento}
          </ContainerRenderizarPagamento>
          <Input
            isInvalid
            errorBorderColor="blue.300"
            border="1px solid blue.300"
            color="gray.500"
            placeholder="Prazo do Serviço"
            type="date"
            fontWeight="thin"
            fontSize="20px"
            marginTop="1"
            value={this.state.inputPrazo}
            onChange={(e) => this.setState({ inputPrazo: e.target.value })}
          />
          <Button
            bg="#3c719f"
            color="white"
            colorScheme="blue"
            size="md"
            height="40px"
            variant="solid"
            fontWeight="normal"
            fontSize="22"
            marginTop="5"
            paddingBot="5px"
            onClick={() => this.createJob()}
          >
            Cadastrar
          </Button>
        </ContainerInputs>
      </Container>
    );
  }
}
