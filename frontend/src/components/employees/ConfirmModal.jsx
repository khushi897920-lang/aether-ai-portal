import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title = 'Confirm Deletion', message = 'Are you sure you want to delete this record? This action cannot be undone.' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white w-full max-w-sm rounded-2xl border border-canvas-200/60 shadow-2xl overflow-hidden z-10 text-left p-6"
          >
            {/* Warning Header */}
            <div className="flex items-start space-x-3.5">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-void-950">{title}</h3>
                <p className="text-xs text-void-700/60 mt-1 leading-relaxed">{message}</p>
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-canvas-200/50">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-canvas-200 hover:bg-canvas-50 rounded-xl text-xs font-semibold text-void-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-2 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Node</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
