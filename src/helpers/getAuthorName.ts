import { IAgents } from 'components/BookList/BookList';

export const getAuthorName = (agent: IAgents): string => {
  const splitedAuthorName = agent.person.split(', ');
  const authorName = `${splitedAuthorName[1]} ${splitedAuthorName[0]}`;
  return authorName;
};
