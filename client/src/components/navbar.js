import { useRouter } from 'next/router'


export default function Navbar(props) {
    const router = useRouter();

    const handleLogout = async (e) => {
        try {
            const response = await fetch(`api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                router.push('/');
            } else {
                console.log(response)
            }
        } catch(er) {
            console.log('Network error');
        }
    }

    return (
        <div className='navbar'>
            <span className='span'>aT</span>
            <ul className='ul-navbar'>
                <li>My Opennings</li>
                <li>Resumes & CLs</li>
                <li>Progress Dashboard</li>
                <li>Our blog</li>
            </ul>
            <a className='a-logout' onClick={(e) => handleLogout(e)}>Logout</a>
        </div>
    )
}