export const LOGIN = 'LOGIN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

// export async function fetchAPI() {
//   try {
//     const perguntas = '5';
//     const token = '6d3dd1c6f1e74953a7209f71fa99128702b57479ff27a1ea528f94b1fdd30f19';
//     const response = await fetch(`https://opentdb.com/api.php?amount=${perguntas}&token=${token}`);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
