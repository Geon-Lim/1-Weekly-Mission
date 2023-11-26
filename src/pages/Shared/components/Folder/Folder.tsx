import * as S from './Folder.style';
import useRequest from '@hooks/useRequest';
import { DEFAULT_USER_ID } from '@apis/config/default';
import SearchBar from '@components/SearchBar';
import CardList from '@components/CardsContainer';
import Banner from '../Banner';

interface SharedFolder {
  count: number;
  id: number;
  links: {
    id: number;
    createdAt: string;
    description: string;
    imageSource: string;
    title: string;
    url: string;
  }[];
  name: string;
  owner: {
    id: number;
    name: string;
    profileImageSource: string;
  };
}

function Folder() {
  const { data } = useRequest<{ folder: SharedFolder }>({
    options: {
      url: '/sample/folder',
      method: 'get',
    },
  });

  const folder = data?.folder;
  const name = folder?.name;
  const owner = folder?.owner;
  const links = folder?.links;

  return (
    <main>
      {data && <Banner name={name} owner={owner} />}
      <S.ContentContainer>
        <SearchBar />
        {data && <CardList cards={links} userId={DEFAULT_USER_ID} />}
      </S.ContentContainer>
    </main>
  );
}

export default Folder;