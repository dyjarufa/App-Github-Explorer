import React, { useState, FormEvent, useEffect, useRef } from 'react';

import { log } from 'util';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import lottie from 'lottie-web';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  // eslint-disable-next-line camelcase
  full_name: string;
  description: string;
  owner: {
    login: string;
    // eslint-disable-next-line camelcase
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const [repositories, setRepositories] = useState<Repository[]>(() => {

    const storagedRepository = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepository) {
      return JSON.parse(storagedRepository);
    }
    return [];

  });

  //Animação Lottie
  useEffect(() => {
    lottie.setSpeed(5)
    if(container.current){
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('./spinner-slow.json'),

      });
    }
  },[container])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true)
    }, 1000)

    return () => clearTimeout(timeout);
  }, [loading])

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite autor/nome válido de um repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;
      setRepositories([...repositories, repository]);

      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Erro ao buscar repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasErrorProps={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />

        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

        {loading ? (

         <Repositories>
              {repositories.map((repository) => (
                <Link
                  key={repository.full_name}
                  to={`/repositories/${repository.full_name}`}
                >
                  <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                  />

                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>
                  <FiChevronRight size={20} />
                </Link>
              ))}
          </Repositories>

        ):(

          <div
          style={{width: 700, height:700, margin: '0 auto'}}
          className="container"
          ref={container}>
        </div>

        )}
    </>
  );
};

export default Dashboard;
