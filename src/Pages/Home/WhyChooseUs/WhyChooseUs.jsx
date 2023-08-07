import React from 'react';
import { RiTeamLine } from 'react-icons/ri';
import { BsPersonCheck, BsGraphUpArrow, BsHandThumbsUp } from 'react-icons/bs';
import './WhyChooseUs.css'
import { motion } from 'framer-motion';
const WhyChooseUs = () => {
    return (
        <div className='mb-20 mt-10'>
            <h2 className='text-3xl md:text-5xl text-center text-red-800 my-8 font-serif w-fit mx-auto why-choose-us-heading'>Why Choose Us</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                <motion.button
                    whileHover={{ scale: 1.7 }}
                    whileTap={{ scale: 1.9 }} className='w-60 h-68 md:h-80 rounded-lg border-2 p-5 flex flex-col justify-between mx-auto reason'>
                    <RiTeamLine className='text-3xl md:text-4xl text-red-900 rounded-full border-2 border-red-800' />
                    <h4 className='text-xl md:text-2xl font-semibold my-3 text-left'>Support Team</h4>
                    <p className='text-red-300 text-justify text-sm md:text-md'> Our dedicated team of experienced coaches brings a wealth of knowledge and expertise in various sports disciplines.</p>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.3 }} className='w-60 h-68 md:h-80 rounded-lg border-2 p-5 flex flex-col justify-between mx-auto reason'>
                    <BsPersonCheck className='text-3xl md:text-4xl text-red-900 rounded-full border-2 border-red-800' />
                    <h4 className='text-xl md:text-2xl font-semibold my-3 text-left'> Bginning setup</h4>
                    <p className='text-red-300 text-justify text-sm md:text-md'>We take the time to understand your specific needs and create customized Support programs that cater to your individual requirementss.</p>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.3 }} className='w-60 h-68 md:h-80 rounded-lg border-2 p-5 flex flex-col justify-between mx-auto reason'>
                    <BsHandThumbsUp className='text-3xl md:text-4xl text-red-900 rounded-full border-2 border-red-800 p-1' />
                    <h4 className='text-xl md:text-2xl font-semibold my-3 text-left'>Group Team Play</h4>
                    <p className='text-red-300 text-justify text-sm md:text-md'> Over the years, we have helped numerous athletes achieve outstanding results, from beginners to elite competitors reaching the pinnacle of their performance.</p>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.7 }}
                    whileTap={{ scale: 1.9 }} className='w-60 h-68 md:h-80 rounded-lg border-2 p-5 flex flex-col justify-between mx-auto reason'>
                    <BsGraphUpArrow className='text-3xl md:text-4xl text-red-900' />
                    <h4 className='text-xl md:text-2xl font-semibold my-3 text-left'> Development</h4>
                    <p className='text-red-300 text-justify text-sm md:text-md'> Our Support programs encompass not only technical skills but also mental resilience, emotional well-being, and strategic thinking.</p>
                </motion.button>
            </div>
        </div>
    );
};

export default WhyChooseUs;
