import Layout from '@/components/Layout';
import Trading from '@/pages/Trading';

export default function IndexPage() {
  return (
    <Layout title="Trading">
      <main>
        <div className="block min-h-screen">
          <div className="h-16 flex items-center">
            <h1>Trading</h1>
          </div>
          <div className="min-h-screen">
            <Trading />
          </div>
        </div>
      </main>
    </Layout>
  );
}
