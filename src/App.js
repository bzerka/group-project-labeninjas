import React from "react";
import axios from "axios";
import styled from "styled-components";
import Inicio from "./Components/Inicio";
import CadastrarJob from "./Components/CadastrarJob";
import ContratarJobs from "./Components/ContratarJobs";
import DetalhesJob from "./Components/DetalhesJob";
import Carrinho from "./Components/Carrinho";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaUserNinja } from "react-icons/fa";
import labeninjas from "./img/labeninjas.png";
import labeninjas2 from "./img/labeninjas2.png";
import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 5,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#b2e0f8",
              pointerEvents: "none",
              fontWeight: "thin",
              fontSize: "20px",
              mx: 3,
              px: 1,
              my: 1,
              transformOrigin: "left top",
            },
            label: {
              top: 0,
              left: 5,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#d2e2f1;",
              pointerEvents: "none",
              fontWeight: "thin",
              fontSize: "20px",
              mx: 3,
              px: 1,
              my: 1,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

const Container = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-color: #d2e2f1;
`;

const Header = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #386a98;
  margin-bottom: 5px;
  box-shadow: 2px 1px 8px 2px rgba(0, 0, 0, 0.15),
    0px 2px 1px -1px rgb(0 0 0 / 30%);
`;

const Header2 = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #386a98;
  margin-bottom: 5px;
  box-shadow: 2px 1px 8px 2px rgba(0, 0, 0, 0.15),
    0px 2px 1px -1px rgb(0 0 0 / 30%);
`;

const ContainerIconHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border-radius: 8px;
  padding: 4px 12px 4px 8px;
  &:hover {
    cursor: pointer;
  }
`;

const Imagem = styled.img``;

export default class App extends React.Component {
  state = {
    telaAtual: "inicio",
    jobs: [],
    detalhesJob: [],
    formasPagamento: [],
  };

  getAllJobs = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";

    const getAllJobs = axios.get(url, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    getAllJobs
      .then((response) => {
        this.setState({ jobs: response.data.jobs });
      })
      .catch((error) => {
        alert("failed");
        console.log(error.response);
      });
  };

  mudarTela = (tela) => {
    this.setState({ telaAtual: tela });
    if (tela === "contrato") {
      this.setState({ detalhesJob: [] });
    }
  };

  trocarTela = () => {
    switch (this.state.telaAtual) {
      case "inicio":
        return (
          <Inicio mudarTela={this.mudarTela} getAllJobs={this.getAllJobs} />
        );
      case "cadastrarjob":
        return <CadastrarJob pegarImagem={this.pegarImagem} />;
      case "contratarjob":
        return (
          <ContratarJobs
            updateJobTaken={this.updateJobTaken}
            adicionarCarrinho={this.adicionarCarrinho}
            mudarTela={this.mudarTela}
            imagensJob={this.state.imagensJob}
            arrumarData={this.arrumarData}
            jobs={this.state.jobs}
            getAllJobs={this.getAllJobs}
            getDetailsJob={this.getDetailsJob}
          />
        );
      case "detalhesjob":
        return (
          <DetalhesJob
            updateJobTaken={this.updateJobTaken}
            formasPagamento={this.state.formasPagamento}
            getDetailsJob={this.getDetailsJob}
            mudarTela={this.mudarTela}
            arrumarData={this.arrumarData}
            detalhesJob={this.state.detalhesJob}
          />
        );
      case "carrinho":
        return (
          <Carrinho
            updateMultipleJobFalse={this.updateMultipleJobFalse}
            getAllJobs={this.getAllJobs}
            jobs={this.state.jobs}
            updateJobFalse={this.updateJobFalse}
            carrinho={this.state.carrinho}
            mudarTela={this.mudarTela}
          />
        );
    }
  };

  getDetailsJob = (job) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${job.id}`;

    const detailsBody = axios.get(url, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    detailsBody
      .then((response) => {
        this.setState({
          detalhesJob: [response.data],
          formasPagamento: response.data.paymentMethods,
        });
        this.mudarTela("detalhesjob");
      })
      .catch((error) => {
        alert("failed");
      });
  };

  updateJobTaken = (job) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${job.id}`;
    const body = {
      taken: true,
    };
    const updateJob = axios.post(url, body, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    updateJob
      .then((response) => {
        alert("Serviço adicionado ao carrinho.");
        this.getAllJobs();
        if (this.state.telaAtual === "detalhesjob") {
          this.getDetailsJob(job);
        }
      })
      .catch((error) => {
        alert("failed");
      });
  };

  updateMultipleJobFalse = (job) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${job.id}`;
    const body = {
      taken: false,
    };
    const updateJob = axios.post(url, body, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    updateJob
      .then((response) => {})
      .catch((error) => {
        alert("failed");
      });
  };

  updateJobFalse = (job) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${job.id}`;
    const body = {
      taken: false,
    };
    const updateJob = axios.post(url, body, {
      headers: {
        Authorization: "ce5895af-8d7c-488c-9062-f353648c87b8",
      },
    });

    updateJob
      .then((response) => {
        alert("Serviço retirado do carrinho.");
        this.getAllJobs();
      })
      .catch((error) => {
        alert("failed");
      });
  };

  arrumarData = (obj) => {
    return `${obj.dueDate.slice(8, -14)}-${obj.dueDate.slice(
      5,
      -17
    )}-${obj.dueDate.slice(0, -20)}`;
  };

  render() {
    return (
      <ChakraProvider theme={theme}>
        <Container>
          {this.state.telaAtual === "inicio" && (
            <Header>
              <ContainerIconHeader onClick={() => this.mudarTela("inicio")}>
                <Imagem src={labeninjas} />
              </ContainerIconHeader>
            </Header>
          )}
          {(this.state.telaAtual === "cadastrarjob" ||
            this.state.telaAtual === "detalhesjob" ||
            this.state.telaAtual === "carrinho") && (
            <Header2>
              <ContainerIconHeader onClick={() => this.mudarTela("inicio")}>
                <Imagem src={labeninjas2} />
              </ContainerIconHeader>
            </Header2>
          )}
          {this.trocarTela()}
        </Container>
      </ChakraProvider>
    );
  }
}
