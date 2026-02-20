import React from 'react';
import Card from '../components/docs/Cards';
import { Home } from 'lucide-react';

const CardsUsage = () => {
    return (
        <>
            <Card
                name="Total Revenue"
                icon={<Home size={16}/>}
                number="$45,231.89"
                sidenumber="+20.1%"
                info="from last month"
                textcolor="text-green-500"
            />
        </>
    );
};

export default CardsUsage;
