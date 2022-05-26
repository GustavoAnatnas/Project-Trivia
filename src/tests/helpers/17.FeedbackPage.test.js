import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback'
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';

describe('Testa página Feedback itens do Requisito 12', () => { 
 test('Se é renderizada no caminho correto', () => { 
  const { history } = renderWithRouterAndRedux(<Login />);
  const QUESTIONS = 4;
  const USER_NAME = 'Aldous Huxley';
  const USER_EMAIL = 'aldousHuxley@gmail.com';

  const playButton = screen.getByTestId('btn-play');
  expect(playButton).toBeInTheDocument();
  expect(playButton.disabled).toBe(true);

  const nameInput = screen.getByTestId('input-player-name');
  const emailInput = screen.getByTestId('input-gravatar-email');
  userEvent.type(emailInput, USER_EMAIL);
  userEvent.type(nameInput, USER_NAME); 

  userEvent.click(playButton);

  // expect(history.location.pathname).toBe('/game');

  for(let i = 0; i < QUESTIONS; i+=1) {
   const correctAswer = screen.getByTestId('correct-answer');
   userEvent.click(correctAswer);
   const nextBtn = screen.getByTestId('btn-next');
   userEvent.click(nextBtn);
  }

  expect(history.location.pathname).toBe('/feedback');

 })
 test('Se as informações do jogador estão presente no Header', () => { 
  renderWithRouterAndRedux(<Feedback />);

  const gravatarImage = screen.getByTestId('header-profile-picture');
  const playerName = screen.getByTestId('header-player-name');
  const playerScore = screen.getByTestId('header-score');

  expect(gravatarImage).toBeInTheDocument();
  expect(playerName).toBeInTheDocument();
  expect(playerScore).toBeInTheDocument();
 })
 })
