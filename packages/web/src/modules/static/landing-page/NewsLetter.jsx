import useTheme from '../../../hooks/useTheme';
import styles from './styles/index.module.css';

const NewsLetter = () => {
    const context = useTheme();
    return (
        <section className={`${context.theme === 'dark' ? 'bg-transparent text-white' : null} w-[90%] md:w-[60%] mx-auto text-center flex flex-col justify-center md:items-start md:ml-[10em] gap-5 my-36 px-8 py-8 rounded-lg`}>
        <h5 className="text-3xl md:text-4xl font-black -mb-2">Be the first to know</h5>
        <p>Subscribe to out newsletter and  be the first to know about new updates
            and news, but no spam, scouts honor!</p>
        
        <div className='relative w-[80%] '>
            <input type='email'
                placeholder='Your email address'
                className={`${styles.subscribe} bg-gray-200 placeholder:text-black py-4 px-3 w-[100%] rounded-md shadow-sm`}
            />
            <button
                type="submit"
                className={`${styles._btn} bg-[#5D387F] text-[#E8DDF2] absolute rounded-md right-3 top-[15%] hover:bg-[#392150] hover:text-white transition-colors`}>
                Subscribe
            </button>
        </div>
    </section>
    );
}

export default NewsLetter;
