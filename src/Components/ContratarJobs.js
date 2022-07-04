import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaUserNinja } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import labeninjas2 from "../img/labeninjas2.png";
import { Tooltip } from "@chakra-ui/react";

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: #d2e2f1;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0 20px 20px;
  justify-content: flex-start;
  background-color: #d2e2f1;
`;

const FiltrosContainer = styled.div`
  display: flex;
  background-color: #d2e2f1;
  padding: 20px 0 0 20px;
  width: 60%;
  gap: 30px;
  margin-left: 20%;
`;

const ContainerJob = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  box-shadow: 2px 1px 8px 2px rgba(0, 0, 0, 0.15),
    0px 2px 1px -1px rgb(0 0 0 / 30%);
  height: 180px;
  width: 310px;
  padding: 15px 0 0 0;
  background-color: #bcd8f3;
`;

const NomeJob = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #364e89;
`;

const DescricaoPrecoJob = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  gap: 10px;
`;

// const BotaoRemover = styled.div`
//   display: flex;
//   justify-content: end;
//   top: 0%;
//   position: relative;
// `;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #386a98;
  margin-bottom: 5px;
  box-shadow: 2px 1px 8px 2px rgba(0, 0, 0, 0.15),
    0px 2px 1px -1px rgb(0 0 0 / 30%);
`;

const DivInputBuscar = styled.div`
  background-color: #5c8cb9;
  border-radius: 8px;
  &:hover {
    background-color: #719ec9;
  }
`;

const ContainerIconHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  padding: 4px 12px 4px 8px;
  &:hover {
    cursor: pointer;
  }
`;

const Imagem = styled.img``;

const IconeCarrinho = styled.div`
  &:hover {
    cursor: pointer;
    border-radius: 4px;
    background-color: #5c8cb9;
  }
`;

export default class ContratarJobs extends React.Component {
  state = {
    inputValorMin: "",
    inputValorMax: "",
    inputBuscarTitulo: "",
    inputOrdenacao: "",
  };

  // Caso necessário remover um serviço
  // 
  // deleteJob = (id) => {
  //   const delJob = axios.delete(`https://labeninjas.herokuapp.com/jobs/${id}`, {
  //     headers: {
  //       Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
  //     },
  //   });

  //   delJob
  //     .then((response) => {
  //       alert("Deletado com sucesso.");
  //       this.props.getAlljobs();
  //     })
  //     .catch((error) => {
  //       alert("Job não deletado, tente novamente mais tarde.");
  //       console.log(error.response);
  //     });
  // };

  componentDidMount() {
    this.props.getAllJobs();
  }

