import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoGithub from '../assets/github.png'
import logoLinkedind from '../assets/linkedin.png'
import logo_padre from '../assets/logo_padre.jpg'
import logoCode from '../assets/code.png'
import logoConsulting from '../assets/consulting.png'
import logoDesign from '../assets/design.png'
import logoWeb1 from '../assets/web1.png'
import logoWeb2 from '../assets/web2.png'
import logoWeb3 from '../assets/web3.png'
import logoWeb4 from '../assets/web4.png'
import logoWeb5 from '../assets/web5.png'
import logoWeb6 from '../assets/web6.png'

import proyecto1 from '../assets/proyecto1.jpg'
import proyecto2 from '../assets/proyecto2.jpg'
import proyecto3 from '../assets/proyecto3.jpg'
import proyecto4 from '../assets/proyecto4.jpg'
import proyecto5 from '../assets/proyecto5.jpg'
import proyecto6 from '../assets/proyecto6.jpg'


import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>EDWIN ASQUI DJ</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={()=>setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40}/></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>EDWIN ASQUI</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>VDJ Y DJ EN VINILOS</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>EDWIN ASQUI es un DJ y VDJ profesional especializado en 
                            trabajar en música en vivo tanto en formato MP3 y en videos, Por otro lado, también es experto en trabajar en mezclas con discos de vinilos.</p>
                    </div>

                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <img src={logoFacebook} alt="logo-redes" width={50} height={50}  className={'dark:border-2 border-teal-300 rounded-full'}/>

                        <img src={logoGithub} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>

                        <img src={logoLinkedind} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>
                    </div>

                    <div className='relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <img src={logo_padre} alt="logo-padre" />
                    </div>
                </section>

                <section>
                    <div>
                        <h3 className='text-3xl py-1 dark:text-white'>Proyectos</h3>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Ha trabajado en varios eventos como <span className='text-teal-500'>cumpleaños, bautizos, graduaciones</span>, etc. En otras palabras, tiene la experiencia de trabajar en todo tipo de evento social.</p>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>EDWIN ASQUI DJ es especializado en <span className='text-teal-500'>todos los géneros musicales.</span>Por lo tanto, si el cliente solicita algún género en especial no dude que <span className='text-teal-500'>Edwin</span> lo deleitará con lo requerido.</p>
                    </div>

                    {/*<div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={logoCode} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Beautiful Designs</h3>
                            <p className='py-4 text-teal-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias repudiandae aliquid dolores officiis neque. Voluptatem quod nemo, totam iste atque id aspernatur porro laborum, non quo, pariatur nobis natus consectetur?</p>
                            <p className='text-gray-800 py-1'>Tools used</p>
                            <p className='text-gray-800 py-1'>Photoshop</p>
                            <p className='text-gray-800 py-1'>Illustrator</p>
                            <p className='text-gray-800 py-1'>Figma</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-300'>
                            <img className='mx-auto' src={logoConsulting} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Beautiful Designs</h3>
                            <p className='py-4 text-teal-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias repudiandae aliquid dolores officiis neque. Voluptatem quod nemo, totam iste atque id aspernatur porro laborum, non quo, pariatur nobis natus consectetur?</p>
                            <p className='text-gray-800 py-1'>Tools used</p>
                            <p className='text-gray-800 py-1'>Photoshop</p>
                            <p className='text-gray-800 py-1'>Illustrator</p>
                            <p className='text-gray-800 py-1'>Figma</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={logoDesign} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Beautiful Designs</h3>
                            <p className='py-4 text-teal-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias repudiandae aliquid dolores officiis neque. Voluptatem quod nemo, totam iste atque id aspernatur porro laborum, non quo, pariatur nobis natus consectetur?</p>
                            <p className='text-gray-800 py-1'>Tools used</p>
                            <p className='text-gray-800 py-1'>Photoshop</p>
                            <p className='text-gray-800 py-1'>Illustrator</p>
                            <p className='text-gray-800 py-1'>Figma</p>
                        </div>
                    </div>*/}
                </section>

                <section>
                    {/*<div>
                        <h3 className='text-3xl py-1 dark:text-white'>Proyects</h3>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-teal-500'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-teal-500'>deleniti</span> voluptatem! Autem, veniam ut.</p>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-teal-500'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-teal-500'>deleniti</span> voluptatem! Autem, veniam ut.</p>
                    </div>*/}


                    <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
                        <div className="basis-1/3 flex-1 ">
                            <img
                                className="rounded-lg object-cover"
                                src={proyecto1}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={proyecto2}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-fill"
                                src={proyecto3}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={proyecto4}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={proyecto5}
                            />
                        </div>
                        <div className="basis-1/3 flex-1 lg:bg-orange-100">
                            <img
                                className="rounded-lg object-cover "
                                src={proyecto6}
                            />
                        </div>
                    </div>
                </section>

            </main>

        </div>
    )
}