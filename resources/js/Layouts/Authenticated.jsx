import Layout from '../../layouts/layout';

export default function Authenticated({ children }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}
