import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';
import { Forbidden } from '../paginas/Forbidden';


export default function PrivateRouteWithRole({ children }) {
    const { auth } = useContext(AuthContext)

    if ("Cliente" === auth.rol) {
        return <Forbidden/>
    } else {
        return children
    }
}