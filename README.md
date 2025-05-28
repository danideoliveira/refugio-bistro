# Refúgio Bistrô

Aplicação para um restaurante fictício, que oferece uma página de apresentação do mesmo, cardápio com carrossel de imagens e localizações, além de ser totalmente responsiva, se adaptando a diversos tipos de dispositivos. Também é possível cadastrar uma conta, efetuar e cancelar uma reserva de maneira simples e intuitiva.

Na página de "Login", o usuário pode acessar sua conta com email e senha ou se cadastrar facilmente, preenchendo o formulário com seu nome, CPF, email, telefone e senha. Todos os campos dos formulários são validados com ZOD e React Hook Form, garantindo que os dados inseridos estejam corretos. Não é possível ter emails e CPF's repetidos, cada conta possuirá os seus de maneira única.

Uma vez cadastrado, o usuário terá acesso a página de "Meu Perfil", onde pode visualizar e alterar seus dados pessoais (exceto CPF) e gerenciar suas solicitações. Na página do processo de reserva, é possível escolher a data, o horário, a quantidade de pessoas e o ambiente desejado pelo usuário. 

Cada cliente poderá efetuar no máximo duas reservas, desde que sejam em dias diferentes.

A aplicação limita o restaurante a receber 10 reservas por dia no máximo, e, caso um dia esteja esgotado, ele será automaticamente desabilitado no menu.

Cada reserva tem uma tolerância de 30 minutos. Após esse período, a reserva é automaticamente cancelada no sistema e na conta do usuário.

As informações do cliente e das suas solicitações são armazenadas com auxílio do Firebase. No sistema de administração do restaurante, as reservas são exibidas em uma planilha que se atualiza em tempo real, ou seja, quando ocorre alguma solicitação de mesa, quando uma reserva é utilizada ou expirada. A planilha também conta com filtros por status, data e localidade para facilitar a gestão, além de exibição dos dados em formato de gráficos para uma visão mais clara da operação.

## ⚙️Tecnologias
- React
- TypeScript
- Firebase
- Styled-components

## 📸 Screenshots
<img src="./client/public/screenshots/01.jfif"></br>
<img src="./client/public/screenshots/02.jfif"></br>
<img src="./client/public/screenshots/03.jfif"></br>
<img src="./client/public/screenshots/04.jfif"></br>
<img src="./client/public/screenshots/05.jfif"></br>
<img src="./client/public/screenshots/06.jfif"></br>
<img src="./client/public/screenshots/07.jfif"></br>
<img src="./client/public/screenshots/08.jfif"></br>
