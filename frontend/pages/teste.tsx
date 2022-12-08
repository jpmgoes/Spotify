import * as React from 'react';
import ZonaDeTeste from '../Components/test/ZonaDeTeste';
import { AppContext, AppSharedContext } from '../Context/AppContext';

interface ITesteProps {
}

const Teste: React.FunctionComponent<ITesteProps> = (props) => {
    return <>
        <ZonaDeTeste />
    </>;
};

export default Teste;
