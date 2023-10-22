import { useCallback, useEffect, useState } from 'react';
import { getFolder } from '../api/apiClient';
import Banner from './Banner';
import SearchBar from './SearchBar';
import CardList from './CardList';

const INITIAL_FOLDERINFO = {
  name: '',
  owner: {
    name: '',
    profileImageSource: '',
  },
};

function Folder() {
  const [links, setLinks] = useState([]);
  const [folderInfo, setFolderInfo] = useState(INITIAL_FOLDERINFO);

  const loadFolder = useCallback(async () => {
    const { folder } = await getFolder();
    const { name, owner, links: linksData } = folder;
    const folderInfoData = { name, owner };
    setFolderInfo(folderInfoData);
    setLinks(linksData);
  }, []);

  useEffect(() => {
    loadFolder();
  }, [loadFolder]);

  return (
    <main>
      <Banner info={folderInfo} />
      <div className='folder-container'>
        <SearchBar />
        <CardList links={links} />
      </div>
    </main>
  );
}

export default Folder;