describe('Testa página Feedback itens do Requisito 13', () => { 
  test('Se a mensagem para o usuário é renderizada corretamente caso acerte menos de 3 perguntas', () => { 
   const INICIAL_STATE = {
    name: 'Aldous',
    assertions: 0,
    score: 0,
    gravatarEmail: 'aldousHuxley@gmail.com',
  }
  const { queryByTestId } = renderWithRouterAndRedux(<Feedback />, { initialState: INICIAL_STATE })

  const messageToUser = screen.getByText("Could be better...");

  expect(messageToUser).toBeInTheDocument();
  })
  test('Se a mensagem para o usuário é renderizada corretamente caso acerte mais de 3 perguntas', () => { 
  const { queryByTestId } = renderWithRouterAndRedux(<Feedback />, { initialState:{ rootReducer: {
   name: 'Aldous',
   assertions: 4,
   score: 320,
   gravatarEmail: 'aldousHuxley@gmail.com',
   gravatarHash: '',
  }} })

  const messageToUser = screen.getByText('Well Done!');

  expect(messageToUser).toBeInTheDocument('Well Done!');
  })
})
describe('Testa página Feedback itens do Requisito 14 - Se a tela de Feedback exibe informações sobre o desempenho do jogador', () => { 
   test('Se o jogador não acertar nenhuma pergunta', () => { 
    const INICIAL_STATE = {
      name: 'Aldous',
      assertions: 0,
      score: 0,
      gravatarEmail: 'aldousHuxley@gmail.com',
    }
    const { queryByTestId, store } = renderWithRouterAndRedux(<Feedback />, { initialState: INICIAL_STATE })
  
    const totalScore = queryByTestId('feedback-total-score')
    const totalQuestions = queryByTestId('feedback-total-question')

    expect(totalScore).toBeInTheDocument()
    expect(totalQuestions).toBeInTheDocument()

    expect(totalScore.innerHTML).toBe('0')
    expect(totalQuestions.innerHTML).toBe('0')
   })
   test('Se o jogador acertar duas perguntas', () => { 
    const INICIAL_STATE = {
      name: 'Aldous',
      assertions: 2,
      score: 14,
      gravatarEmail: 'aldousHuxley@gmail.com',
    }
    const { queryByTestId } = renderWithRouterAndRedux(<Feedback />, { initialState: INICIAL_STATE })
  
    const totalScore = queryByTestId('feedback-total-score')
    const totalQuestions = queryByTestId('feedback-total-question')

    expect(totalScore).toBeInTheDocument()
    expect(totalQuestions).toBeInTheDocument()

    expect(totalScore.innerHTML).toBe('2')
    expect(totalQuestions.innerHTML).toBe('14')
   })
   test('Se o jogador acertar quarto perguntas', () => { 
    const INICIAL_STATE = {
      name: 'Aldous',
      assertions: 4,
      score: 120,
      gravatarEmail: 'aldousHuxley@gmail.com',
    }
    const { queryByTestId } = renderWithRouterAndRedux(<Feedback />, { initialState: INICIAL_STATE })
  
    const totalScore = queryByTestId('feedback-total-score')
    const totalQuestions = queryByTestId('feedback-total-question')

    expect(totalScore).toBeInTheDocument()
    expect(totalQuestions).toBeInTheDocument()

    expect(totalScore.innerHTML).toBe('4')
    expect(totalQuestions.innerHTML).toBe('120')
   })
   test('Se no estado do Redux as chaves score e asseritions são do tipo number', () => { 
    const INICIAL_STATE = {
      name: 'Aldous',
      assertions: 0,
      score: 0,
      gravatarEmail: 'aldousHuxley@gmail.com',
    }
    const { queryByTestId, store } = renderWithRouterAndRedux(<Feedback />, { initialState: INICIAL_STATE })
  
    const totalScore = queryByTestId('feedback-total-score')
    const totalQuestions = queryByTestId('feedback-total-question')

    expect(totalScore).toBeInTheDocument()
    expect(totalQuestions).toBeInTheDocument()

    expect(totalScore.innerHTML).toBe('0')
    expect(totalQuestions.innerHTML).toBe('0')

    // Pega os valores da store para testar o tipo
    const storeState = store.getState()
    const {player: {assertions, score}} = storeState;
    expect(typeof(assertions)).toBe('number')
    expect(typeof(score)).toBe('number')
   })
})
describe('Testa página Feedback itens do Requisito 15', () => { 
 test('Se existe um botão para jogar novamente', () => { 
  const { history } = renderWithRouterAndRedux(<Feedback />);

  const playAgainBtn = screen.getByTestId('btn-play-again');
  expect(playAgainBtn).toBeInTheDocument();
  })
 test('Se o jogador é redirecionado para a página de Login ao apertar no botão', () => { 
  const { history } = renderWithRouterAndRedux(<Feedback />);

  const playAgainBtn = screen.getByTestId('btn-play-again');
  expect(playAgainBtn).toBeInTheDocument();

  userEvent.click(playAgainBtn);

  expect(history.location.pathname).toBe('/');
 })
 })
 describe('Testa página Feedback itens do Requisito 16', () => { 
  test('Se existe um botão para acessar o ranking', () => { 
   renderWithRouterAndRedux(<Feedback />);
 
   const rankingBtn = screen.getByTestId('btn-ranking');
   expect(rankingBtn).toBeInTheDocument();
   })
  test('Se o jogador é redirecionado para a página de Ranking ao apertar no botão', () => { 
   const { history } = renderWithRouterAndRedux(<Feedback />);
 
   const rankingBtn = screen.getByTestId('btn-ranking');
   expect(rankingBtn).toBeInTheDocument();
 
   userEvent.click(rankingBtn);
 
   expect(history.location.pathname).toBe('/ranking');
  })
  test('Se o desempenho do jogador é gravado no localstorage', () => { 
    renderWithRouterAndRedux(<Feedback />);
   
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem')
    
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
   })
  })