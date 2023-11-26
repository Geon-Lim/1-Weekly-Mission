import * as S from './Card.style';
import { useState } from 'react';
import TimeAgo from 'react-timeago';
import useModal from '@hooks/useModal';
import DeleteLink from '@components/Modal/DeleteLink';
import AddToFolder from '@components/Modal/AddToFolder';
import DEFAULT_IMAGE from '@assets/images/default-link-img.svg';
import { CardProps } from '@components/CardsContainer/CardsContainer';
import STAR from '@assets/icons/star.svg';
import KEBAB from '@assets/icons/kebab.svg';

interface Props {
  data: CardProps;
  userId: number;
}

function Card({ data, userId }: Props) {
  const [showKebab, setShowKebab] = useState(false);

  const {
    url,
    title,
    description,
    created_at: baseCreateAt,
    createdAt,
    image_source,
    imageSource,
  } = data;

  const createdDate = new Date(baseCreateAt ?? createdAt ?? '');

  const reduceText = (text: string, length: number) => {
    if (!text) return;
    if (text.length > length) {
      return `${text.slice(0, length)}...`;
    } else {
      return text;
    }
  };

  const [toggleShow, Modal] = useModal({
    deleteLink: <DeleteLink url={url} />,
    addToFolder: <AddToFolder url={url} userId={userId} />,
  });

  const setKebabModal = (modalKey: string) => {
    toggleShow(modalKey);
  };

  return (
    <>
      {Modal}
      <S.CardContainer href={url} target='_blank' rel='noreferrer noopener'>
        <S.CardImgContainer>
          <S.CardImg
            src={imageSource ?? image_source ?? DEFAULT_IMAGE}
            alt='링크 이미지'
          />
          <S.StarButton type='button'>
            <img src={STAR} alt='즐겨찾기 버튼' />
          </S.StarButton>
        </S.CardImgContainer>
        <S.CardTextContainer>
          <S.TimeAgo>
            <TimeAgo date={createdDate} />
            <S.KebabButton
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowKebab((curr) => !curr);
              }}
            >
              <img src={KEBAB} alt='케밥 버튼' />
            </S.KebabButton>
            {showKebab && <KebabPopup setKebabModal={setKebabModal} />}
          </S.TimeAgo>
          <S.Title>{reduceText(title, 70)}</S.Title>
          <S.Description>{reduceText(description, 100)}</S.Description>
          <S.Date>{createdDate.toLocaleDateString()}</S.Date>
        </S.CardTextContainer>
      </S.CardContainer>
    </>
  );
}

export default Card;

function KebabPopup({
  setKebabModal,
}: {
  setKebabModal: (modalKey: string) => void;
}) {
  return (
    <S.KebabPopup>
      <S.KebabInnerButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setKebabModal('deleteLink');
        }}
      >
        삭제하기
      </S.KebabInnerButton>
      <S.KebabInnerButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setKebabModal('addToFolder');
        }}
      >
        풀더에 추가
      </S.KebabInnerButton>
    </S.KebabPopup>
  );
}