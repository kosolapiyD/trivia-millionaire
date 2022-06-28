import { useMemo } from 'react';

type Props = {
    questionIndex: number
}

const MoneyPyramid = ({ questionIndex }: Props) => {

    const moneyPyramid = useMemo(() =>
        [
            { id: 1, amount: "$ 64.000" },
            { id: 2, amount: "$ 125.000" },
            { id: 3, amount: "$ 250.000" },
            { id: 4, amount: "$ 500.000" },
            { id: 5, amount: "$ 1.000.000" }
        ].reverse(),
        []);

    return (
        <div className='pyramid'>
            <ul className='moneyList'>
                {moneyPyramid.map(m => (
                    <li key={m.id} className={questionIndex + 1 === m.id ? 'moneyListItem active' : 'moneyListItem'}>
                        <span className='moneyListItemNumber'>{m.id}</span>
                        <span className='moneyListItemAmount'>{m.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MoneyPyramid;