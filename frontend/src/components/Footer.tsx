import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-32 pt-10 bg-black text-white flex flex-col items-center justify-center'>
        <p>Created this app with love <span className='text-red-700'>❤</span></p>
        <p>Know us more on <Link to={"https://github.com/sinster2003/grantitude"}>github</Link> | Developed by<Link to={"https://github.com/sinster2003/"}> @sinster2003</Link> and<Link to={"https://github.com/rakshithapatel08"}> @rakshithapatel08</Link></p>
    </div>
  )
}

export default Footer