  render() {
    const renderizarJobs = this.props.jobs
      .filter((obj) => {
        return (
          this.state.inputValorMin === "" ||
          obj.price >= this.state.inputValorMin
        );
      })
      .filter((obj) => {
        return (
          this.state.inputValorMax === "" ||
          obj.price <= this.state.inputValorMax
        );
      })
      .filter((obj) => {
        return (
          obj.title
            .toLowerCase()
            .includes(this.state.inputBuscarTitulo.toLowerCase()) ||
          obj.description
            .toLowerCase()
            .includes(this.state.inputBuscarTitulo.toLowerCase())
        );
      })
      .sort((obj, segundoobj) => {
        switch (this.state.inputOrdenacao) {
          case "crescente":
            return obj.price - segundoobj.price;
          case "decrescente":
            return segundoobj.price - obj.price;
          case "titulo":
            return obj.title.localeCompare(segundoobj.title);
          case "prazo":
            return new Date(obj.dueDate) - new Date(segundoobj.dueDate);
        }
      })
      .map((obj) => {
        return (
          <ContainerJob key={obj.id}>
            {/* <BotaoRemover>
              <button onClick={() => this.deleteJob(obj.id)}>X</button>
            </BotaoRemover> */}
            <NomeJob>{obj.title}</NomeJob>
            <DescricaoPrecoJob>
              <p align="center">
                Por <strong>R$ {obj.price}</strong>
              </p>
              <p>Disponível até {this.props.arrumarData(obj)}</p>
            </DescricaoPrecoJob>
            <Stack direction="row" margin="20px" gap="110px">
              <Button
                colorScheme="facebook"
                variant="ghost"
                size="sm"
                h={8}
                onClick={() => this.props.getDetailsJob(obj)}
              >
                VER DETALHES
              </Button>
              {obj.taken || (
                <Tooltip
                  hasArrow
                  label="Adicionar ao carrinho"
                  placement="bottom"
                  closeDelay={500}
                >
                  <div>
                    <Icon
                      onClick={() => this.props.updateJobTaken(obj)}
                      as={MdAddShoppingCart}
                      w={26}
                      h={26}
                      color="blue.700"
                      cursor="pointer"
                    />
                  </div>
                </Tooltip>
              )}
              {obj.taken && (
                <Tooltip
                  hasArrow
                  label="Já adicionado"
                  closeDelay={500}
                  placement="bottom"
                >
                  <div>
                    <Icon
                      as={MdAddShoppingCart}
                      w={26}
                      h={26}
                      color="blackAlpha.500"
                    />
                  </div>
                </Tooltip>
              )}
            </Stack>
          </ContainerJob>
        );
      });

    return (
      <Container>
        <Header>
          <ContainerIconHeader onClick={() => this.props.mudarTela("inicio")}>
            <Imagem src={labeninjas2} />
          </ContainerIconHeader>
          <DivInputBuscar>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="blue.100"
                fontSize="1.2em"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                placeholder="Buscar"
                _placeholder={{ opacity: 1, color: "white" }}
                type="text"
                variant="outline"
                border="none"
                focusBorderColor="none"
                color="white"
                width="350px"
                fontSize="18px"
                value={this.state.inputBuscarTitulo}
                onChange={(e) =>
                  this.setState({ inputBuscarTitulo: e.target.value })
                }
              />
            </InputGroup>
          </DivInputBuscar>
          <Tooltip hasArrow label="Ver carrinho" placement="bottom">
            <IconeCarrinho>
              <Icon
                as={MdOutlineShoppingCart}
                width="50px"
                height="35px"
                color="white"
                onClick={() => this.props.mudarTela('carrinho')}
              />
            </IconeCarrinho>
          </Tooltip>
        </Header>
        <FiltrosContainer>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="blackAlpha.700"
              fontSize="1.2em"
              children="R$"
            />
            <Input
              paddingLeft="9"
              placeholder="Valor mínimo"
              value={this.state.inputValorMin}
              onChange={(e) => this.setState({ inputValorMin: e.target.value })}
              type="number"
              isInvalid
              errorBorderColor="blackAlpha.400"
              border="1px solid blackAlpha.700"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="blackAlpha.700"
              fontSize="1.2em"
              children="R$"
            />
            <Input
              paddingLeft="9"
              placeholder="Valor máximo"
              value={this.state.inputValorMax}
              onChange={(e) => this.setState({ inputValorMax: e.target.value })}
              type="number"
              isInvalid
              errorBorderColor="blackAlpha.400"
              border="1px solid blackAlpha.700"
            />
          </InputGroup>
          <Select
            isInvalid
            errorBorderColor="blackAlpha.400"
            border="1px solid blackAlpha.700"
            color="blackAlpha.700"
            value={this.state.inputOrdenacao}
            onChange={(e) => this.setState({ inputOrdenacao: e.target.value })}
          >
            <option>Sem ordenação</option>
            <option value="crescente">Menor Valor</option>
            <option value="decrescente">Maior Valor</option>
            <option value="titulo">Título</option>
            <option value="prazo">Prazo</option>
          </Select>
        </FiltrosContainer>
        <MainContainer>{renderizarJobs}</MainContainer>
      </Container>
    );
  }
}
