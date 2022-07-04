import React from "react";
import styled from "styled-components";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { GiNinjaStar } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Container = styled.div`
  height: 100%;
  width: 100%;
  min-height: 86.2vh;
  background-color: #d2e2f1;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0 30px 0;
`;

const ContainerIcon = styled.div`
  width: 100%;
  display: flex;
  padding-left: 50px;
  justify-content: center;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const ContainerIcon2 = styled.div`
  width: 100%;
  padding-left: 55px;
  display: none;

  @media screen and (max-width: 480px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const TextoHome = styled.p`
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
  margin-top: 10px;
  padding-bottom: 10px;

  @media screen and (max-width: 480px) {
    margin-top: 30px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 35px;

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 60px;
  }
`;

export default class Inicio extends React.Component {
  render() {
    return (
      <Container>
        <MainContainer>
          <ContainerIcon>
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_sg3zxa.json"
              style={{ height: "350px", width: "350px", marginRight: "50px" }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          </ContainerIcon>
          <ContainerIcon2>
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_sg3zxa.json"
              style={{ height: "230px", width: "230px", marginRight: "50px" }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          </ContainerIcon2>
          <TextoHome>O talento certo, no momento certo!</TextoHome>
          <ContainerButtons>
            <Button
              bg="#3c719f"
              color="white"
              colorScheme="blue"
              height="45px"
              size="md"
              fontWeight="medium"
              fontSize="22"
              variant="solid"
              leftIcon={<Icon as={GiNinjaStar} w={6} h={6} />}
              onClick={() => this.props.mudarTela("cadastrarjob")}
            >
              Quero ser um ninja
            </Button>
            <Button
              bg="#3c719f"
              color="white"
              colorScheme="blue"
              size="md"
              height="45px"
              variant="solid"
              fontWeight="medium"
              fontSize="22"
              leftIcon={<Icon as={GiRunningNinja} w={6} h={6} />}
              onClick={() => this.props.mudarTela("contratarjob")}
            >
              Contratar um ninja
            </Button>
          </ContainerButtons>
        </MainContainer>
      </Container>
    );
  }
}
