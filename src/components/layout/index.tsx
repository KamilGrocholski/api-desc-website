import Footer from "./Footer"
import Header from "./Header"
import Wrapper from "./Wrapper"

const MainLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <>
        <Header />
        <Wrapper>
            { children }
        </Wrapper>
        <Footer /> 
    </>
  )
}

export default MainLayout