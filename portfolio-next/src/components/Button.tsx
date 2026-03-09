import { motion } from "motion/react";





// interface Props {
//     props: string;
//     items: { label: string; href: string }[];
//     colors: number[];
// }



export function Button(label: string) {

    return () => {
        <>
            <motion.button>
                {label}
            </motion.button>
        </>
    }


}
export default Button