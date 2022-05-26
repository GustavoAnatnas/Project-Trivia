import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback'
import userEvent from '@testing-library/user-event';

describe('Testa página Feedback itens do Requisito 12', () => { 
 test('Se é renderizada no caminho esperado', () => { 
  const { history: {location: {pathname}} } = renderWithRouterAndRedux(<Feedback />);
  expect(pathname).toBe('/feedback');
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


  // Como cada acerto conta ponto e erro não
  
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