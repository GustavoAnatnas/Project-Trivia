import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Login from '../../pages/Login'
import userEvent from '@testing-library/user-event';

describe('Testa a página de Login - Requisito 1', () => { 
 test('Se há na tela dois input, email e nome, e se são renderizados corretamente', () => { 
  const { history } = renderWithRouterAndRedux(<Login />);

// Esperamos que seja renderizado na rota '/'
expect(history.location.pathname).toBe('/')

  // Vamos pegar os elementos que esperamos encontrar na página 
  const nameInput = screen.getByTestId('input-player-name');
  const emailInput = screen.getByTestId('input-gravatar-email');
  expect(nameInput).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  })
 test('Se é possível escrever o nome da pessoa jogadora', () => {
  renderWithRouterAndRedux(<Login />);
  const USER_NAME = 'Aldous Huxley';

  const nameInput = screen.getByTestId('input-player-name');
  expect(nameInput).toBeInTheDocument();

// Digita no Input de nome 
  userEvent.type(nameInput, USER_NAME);

  const typedName = nameInput.value;
  expect(typedName).toBe(USER_NAME);
})
  test('Se é possível digitar o email da pessoa jogadora', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_EMAIL = 'aldousHuxley@gmail.com';

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, USER_EMAIL);

    const typedName = emailInput.value;
    expect(typedName).toBe(USER_EMAIL);
  })
  test('Se o botão fica desabilitado se a pessoa não preencher nenhum campo', () => {
    renderWithRouterAndRedux(<Login />);

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true)
  })
  test('Se o botão está desabilitado se o só o nome for preenchido', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_EMAIL = 'aldousHuxley@gmail.com';


    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true)

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);

    // Depois de digitar, esperamos que o botão esteja desabilitado
    expect(playButton.disabled).toBe(true)
 })
 test('Se o botão está desabilitado se o só o email for preenchido', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_NAME = 'Aldous Huxley'; 
 
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true)
 
    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, USER_NAME);
 
    // Depois de digitar, esperamos que o botão esteja desabilitado
    expect(playButton.disabled).toBe(true)
  })
  test('Se o botão fica habilitado depois de preencher os campos de nome e email', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_NAME = 'Aldous Huxley';
    const USER_EMAIL = 'aldousHuxley@gmail.com';

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true)
  
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(nameInput, USER_NAME);
  
    // Depois de preencher esperamos que esteja habilitado
    expect(playButton.disabled).toBe(false)
   })
 })
