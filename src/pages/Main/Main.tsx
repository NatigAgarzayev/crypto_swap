import Swaper from '../../components/Swaper/Swaper';
import cl from './Main.module.css';

export default function Main() {
    return (
        <div className={cl.main}>
            <div className='container'>
                <Swaper />
            </div>
        </div>
    )
}
