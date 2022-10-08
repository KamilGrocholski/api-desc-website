const Wrapper: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div className=''>
        <main className='min-h-screen container mx-auto flex flex-col items-center'>
            { children }
        </main>
    </div>
  )
}

export default Wrapper