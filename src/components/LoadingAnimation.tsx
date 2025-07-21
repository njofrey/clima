import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-16 h-16 border-4 border-t-4 border-t-white border-gray-500 rounded-full"
      />
    </motion.div>
  );
}
