import loader from '../assets/img/loader.svg'

export function Loader() {
    return <img className="loader-dots" src={loader} alt="loader" style={{height:"200px"}} />
}