import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Crear from './paginas/Crear'
import Perfil from './paginas/Perfil'
import { Confirmar } from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { TratamientosProvider } from './context/TratamientoProvider'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'
import ProductoListar from './paginas/ProductoListar'
import ActualizarProductos from './paginas/ActualizarProductos'
import VisualizarProductos from './paginas/VisualizarProductos'
import VisualizarCliente from './paginas/VisualizarCliente'
import ActualizarClientes from './paginas/ActualizarClientes'
import ListarClientes from './paginas/ListarClientes'



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <TratamientosProvider>
            <Routes>

              <Route index element={<LandinPage />} />

              <Route path='/' element={<Auth />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot/:id' element={<Forgot />} />
                <Route path='confirmar/:token' element={<Confirmar />} />
                <Route path='recuperar-password/:token' element={<Restablecer />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='dashboard/*' element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Perfil />} />
                      <Route path='listarClientes' element={<PrivateRouteWithRole>
                          <ListarClientes />
                        </PrivateRouteWithRole>} />
                      <Route path='listarProductos' element={<ProductoListar/>} />
                      <Route path='actualizarProductos/:id' element={<ActualizarProductos/>} />
                      <Route path='visualizarCliente/:id' element={<VisualizarCliente/>} />
                      <Route path='visualizarProducto/:id' element={<VisualizarProductos/>} />
                      <Route path='crear' element={
                        <PrivateRouteWithRole>
                          <Crear />
                        </PrivateRouteWithRole>
                      } />
                      <Route path='actualizarClientes/:id' element={<ActualizarClientes />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
              }></Route>
            </Routes>
          </TratamientosProvider>

        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
