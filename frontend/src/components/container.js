import { Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import LoginComp from './login'
import ProtectedRoute from './ProtectedRoute'
const ContainerComp = (props) => {
    return <div>
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainPage />} path="/" exact />
            </Route>
            <Route path='/login' element={<LoginComp />} />
        </Routes>
    </div>
}
export default ContainerComp
