import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, updateFavoriteList, fetchMoreUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filters, setFilters] = useState({ BR: false, AU: false, CA: false, DE: false, TR: false })
  const [favorites, setFavorites] = useState([])

  useEffect(()=>{
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || [])
  },[])

  const toggleFavoriteList = (user) => {
    const index = favorites.findIndex(element => element.login.uuid === user.login.uuid)
    if(index < 0) {
      const newFavorites = [...favorites, user]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
    else {
      const newFavorites = favorites
      newFavorites.splice(index, 1)
      setFavorites([...newFavorites])
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      updateFavoriteList && updateFavoriteList()
    }
  }

  const findInFavorites = ({ login }) => {
    return !!favorites.find(user => user.login.uuid === login.uuid)
  }

  const changeFilter = (value) => {
    setFilters({...filters, [value]: !filters[value]} )
  }

  const filterUsers = ({ nat })=> {
    const filterKeys = Object.keys(filters)
    
    if(filters[nat]) return true
    for(const key of filterKeys) {
      if(filters[key]) return false
    }
    return true
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleScroll = ({target}) => {
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight;
    if (bottom && fetchMoreUsers) { 
      fetchMoreUsers()
    }
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={changeFilter}/>
        <CheckBox value="AU" label="Australia" onChange={changeFilter} />
        <CheckBox value="CA" label="Canada" onChange={changeFilter} />
        <CheckBox value="DE" label="Germany" onChange={changeFilter} />
        <CheckBox value="TR" label="Turkey" onChange={changeFilter} />
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {users.filter(filterUsers).map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={findInFavorites(user) || index === hoveredUserId}>
                <IconButton onClick={() => toggleFavoriteList(user, index)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
