import React from 'react'
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Login from '../../pages/Login'
import userEvent from '@testing-library/user-event';
import Settings from '../../pages/Settings';

afterEach(() => jest.clearAllMocks());

describe('Testa a página de Login - Requisito 1', () => { 
  test('Se há na tela dois input, email e nome, e se são renderizados corretamente', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);

    // Esperamos que seja renderizado na rota '/'
    expect(history.location.pathname).toBe('/');

    // Vamos pegar os elementos que esperamos encontrar na página 
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
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
    expect(playButton.disabled).toBe(true);
  })
  test('Se o botão está desabilitado se o só o nome for preenchido', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_EMAIL = 'aldousHuxley@gmail.com';


    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true);

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);

    // Depois de digitar, esperamos que o botão esteja desabilitado
    expect(playButton.disabled).toBe(true);
 })
 test('Se o botão está desabilitado se o só o email for preenchido', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_NAME = 'Aldous Huxley'; 

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true);

    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, USER_NAME);
 
    // Depois de digitar, esperamos que o botão esteja desabilitado
    expect(playButton.disabled).toBe(true);
  })
  test('Se o botão fica habilitado depois de preencher os campos de nome e email', () => { 
    renderWithRouterAndRedux(<Login />);
    const USER_NAME = 'Aldous Huxley';
    const USER_EMAIL = 'aldousHuxley@gmail.com';

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(nameInput, USER_NAME);

    // Depois de preencher esperamos que esteja habilitado
    expect(playButton.disabled).toBe(false);
   })
  test('Se a tela de login possui um botão de Configurações', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);
    
    const settingsBtn = screen.getByTestId('btn-settings');
    expect(settingsBtn).toBeInTheDocument();

    userEvent.click(settingsBtn);

    expect(history.location.pathname).not.toBe('/');
  })
  test('Se ao clicar no botão de play o jogo é inicado', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const USER_NAME = 'Aldous Huxley';
    const USER_EMAIL = 'aldousHuxley@gmail.com';

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    expect(playButton.disabled).toBe(true);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(nameInput, USER_NAME); 

    expect(playButton.disabled).toBe(false);
    userEvent.click(playButton);

    // expect(history.location.pathname).toBe('/game');
  })
  test('Se ao apertamos o botão de play a função fetchAPI é requisitada com a URL correta', async () => {
    const token = {
    "response_code":0,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });
  
    renderWithRouterAndRedux(<Login />);
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
    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith(TOKEN_URL);
  })
})
describe('Testa página Settings', () => { 
  test('Se existe um botão para acessar o ranking', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);

    const USER_NAME = 'Aldous Huxley';
    const USER_EMAIL = 'aldousHuxley@gmail.com';

    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(nameInput, USER_NAME); 

    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  })
  test('Se possui um titulo escrtio "Configurações"', () => { 
    const { history } = renderWithRouterAndRedux(<Settings />);
    const title = screen.getByRole('heading', { name: 'Configurações', level: 1});
    expect(title).toBeInTheDocument();
  })
  })