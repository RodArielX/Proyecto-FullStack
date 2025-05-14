import Password from "../Perfil/Password";

import { motion, AnimatePresence } from "framer-motion"

const ModalPassword = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#121212] text-white w-full max-w-2xl p-8 rounded-2xl shadow-xl border border-yellow-500"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-3xl font-bold"
          >
            &times;
          </button>

          <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            <Password />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalPassword
