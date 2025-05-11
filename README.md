# loginAllEasy

Aplicativo de autenticação desenvolvido em React Native, criado como parte de um teste técnico para avaliar conhecimentos em diversas tecnologias e conceitos modernos de desenvolvimento mobile.

## 📋 Índice

- [Objetivo](#objetivo)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Credenciais de Teste](#credenciais-de-teste)
- [Contribuidores](#contribuidores)
- [Licença](#licença)

## 🎯 Objetivo

Desenvolver um aplicativo em React Native que utilize as seguintes tecnologias e conceitos:

1. **Interface com Native Base**: Tela de login estilizada com campos para e-mail e senha, além de um botão de login.
2. **Formulários com React Hook Form**: Gerenciamento dos inputs do formulário de login com validações, como obrigatoriedade e formato do e-mail.
3. **Gerenciamento de Estado com Context API e Zustand**: Contexto global para armazenar dados do usuário autenticado e Zustand para gerenciar o estado do tema (modo claro e escuro).
4. **Requisições com Axios e Interceptors**: Autenticação com requisição de login utilizando Axios, interceptor para adicionar o token de autenticação no cabeçalho das requisições subsequentes e exibição de mensagens de erro adequadas em caso de falha na autenticação.
5. **Integração Nativa com Swift e Kotlin**: Módulo nativo em Swift (iOS) que retorna a versão do sistema operacional e módulo nativo em Kotlin (Android) que retorna o nome do fabricante do dispositivo. Essas informações são exibidas na tela inicial após o login.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Gluestack](https://gluestack.io/ui/docs/home/overview/quick-start)
- [React Hook Form](https://react-hook-form.com/)
- [Context API](https://reactjs.org/docs/context.html)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [Swift](https://developer.apple.com/swift/) (iOS)
- [Kotlin](https://kotlinlang.org/) (Android)

## ⚙️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Horley123/loginAllEasy.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd loginAllEasy
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie o Metro Bundler:

   ```bash
   yarn start
   # ou
   npm start
   ```

5. Em outro terminal, execute o aplicativo:
   - Para Android:
     ```bash
     yarn android
      # ou
     npm start
     ```
   - Para iOS:
     ```bash
     yarn ios
      # ou
     npm start
     ```

## 🚀 Uso

Após iniciar o aplicativo, você será apresentado a uma tela de login. Utilize as credenciais de teste fornecidas abaixo para acessar o sistema. Após o login bem-sucedido, a tela inicial exibirá informações obtidas dos módulos nativos, como a versão do sistema operacional (iOS) ou o nome do fabricante do dispositivo (Android).

## ✅ Funcionalidades Implementadas

- Tela de login estilizada com Native Base.
- Formulário de login gerenciado com React Hook Form, incluindo validações.
- Gerenciamento de estado do usuário autenticado com Context API.
- Gerenciamento do tema (modo claro/escuro) com Zustand.
- Requisições de autenticação utilizando Axios com interceptors para adicionar o token de autenticação.
- Exibição de mensagens de erro em caso de falha na autenticação.
- Integração nativa com Swift e Kotlin para obter informações específicas do dispositivo.
- Fake api com json-server

## 🔐 Credenciais de Teste

Para fins de teste, utilize as seguintes credenciais:

- **Email:** `teste@example.com`
- **Senha:** `123TA@a`

Essas credenciais permitirão que você acesse o aplicativo e explore suas funcionalidades.

## OBS

Talvez seja necessario mudar o http://localhost:3000/ para http://Seu ip local:3000/

![Demonstração do app](./src/assets/demonstracao.gif)

## 👥 Contribuidores

- [Horley123](https://github.com/Horley123) - Desenvolvedor principal

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
