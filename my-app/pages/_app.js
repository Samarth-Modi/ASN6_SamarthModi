import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import { SSRProvider } from 'react-bootstrap';*/
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';

const App = ({ Component, PageProps }) => {
  return (
    <>
    {/* <SSRProvider> */}
    <RouteGuard>
        <Layout>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const res = await fetch(url);
              // If the status code is not in the range 200-299,
              // we still try to parse and throw it.
              if (!res.ok) {
                const error = new Error('An error occurred while fetching the data.');
                // Attach extra info to the error object.
                error.info = await res.json();
                error.status = res.status;
                throw error;
              }
              return res.json();
            },
          }}
        >
          <Component {...PageProps} />
        </SWRConfig>
        </Layout>
        </RouteGuard>
        {/* </SSRProvider> */}
        </>
  );
};

export default App;