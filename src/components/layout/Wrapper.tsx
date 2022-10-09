const Wrapper: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div className='w-full'>
        <main className='min-h-screen mx-auto container flex flex-col w-full'>
            { children }
        </main>
    </div>
  )
}

export default Wrapper