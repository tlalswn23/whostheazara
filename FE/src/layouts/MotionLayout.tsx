import { motion } from "framer-motion";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const MotionLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 10 }}>
      {children}
    </motion.div>
  );
};
export default MotionLayout;
