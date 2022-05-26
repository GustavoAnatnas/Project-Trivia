import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Game from '../../pages/Game';

describe('Testa a página de Game requisito do Requisito 5', () => {  
  test('Se o header é renderizado corretamente', () => { 
    const { history } = renderWithRouterAndRedux(<Game />);
 
 // Vamos pegar os elementos que esperamos encontrar na página 
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument(); 
  })
  test('Se um fetch é chamado para pegar as perguntas', async () => {
   const token = {
   "response_code":0,
   "response_message":"Token Generated Successfully!",
   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
   };
 const questions = JSON.stringify({"response_code":0,"results":[{"category":"History","type":"multiple","difficulty":"hard","question":"Pianist Fr&eacute;d&eacute;ric Chopin was a composer of which musical era?","correct_answer":"Romantic","incorrect_answers":["Classic","Baroque","Renaissance"]},{"category":"Entertainment: Cartoon & Animations","type":"multiple","difficulty":"medium","question":"What is the name of Sid&#039;s dog in &quot;Toy Story&quot;?","correct_answer":"Scud","incorrect_answers":["Buster","Whiskers","Mr. Jones"]},{"category":"Science: Gadgets","type":"multiple","difficulty":"medium","question":"Which company designed the &quot;Betamax&quot; video cassette format?","correct_answer":"Sony","incorrect_answers":["Panasonic","LG","Fujitsu"]},{"category":"Entertainment: Music","type":"boolean","difficulty":"easy","question":"Daft Punk originated in France.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Cartoon & Animations","type":"multiple","difficulty":"medium","question":"Which Hanna-Barbera cartoon character travelled with a canine companion named Beegle Beagle?","correct_answer":"Grape Ape","incorrect_answers":["Boss Gator","Wally Gator","Yogi Bear"]}]})
   const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

   jest.spyOn(global, 'fetch');
   global.fetch.mockResolvedValue({
     json: jest.fn().mockResolvedValue(),
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