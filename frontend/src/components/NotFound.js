import '../static/NotFound.css';

export default function NotFound({ navigate }) {
    return (
        <main className='container'>
            <div className="col" style={{ textAlign: 'right' }}><h1>404</h1></div>
            <div className="border"></div>
            <div className="col" style={{ textAlign: 'left' }}><h1>Not Found</h1></div>
        </main>
    )
}