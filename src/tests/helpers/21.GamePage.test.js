import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Game from '../../pages/Game';

describe('Testa a página de Game requisito do Requisito 5', () => {  
  test('Se o header é renderizado corretamente', () => { 
    const { history } = renderWithRouterAndRedux(<Game />);

  // Esperamos que seja renderizado na rota '/'
    expect(history.location.pathname).toBe('/');
 
 // Vamos pegar os elementos que esperamos encontrar na página 
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument(); 
  })
})