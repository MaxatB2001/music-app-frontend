import { wrapper } from "../store";
import "../styles/global.css";

const WrappedApp = ({ Component, pageProps }) => {
  return <Component {...pageProps}/>
}

export default wrapper.withRedux(WrappedApp);