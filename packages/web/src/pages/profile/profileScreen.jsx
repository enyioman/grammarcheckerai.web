import { useNavigate, Link } from 'react-router-dom';
import userimg from '../../assets/ProfileImage.png';
import editicon from '../../assets/edit.svg';
import coloredediticon from '../../assets/EditColored.svg';

//components
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton'


export default function profileScreen() {
    const navigate = useNavigate();

  return (
    <main className='bg-white mt-24'>
        <div className='h-[100vh] w-[90%] md:w-[80%] m-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-3 border-none sm:border-b-[3px] border-[#d2d2d2]/50 relative'>
                <h3 className='text-2xl font-bold'>User Profile</h3>
                <span><img className='absolute bottom-1 sm:hidden' src={coloredediticon} alt="edit" /></span>
                <img className='h-24 w-24 mt-3 md:mt-0 sm:h-12 sm:w-12' src={userimg} alt="user-img" />
            </div>
            <div className='flex flex-col text-center sm:hidden'>
                <h1 className='text-xl font-bold text-[#393939]'>Oluwa Riri</h1>
                <p className='text-[#9c9c9c]'>riri@gmail.com</p>
             </div>

            <div className='flex flex-col gap-10 mt-5'>
                <div className='hidden md:block border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Full Name</span>
                    <p className='text-lg'>Oluwa Riri</p>
                </div>


                <div className='relative border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Display Name</span>
                    <p className='text-lg'>Riri</p>
                    <span className='absolute bottom-2 right-0 cursor-pointer'><img src={editicon} alt="edit" /></span>
                </div>

                <div className='hidden sm:block  border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Email Address</span>
                    <p className='text-lg'>riri@gmail.com</p>
                </div>

                <div className='relative flex flex-col border-b-[3px] border-[#d2d2d2]/50'>
                    <span className='text-sm opacity-50'>Password</span>
                    <input type="password" name="password" id="" value="password" disabled className='text-xl bg-transparent' />
                    <p></p>
                    <Link to='/me/profile/changepassword'>
                        <span className='absolute bottom-2 right-0 cursor-pointer'><img src={editicon} alt="edit" /></span>
                    </Link>
                </div>
            </div>

            <div className="_btnContainer">  
                <ProfileScreenButton onClick={() => navigate('/me/profile/deleteaccount')}  variant="danger" >
                    Delete Account
                </ProfileScreenButton>
                <ProfileScreenButton>Sign Out</ProfileScreenButton>
            </div>
        </div>
        
    </main>
  )
}
