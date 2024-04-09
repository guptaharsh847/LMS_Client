import React from 'react'
import { styles } from '../styles/styles'

type Props = {}

const About = (props: Props) => {
  return (
    <div>
        <br />
        <h1 className={`${styles.title} 800px:!ext-[45px]`}>
    What is <span className='text-gradient'>Elearning?</span>
        </h1>
        <br />
        <div className="w-[95%] 800px:w-[95%] m-auto">
            <p className="font-Poppins text-[18px] text-black dark:text-white">
                E-Learning is a new way to learn and grow as a developer. It is a platform where you can learn new skills and build your career.
                <br />
        
            E-Learning is a platform where you can learn new skills and build your career. It is a platform where you can learn new skills and build your career.
                <br />

                E-Learning is a platform where you can learn new skills and build your career. It is a platform where you can learn new skills and build your career.E-Learning is a platform where you can learn new skills and build your career. It is a platform where you can learn new skills and build your career.E-Learning is a platform where you can learn new skills and build your career. It is a platform where you can learn new skills and build your career.

            
            </p>
            <br />
            <span className="font-Cursive text-[22px]">
                Harsh Gupta
            </span>
            <h5 className="text-[18px] font-Poppins">
                Founder and Developer of Elearning
            </h5>
        </div>
    </div>
  )
}

export default About