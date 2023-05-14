import React from 'react'
import { useMeQuery } from '../generated/graphql';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps>  = ()=> {
    const [{data, fetching}] = useMeQuery();
    if(fetching) return <>Loading....</>
    if(data!.me){
        return (
            <div>Welcome <strong>{data!.me.user?.email}</strong> </div>
        )    
    }
    return null;
}

export default Dashboard;