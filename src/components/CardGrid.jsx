import { motion, AnimatePresence } from "motion/react";

export default function CardGrid ({ items, renderItem, emptyMessage }) {
    return (
        <motion.div layout className="relative grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
                {items && items.length > 0 ? (
                    items.map((item,index) => {
                        const key = item && (item.id ?? item.name ?? item?? index) ;
                        return(
                        <motion.div
                            key={String(key)} layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}  // <-- animazione di sparizione
                            transition={{ duration: 0.3 }}
                        >
                            {renderItem(item)}
                        </motion.div>
                    )})
                ) : (
                    <motion.p
                        className="col-span-full text-center text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {emptyMessage || "Nessun elemento trovato."}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};