import { motion } from 'framer-motion';

export function SelectionStep() {
  return (
    <motion.div
      key="story-selection"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-3"
    >
      <h1>Selection Step</h1>
    </motion.div>
  );
}
