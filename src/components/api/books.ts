import axios from 'axios';

export type Filters = '-title' | 'title' | '';

interface GetBooksOptions {
  search: string;
  filterBy: Filters;
  page: number;
}

interface IResources {
  id: number;
  uri: string;
  type: string;
}

export interface IAgents {
  id: number;
  person: string;
  type: string;
}

interface IBook {
  id: number;
  description: string;
  title: string;
  subjects: string[];
  resources: IResources[];
  agents: IAgents[];
}

export interface GetBooksResponse {
  count: number;
  next: string | null;
  prev: string | null;
  results: IBook[];
}

const API_URL = 'https://gnikdroy.pythonanywhere.com/api/book';

export const getBooks = async (options: GetBooksOptions) => {
  console.log(options.page, options.search, options.filterBy);
  try {
    const { data } = await axios.get<GetBooksResponse>(
      `${API_URL}?page=${options.page}&search=${options.search}&ordering=${options.filterBy}`,
    );
    console.log(data.prev);
    console.log(data.next);
    return data;
  } catch (err) {
    return 'error';
  }
};
