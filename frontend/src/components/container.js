import { Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import LoginComp from './Login'
import SignUp from './SignUp'
import ProtectedRoute from './ProtectedRoute'
const ContainerComp = (props) => {
    return <div>
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainPage />} path="/" exact />
            </Route>
            <Route path='/login' element={<LoginComp />} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
}
export default ContainerComp
