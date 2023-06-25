export default function LogIn({ toggle }) {
    return (
        <div className='container'>
            <h1>Log in</h1>
            <form>

            </form>
            <div className='buttons'>
                <button className='bt'>SUBMIT</button>
                <button className='bt' onClick={toggle}>SIGN UP</button>
            </div>
        </div>
    )
}