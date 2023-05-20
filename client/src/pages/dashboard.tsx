import React from 'react'
import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router'

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps>  = ()=> {
    const [{data, fetching}] = useMeQuery();
    const router = useRouter()

    if(fetching) return <>Loading....</>
    if(!data) {
        router.push('/login');
        return null;
    }
    
    if(data!.me){
        return (
            <div>Welcome <strong>{data!.me.user?.email}</strong> </div>
        )    
    }
    return null;
}

export default Dashboard;