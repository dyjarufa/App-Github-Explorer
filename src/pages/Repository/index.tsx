import React, { useEffect, useState, useRef } from 'react';

import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';

import lottie from 'lottie-web';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue{
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null); //Não posso setar nulo diretanente por isso uso a condição e defino o valor null
  const [issues, setIssues] = useState<Issue[]>([])

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // then: A chamada é simultânea
    const timeout = setTimeout(() =>{
      api.get(`repos/${params.repository}`).then((response) => {
        setRepository(response.data);
      });

      api.get(`repos/${params.repository}/issues`).then((response) => {
        setIssues(response.data);
      });

    }, 1000)


    //Para simular o comportamento do then: Promise.all([]) e desestrurturo com um array
    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]);

    //   console.log(repository);
    //   console.log(issues);
    // }

    // const timeout = setTimeout(loadData(), 1000);

    return () => clearTimeout(timeout);

  }, [params.repository]);


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

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          Voltar
          <FiChevronLeft size={20} />
        </Link>
      </Header>

     {repository ?  (
        <RepositoryInfo>
        <header>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

     ) : (
       <div

          style={{width: 700, height:700, margin: '0 auto'}}
          className="container"
          ref={container}>

        </div>
     )

     }
      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
