import React, {useState, useEffect} from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const Favorite = () => {

  const [favorites, setFavorites] = useState([])

  useEffect(()=>{
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || [])
  },[])

  const updateFavoriteList = () => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || [])
  }

  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFavorites
          </Text>
        </S.Header>
        <UserList users={favorites} isLoading={false} updateFavoriteList= {updateFavoriteList}/>
      </S.Content>
    </S.Favorite>
  );
};

export default Favorite;
