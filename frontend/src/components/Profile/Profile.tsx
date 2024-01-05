import { Avatar } from 'primereact/avatar'
import { useCurrentUser, useUser } from '../../context/userContext'
import { useLogOut } from '../../hooks/mutations/useLogOut'
import ButtonBase from '../Buttons/ButtonBase'
import { Skeleton } from 'primereact/skeleton'

const Profile = () => {
  // const {currentUser} = useCurrentUser();
  const { logOutUser } = useLogOut()
  // console.log('currentUser', currentUser)
  //
  const logOut = () => {
    logOutUser()
  }
  return (
    <div className="d-flex">
      <ButtonBase severity="info" text="LogOut" handleClickEvent={logOut} />
      {/*<div className="d-flex flex-column justify-content-center align-items-center">*/}
      {/*    {currentUser && currentUser.user.avatarUrl ? <Avatar image={currentUser.user.avatarUrl} size="xlarge" shape="circle" /> : <Skeleton animation="none" shape="circle" size="4rem" className="mr-2"></Skeleton>}*/}
      {/*    {currentUser.user?.displayName ? <div>{currentUser.user?.displayName}</div> : <Skeleton width="10rem" className="mb-2"></Skeleton>}*/}
      {/*</div>*/}
    </div>
  )
}

Profile.displayName = 'Profile'
export default Profile
