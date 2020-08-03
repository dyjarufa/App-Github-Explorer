import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasErrorProps: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${(props) =>
      props.hasErrorProps &&
      css`
        border-color: #f29186;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  margin-top: 8px;
  color: #f29186;
`;

export const Repositories = styled.div`
  margin-top: 64px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.2s; /* vai suavisar o transform do hover */

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64;
      border-radius: 50%;
    }

    div {
      margin: 0px 16px; /** 0 em cima e em baixo e 16 nas laterais */
      flex: 1; /* ocupa todo o espaço disponível*/

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        margin-top: 4px;
        color: #a8a8b3;
      }
    }
    svg {
      margin-left: auto; /*joga o ícone para o canto  */
      color: #cbcbd6;
    }
  }
`;
