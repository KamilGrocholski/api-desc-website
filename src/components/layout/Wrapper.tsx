const Wrapper: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div>
        <main>
            { children }
        </main>
    </div>
  )
}

export default Wrapper