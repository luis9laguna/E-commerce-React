import Layout from "@/components/public/layout/Layout";
import RecoveryForm from "@/components/public/RecoveryForm";
import Meta from "@/components/public/ui/Meta";

export default function statusPackage() {


    return (
        <Layout>
            <Meta title='Recovery Account' />
            <RecoveryForm />
        </Layout>
    )
}
